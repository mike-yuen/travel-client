export const iphoneXDetection = () => {
  let iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
  let aspect = window.screen.width / window.screen.height;
  return iPhone && aspect.toFixed(3) === "0.462";
};
