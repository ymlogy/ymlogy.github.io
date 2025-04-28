---
title: "Fixing Aspect Ratio Distortion with Three.js OrthographicCamera"
date: 2025-04-28
draft: false
description: "How to correctly handle aspect ratio changes when using an OrthographicCamera in Three.js to avoid stretched or squeezed visuals, especially on mobile."
tags: ["three.js", "webgl", "javascript", "graphics", "aspect-ratio", "orthographic-camera"]
categories: ["development", "web", "graphics", "debugging"]
---

When working with Three.js, displaying content like a pre-rendered texture using an `OrthographicCamera` often requires careful handling of the window aspect ratio. A common pitfall is encountering visuals that appear stretched or squeezed, particularly noticeable on mobile devices where screen aspect ratios vary significantly from desktop monitors. This post explains why this happens and how to fix it.

## The Problem: Squeezed Visuals

Imagine you have a scene where you render a dynamic texture (like a noise pattern) to a render target. Then, in your main scene, you display this texture on a simple plane that should fill the screen, viewed by an `OrthographicCamera`.

```javascript
// Simplified setup
const finalScene = new THREE.Scene();
// Camera with fixed square bounds
const finalCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10); 
finalCamera.position.z = 1;

const geometry = new THREE.PlaneGeometry(2, 2); // Plane fills the camera view
const material = new THREE.MeshBasicMaterial({ map: preRenderedTexture });
const quad = new THREE.Mesh(geometry, material);
finalScene.add(quad);

// Initial renderer setup
renderer.setSize(window.innerWidth, window.innerHeight); 
```

You also have a resize handler to keep the canvas filling the window:

```javascript
// Problematic resize handler
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Updates renderer size, but NOT the camera's view bounds
    renderer.setSize(width, height); 
    
    // Attempting to set aspect might seem right, but doesn't work for OrthographicCamera bounds
    // finalCamera.aspect = width / height; // Incorrect for Orthographic
    
    // Forgetting to update projection matrix, or updating it without changing bounds
    finalCamera.updateProjectionMatrix(); 
}

window.addEventListener('resize', onWindowResize);
```

When viewed on a tall, thin mobile screen (portrait mode), the texture on the plane appears vertically squeezed. On a wide screen (landscape), it might look horizontally squeezed.

## The Cause: Fixed Camera Bounds vs. Variable Renderer Size

The root cause lies in the mismatch between the `OrthographicCamera`'s viewing frustum (defined by `left`, `right`, `top`, `bottom`) and the `WebGLRenderer`'s output dimensions.

1.  **Fixed Frustum:** Our `OrthographicCamera` is initialized with `left: -1, right: 1, top: 1, bottom: -1`. This defines a square viewing area, regardless of the window shape.
2.  **Variable Output:** The `renderer.setSize(width, height)` call correctly resizes the underlying canvas element and the rendering output buffer to match the window dimensions.
3.  **Mismatch:** When the renderer draws the scene, it takes the square view defined by the camera and forces it to fit into the potentially non-square output buffer set by `renderer.setSize`. This results in stretching or squeezing. Simply setting `camera.aspect` doesn't redefine the `left`, `right`, `top`, `bottom` boundaries for an `OrthographicCamera`.

## The Remedy: Adjust Camera Bounds on Resize

The correct solution is to update the `OrthographicCamera`'s `left`, `right`, `top`, and `bottom` properties within the `onWindowResize` handler *before* calling `updateProjectionMatrix()`. We need to calculate the window's aspect ratio and adjust the camera bounds accordingly, maintaining the visual proportions of the content.

Here's the corrected resize handler:

```javascript
// Corrected resize handler
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    // --- SOLUTION ---
    // Update orthographic camera bounds to match the new aspect ratio.
    // We keep the shortest dimension fixed (-1 to 1) and adjust the longer one.
    if (aspect >= 1) { 
        // Landscape or square: Adjust horizontal bounds
        finalCamera.left = -aspect;
        finalCamera.right = aspect;
        finalCamera.top = 1;
        finalCamera.bottom = -1;
    } else { 
        // Portrait: Adjust vertical bounds
        finalCamera.left = -1;
        finalCamera.right = 1;
        finalCamera.top = 1 / aspect;
        finalCamera.bottom = -1 / aspect;
    }
    
    // IMPORTANT: Update the camera's projection matrix AFTER changing bounds
    finalCamera.updateProjectionMatrix();
    // --- END SOLUTION ---
    
    // Resize the renderer output
    renderer.setSize(width, height);
    // If using EffectComposer, resize it too
    // composer.setSize(width, height); 
}

window.addEventListener('resize', onWindowResize);
```

With this change, the camera's viewing frustum always matches the aspect ratio of the output canvas, ensuring the texture mapped onto the plane is displayed without distortion.

## Performance Note

It's important to understand that this fix addresses a *visual rendering artifact*. It ensures the pre-rendered texture is displayed correctly. It does **not** inherently change the computational cost of *generating* that texture in the first place. The performance characteristics of the texture generation shader itself remain unchanged. Optimizing texture generation (e.g., shader complexity, texture resolution, update frequency) is a separate task.
