export const raf =
  window?.requestAnimationFrame ||
  window?.webkitRequestAnimationFrame ||
  window?.mozRequestAnimationFrame ||
  window?.oRequestAnimationFrame ||
  window?.msRequestAnimationFrame ||
  function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  };

export const caf =
  window?.cancelAnimationFrame ||
  window?.webkitCancelAnimationFrame ||
  window?.mozCancelAnimationFrame ||
  window?.oCancelAnimationFrame ||
  window?.msCancelAnimationFrame ||
  function (id) {
    window.clearTimeout(id);
  };
