---
title: "Building a PWA That Actually Keeps Its Data: Lessons From a Flash Calculator"
date: 2026-08-18
draft: false
description: "What it takes to make a small PWA store data that survives on a phone - IndexedDB, service workers, and the persistence API nobody mentions."
tags: ["pwa", "indexeddb", "service worker", "offline-first"]
categories: ["development", "web"]
---

**TL;DR:** A local-storage PWA needs six things working together to keep user data on a phone: IndexedDB (not localStorage) for anything you can't afford to lose, a valid manifest and service worker so the app is installable, `navigator.storage.persist()` on init (helps on Android, no-op on iOS), network-first HTML with a timeout so it opens offline, a cache-name stamp derived from a hash of the shell so deploys actually reach installed users, and HTTPS. On iOS, installation via Safari is the only persistence lever - without it, IndexedDB is evicted after seven days of inactivity. The app that prompted this is [FlashCalc](https://robby3000.github.io/FlashCalc), a flash exposure calculator.

---

I built a small flash exposure calculator. The math is simple: guide number divided by aperture gives you distance, adjusted for ISO and power. Photographers have been doing it in their heads since the 1950s. The app exists because doing it in your head while also metering a scene and loading a film back is a lot, and a phone is already in your pocket anyway. You can try it here: [FlashCalc](https://robby3000.github.io/FlashCalc).

The interesting part wasn't the calculator. It was making the thing into a PWA that stores a user's flash inventory locally and doesn't lose it. That turned out to be a stack of five or six separate requirements, most of which are not obvious, and at least one of which is entirely outside the developer's control.

Here's what I learned, in roughly the order it bit me.

## IndexedDB, not localStorage

This is the easy one, but it's worth being precise about why.

localStorage is synchronous, capped around 5 MB, and on mobile browsers it's the first thing evicted when storage pressure hits. It's fine for a "last selected tab" preference. It is not fine for anything the user would be upset to lose. A flash inventory, even a small one, is exactly that. Someone who has typed in the guide numbers for three or four flashes, including a zoom head with eight steps, will not be charmed to find the list empty one morning.

IndexedDB is asynchronous, has a much larger quota (often several gigabytes on installed PWAs), and is treated as more durable by the browser's eviction logic. It's also more awkward to use. The raw API is callback-based and verbose. The temptation is to reach for Dexie.js, which wraps it in something pleasant. For a project with three or four stores and complex queries, that's reasonable. For a single object store holding a flat list of records, it's a 60-line wrapper and Dexie is overkill. The vanilla API is not that bad once you write `openDB`, `getAll`, `put`, and `delete` once each.

The split I ended up with: IndexedDB for the flash inventory (the thing that matters), localStorage for prefs like the last-selected flash, last ISO, and the metres/feet toggle (things where losing them is a minor annoyance, not a data-loss event).

## The service worker is not just for offline

The service worker does two jobs, and confusing them is where most PWA bugs live.

The first job is offline support: precache the app shell so it opens with no signal. This is the one everyone talks about. The pattern is straightforward: list your files in a `PRECACHE` array, call `cache.addAll()` in the `install` handler, and serve from cache in the `fetch` handler.

The second job is the one that nearly bit me: **cache invalidation**. An installed PWA does not fetch your new code just because you deployed it. The user's phone is running a frozen copy from whenever they last got an update, and it is very good at continuing to do so. If you change `index.html` but the service worker doesn't know that, the phone keeps serving the old one. Forever, or until the user manually clears the site data.

The fix is a discipline, not a library. Every time you change a shipped file, you bump the cache name in `sw.js`. The browser compares the installed `sw.js` byte-for-byte on every navigation; a different cache name triggers a new install and purges the old cache in `activate`. One string change does both jobs: triggers the install and identifies which caches to delete.

The problem with hand-bumping the version is that you will forget. The failure mode when you forget is silent, delayed, and only reproducible on a device you're not holding. That's the worst shape a bug can have. So I stole a pattern from another project: a small Node script that hashes every file the app ships (paths and bytes, sorted) and rewrites the cache name to `appname-v<version>-<hash8>`. Run it after every change, commit the result in the same commit as the change. A `--check` flag exits non-zero if the stamp is stale, which means CI can enforce it.

The other detail that matters: precache each file individually with `cache.add().catch()`, not `cache.addAll()`. `addAll` is atomic: one missing icon fails the entire install and the user gets no offline shell at all. Individual adds with a caught error mean a missing icon logs a warning and the rest of the shell still works.

## Network-first HTML, cache-first everything else

The fetch strategy is not one strategy. Different assets need different treatment.

HTML and the manifest should be **network-first with a timeout**. You want users to see updates when they're online, but you also want the app to open offline. The timeout matters more than you'd think. A dead-but-not-refused cellular connection can hang a fetch for tens of seconds, and during that time the app looks like it's not loading. Three seconds is the number I settled on. Try the network for three seconds, then fall back to cache.

Icons and other static assets should be **cache-first**. They rarely change, they're the thing you most need offline, and re-fetching them on every load is wasteful. The catch is that cache-first means a changed icon is invisible to an installed phone until the cache name rotates, which is why the stamping discipline above is load-bearing.

## The persistence API that iOS ignores

Here's the one that surprised me.

There's a `navigator.storage.persist()` API that asks the browser to mark the origin's storage as persistent rather than "best-effort." On Android Chrome, it works. Once granted, the browser won't evict the storage under disk pressure without explicit user action. For an installed PWA it's usually auto-granted. Calling it is a six-line addition to your init function and it's the difference between "probably survives" and "won't be evicted."

On iOS, `navigator.storage.persist()` is not implemented. It resolves `false` or is a no-op. There is no code-side request that helps.

This means the persistence story is fundamentally different across the two platforms, and the difference is not something you can fix in code.

## iOS: installation is the only lever

Apple's Intelligent Tracking Prevention evicts IndexedDB for non-installed sites after seven days of inactivity. Seven days. If a user opens your PWA in Safari, adds a few flashes, and doesn't come back for a week, the data is gone. Silently. No warning, no backup, no recovery.

The only exemption is installation. When a user does Share → Add to Home Screen, the installed PWA gets its own storage partition tied to the home-screen icon, and that partition is exempt from the seven-day eviction. Installation is not just about having a nice icon on the home screen. On iOS, it is the thing that makes local storage durable. Without it, you've built a toy.

This has implications for how you document the app. "Install for the best experience" is the usual PWA phrasing. For an app that stores user data locally on iOS, the real phrasing is closer to "install, or your data will be deleted in a week." That's not a marketing line anyone wants to write, but it's the truth of the platform.

A few more iOS details worth knowing:

- Chrome, Firefox, and Edge on iOS are all WebKit wrappers and **cannot install PWAs**. Only Safari can. "Use any browser" is wrong; it has to be Safari.
- Deleting the home-screen icon deletes the storage partition. There's no separate uninstall that preserves data.
- "Clear History and Website Data" in iOS Settings wipes installed PWAs too. No protection against this.
- Even installed, iOS will evict after "many weeks" of non-use. Apple hasn't documented the exact threshold. Launching periodically is the only mitigation.

## Android: install plus persist, but the browser matters

Android Chrome's eviction logic is gentler. Installed PWAs are prioritised and rarely evicted, but disk pressure can still trigger it. The `navigator.storage.persist()` call upgrades the origin from best-effort to persistent, which the browser won't touch without explicit user action. So on Android you have two levers: installation (the user's action) and the persist request (your code). Use both.

The persist call should happen after the database opens, and some browsers refuse it before a user gesture, so it's worth retrying once on the first `pointerdown`. Wrapped in feature detection, it's a silent no-op on iOS and older browsers, harmless to call everywhere.

But there's a catch I didn't know about until I started testing on other Android browsers: **not all Android browsers install PWAs the same way.** Chrome does something the others don't. When you install a PWA in Chrome on Android, it generates a **WebAPK** - an actual Android application package. The PWA shows up in the app drawer, appears in Android's Settings app alongside native apps, can register intent filters to handle URLs, and runs as a first-class Android app. The storage is still shared with Chrome's profile, but Chrome treats installed PWAs as high-priority and auto-grants the `persist()` request without prompting the user.

Brave, despite being Chromium-based, does not create WebAPKs. There's an open issue in the Brave repo (#56133) documenting this: installing a PWA in Brave on Android creates a home screen shortcut that opens inside the Brave browser, not a standalone app. The address bar may or may not hide depending on your manifest, but the PWA runs as part of the browser process - closing Brave closes the PWA. A separate issue (#53694) reports that Brave updates can silently remove installed PWAs entirely, forcing users to reinstall. If the shortcut is removed, the connection to the storage is severed, and the next time the user finds the app it may well start empty.

Firefox on Android is a different shape again. It doesn't create true standalone PWAs. A Mozilla engineer put it bluntly in a Bugzilla comment: "Firefox doesn't have true PWAs. It installs a bookmark with 'single-site browsing', but it's still just a browser tab." Firefox does support `navigator.storage.persist()` on Android, but unlike Chrome it prompts the user with a permission dialog rather than auto-granting. If the user dismisses it, storage stays best-effort. And because the "installed" app is really just a browser tab with a shortcut, clearing Firefox's site data wipes the PWA's IndexedDB along with everything else.

The practical upshot: on Android, **Chrome is the browser you want users to install from.** The WebAPK mechanism gives the PWA real operating-system integration and the strongest storage protection. Brave and Firefox will technically work, but the install is shallower, the storage is more tightly coupled to the browser's own data lifecycle, and the failure modes when the browser updates or clears data are more likely to take the flash inventory with them. If you're writing install instructions for an Android user, "use Chrome" is the recommendation worth making, not just a preference.

Samsung Internet and Edge on Android are both Chromium-based and do create WebAPKs, so they're fine too. The problem is specifically Brave and Firefox.

## The full checklist

Here's what I ended up with, for a local-storage PWA that needs to survive on a phone:

1. **IndexedDB for anything you can't afford to lose.** localStorage for prefs only.
2. **A valid manifest and a registered service worker**, so the app is installable. Installation is what flips storage from evictable to durable on both platforms.
3. **`navigator.storage.persist()` on init**, with a first-gesture retry. Helps on Android, no-op on iOS.
4. **Network-first HTML with a 3-second timeout**, cache-first assets. So the app opens offline and doesn't hang on dead connections.
5. **Per-file precache, not `addAll`.** A missing icon shouldn't block the shell.
6. **A cache-name stamp derived from a hash of the shell.** So a deployed change is never served from a stale cache. Enforced in CI.
7. **HTTPS.** Required for the service worker, and `persist()` is a no-op on insecure contexts.
8. **Tell users to install the app**, especially on iOS. The data doesn't survive without it.

None of this is hard individually. The problem is that it's six separate things, each with a failure mode that's silent and delayed, and the platform documentation doesn't assemble them for you. The PWA tutorials mostly stop at "add a manifest and a service worker" and leave the persistence story as an exercise. The IndexedDB tutorials don't mention eviction. The eviction docs don't mention that installation exempts you from it. The `persist()` docs don't mention it's a no-op on iOS.

You have to read all of it and assemble the picture yourself. Consider this one assembly. The app that prompted it is at [robby3000.github.io/FlashCalc](https://robby3000.github.io/FlashCalc).

<div align="center">⁂</div>
