// Add a function to pause/cleanup when the page isn't visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId);
  } else {
    animate();
  }
});
