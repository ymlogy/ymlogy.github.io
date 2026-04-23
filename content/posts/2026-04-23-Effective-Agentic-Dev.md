<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Effective AI Agentic Software Development: Repo and Context Conventions

If you want coding agents to be reliably useful, treat your repository like a **workspace with instructions**, not just a codebase. The best pattern is to keep a small, stable root instruction file for universal rules, then add task-specific planning docs and technology-specific reference docs that agents can load when needed.[^1][^2]

## The core idea

Agentic tools work best when they can quickly answer three questions: what is this project, what should I not break, and what does “done” mean here? A good setup gives them those answers in predictable files, with clear separation between durable rules, project plans, and deep reference material.[^3][^2]
For multi-agent workflows, the most useful convention is layered documentation: a root instruction file, focused skill/playbook files, and deeper docs in a reference folder.[^4][^1]

## What to call planning documents

Use names that describe the role of the document, not the tool. The most practical choice is `plan.md` for a single active plan, or `plans/` for multiple feature plans; if you want a more explicit convention, `roadmap.md`, `delivery-plan.md`, or `implementation-plan.md` also work well.[^3][^1]
For agent-facing work, I would avoid vague names like `notes.md` or `todo.md` because they do not clearly signal scope, acceptance criteria, or execution order.[^1]
If the repo is shared across humans and agents, `spec.md` or `implementation-spec.md` is often the clearest label for a document that includes phases and success criteria.[^2][^1]

## Where the files should live

Put the main instruction file in the repository root so agents see it immediately when they open the project. For Codex-style workflows, the root-level `AGENTS.md` is explicitly supported and is read before work begins.[^2][^1]
For planning documents, use a `docs/` or `plans/` folder rather than the root unless the plan is truly the single source of truth for the whole repo.[^1]
A good pattern is: root for universal instructions, `docs/plans/` for feature plans, and `.claude/skills/` or a similar hidden folder for reusable task playbooks.[^4][^1]

## What the planning docs should contain

A strong planning document should be short enough for an agent to parse, but specific enough to constrain implementation. Include the problem statement, goals, non-goals, phase breakdown, dependencies, success criteria, test expectations, and rollback notes.[^3][^1]
For each phase, define “done” in a way that can be verified, such as “the endpoint returns 200 with seeded data” or “all new tests pass and lint is clean”.[^2][^3]
Keep the doc implementation-oriented, not narrative-heavy: agents do better with explicit instructions, file paths, commands, and acceptance checks than with prose essays.[^3][^1]

## Suggested plan template

```md
# Feature name

## Goal
What this changes and why.

## Scope
What is included.

## Non-goals
What is explicitly out of scope.

## Current state
Relevant files, architecture notes, constraints.

## Phases
### Phase 1: ...
- Tasks
- Files to edit
- Risks
- Success criteria

### Phase 2: ...
- Tasks
- Files to edit
- Risks
- Success criteria

## Verification
- Tests to run
- Manual checks
- Edge cases

## Rollback
- How to revert safely

## Open questions
- Items needing human judgment
```

That structure gives coding agents a bounded execution plan and helps prevent them from “helpfully” expanding scope.[^1][^2]

## Should you use `CLAUDE.md` and `skills.md`

Yes, but only if you make them part of a layered system rather than duplicate documentation. `AGENTS.md` is the more broadly useful root convention across tools like Codex and other agentic systems, while `CLAUDE.md` is especially useful for Claude-centric workflows.[^2][^1]
If you expect to use multiple LLMs, I would keep one root file named `AGENTS.md` for universal project instructions and add `CLAUDE.md` only if Claude Code is a major part of your workflow and benefits from a Claude-specific override.[^1][^2]
For reusable task guidance, a `skills.md` file can work, but a better pattern is a skills directory such as `.claude/skills/<skill-name>/SKILL.md`, because it supports modular, on-demand loading and keeps the root file lean.[^4][^1]

## Recommended repo layout

```text
your-project/
AGENTS.md
CLAUDE.md
docs/
  plans/
    feature-x.md
    release-y.md
  architecture/
    stack-overview.md
.claude/
  skills/
    build-test-verify/
      SKILL.md
    database-migrations/
      SKILL.md
    svelte/
      SKILL.md
    astro/
      SKILL.md
    sqlite/
      SKILL.md
src/
```

This layout keeps stable instructions at the top, specialized workflows in skills, and larger reference docs in normal docs folders.[^4][^1]

## What to put in `AGENTS.md`

Your root instruction file should be small and universal. Include the build command, test command, lint command, formatting rules, branch/commit conventions, and “do not touch” areas such as generated files or production secrets.[^3][^2]
Also include project-wide norms like TypeScript strictness, naming conventions, testing expectations, and whether the agent should ask before changing schema or deployment files.[^3][^1]
Think of it as the minimum set of rules that every task needs, not a full architecture manual.[^3]

## How to feed Svelte, Astro, and SQLite context

The best results come from combining project docs with framework-specific reference files and real code examples. For Svelte, include a focused reference doc or skill that captures current Svelte 5 best practices, because Svelte’s AI docs explicitly provide guidance for modern syntax and patterns.[^5][^6]
For Astro, include a short architecture note on content collections, routing, and server/client boundaries, because Astro’s docs emphasize content collections for typed, validated structured content.[^7][^8]
For SQLite, include a database reference that states your schema rules, connection setup, and whether foreign keys are enabled, because SQLite foreign key enforcement is disabled by default and must be enabled per connection.[^9]

## Best way to give agents accurate framework context

Do not rely only on prose descriptions of the stack. Give the agent concrete examples from your codebase, plus a compact reference file that summarizes the patterns you actually use.[^10][^11]
For Svelte, include at least one or two representative components that use your preferred approach, because example code helps the agent match the project’s style and avoids outdated patterns.[^6][^10]
For Astro, document where content lives, how content collections are structured, and how pages should query them, because Astro’s type-safe content collection model is one of the main things the agent needs to preserve.[^8][^7]
For SQLite, include the schema, migration rules, and transaction expectations, and explicitly note any connection-level requirements such as enabling foreign keys.[^12][^9]

## A practical workflow

Start each feature with a planning doc, then give the agent the relevant skill/reference files, then ask it to implement only one phase at a time. This reduces drift and keeps the model aligned with current context instead of trying to hold the whole project in memory.[^13][^1]
When the stack changes, update the reference docs before asking for new code so the agent sees the current truth, not stale assumptions.[^11][^13]
For larger work, consider one plan per feature branch and one skill per repeatable task, such as migrations, test runs, release notes, or component patterns.[^4][^1]

## Blog-ready template

```md
# Building Reliable AI Agentic Development Workflows

AI coding agents are most effective when your repo gives them a clear operating model: what the project is, what conventions matter, and how success is measured.

## Use a layered documentation system
- `AGENTS.md` at the repo root for universal rules.
- `CLAUDE.md` only if you want Claude-specific guidance.
- `docs/plans/*.md` for feature plans and implementation phases.
- `.claude/skills/*/SKILL.md` for reusable task playbooks.

## Name plans clearly
Use names like `implementation-plan.md`, `feature-spec.md`, or `delivery-plan.md`.
Avoid generic names that do not signal scope or acceptance criteria.

## Put the right information in the right file
Root instructions should stay short.
Plans should define goals, phases, and success criteria.
Skills should explain repeatable workflows.
Reference docs should hold framework- or domain-specific detail.

## Feed the stack with real context
For Svelte, include current best-practice examples and component conventions.
For Astro, document content collections, routing patterns, and where content lives.
For SQLite, document schema rules, migrations, and foreign-key behavior.

## Keep the agent bounded
Ask it to do one phase at a time.
Require tests and verification steps.
Make “done” measurable.
```


## Recommended default setup

If you want one simple opinionated answer, use this: root `AGENTS.md`, feature plans in `docs/plans/`, reusable skills in `.claude/skills/`, and stack references in `docs/architecture/` or `docs/reference/`.[^2][^4][^1]
For a Svelte + Astro + SQLite project, also keep one or two real example files per layer so the model can imitate the project’s actual patterns instead of inventing its own.[^6][^8][^9]
That combination is usually the best balance of clarity, portability across tools, and low context overhead.[^1][^3]
<span style="display:none">[^14][^15][^16][^17][^18][^19][^20][^21][^22][^23][^24][^25][^26][^27][^28]</span>

<div align="center">⁂</div>

[^1]: https://www.groff.dev/blog/implementing-claude-md-agent-skills

[^2]: https://developers.openai.com/codex/guides/agents-md

[^3]: https://www.augmentcode.com/guides/how-to-build-agents-md

[^4]: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

[^5]: https://svelte.dev/docs/svelte/best-practices

[^6]: https://svelte.dev/docs/ai/skills

[^7]: https://5-0-0-beta.docs.astro.build/en/guides/content-collections/

[^8]: https://docs.astro.build/en/guides/content-collections/

[^9]: https://sqlite.org/foreignkeys.html

[^10]: https://github.com/kevinobee/svelte5-ai-digest

[^11]: https://khromov.se/getting-better-ai-llm-assistance-for-svelte-5-and-sveltekit/

[^12]: https://www.sqlitetutorial.net/sqlite-foreign-key/

[^13]: https://towardsdatascience.com/how-to-optimize-your-ai-coding-agent-context/

[^14]: https://www.linkedin.com/posts/timothywilliammartin_agentic-coding-primer-activity-7434956223029948416-nPK9

[^15]: https://dev.to/chand1012/the-best-way-to-do-agentic-development-in-2026-14mn

[^16]: https://www.reddit.com/r/sveltejs/comments/1juaepm/svelte_and_ai_coding/

[^17]: https://github.com/ruvnet/agentic-flow/blob/main/.claude/skills/github-multi-repo/SKILL.md

[^18]: https://arxiv.org/html/2604.14228v1

[^19]: https://agentsmd.net

[^20]: https://docs.kanaries.net/articles/hermes-agent-vs-openclaw

[^21]: https://dev.to/moshe_io/we-built-a-community-registry-for-neuledgecontext-heres-how-it-works-3ble

[^22]: https://kilo.ai/articles/openclaw-vs-hermes-what-reddit-says

[^23]: https://www.youtube.com/watch?v=NlNuoH5PPl4

[^24]: https://www.reddit.com/r/openclaw/comments/1s4skdz/just_migrated_my_openclaw_setup_to_hermes_agent/

[^25]: https://github.com/openai/codex/blob/main/docs/agents_md.md

[^26]: https://www.thisdot.co/blog/leveraging-astros-content-collections

[^27]: https://sqlite.org/forum/info/0e87506741d6283369bd1ba804867ce161c8c2e249d44d76a4896642a62bd8dd

[^28]: https://www.youtube.com/watch?v=FS96vvn-W44

