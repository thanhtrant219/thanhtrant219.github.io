import { cubehelix } from 'd3';
export const innerRadius = 0.2;
export const strokeWidth = 30;

// Generates a circle sprite for the given color.
// Inspired by https://takahirox.github.io/three.js/examples/canvas_particles_sprites.html
export const generateSprite = (spriteColor, opacity = 0.4) => {
  const canvas = document.createElement('canvas');
  const side = Math.pow(2, 6);
  const center = side / 2;
  const fullRadius = side / 2 - 4;
  canvas.width = side;
  canvas.height = side;

  const context = canvas.getContext('2d');

  //// Inner circle.
  //const center = side / 2;
  //const radius = fullRadius * innerRadius;
  //context.arc(center, center, radius, 0, Math.PI * 2);
  //context.fillStyle = spriteColor;
  //context.globalAlpha = 1;
  //context.fill();

  //// Outer circle.
  //context.arc(center, center, fullRadius, 0, Math.PI * 2);
  //context.globalAlpha = 0.1;
  //context.fill();

  // Firefly cartography.
  const hue = cubehelix(spriteColor).h;
  const r0 = 0;
  const r1 = fullRadius;
  const gradient = context.createRadialGradient(
    center,
    center,
    r0,
    center,
    center,
    r1
  );
  const glowColor = cubehelix(hue, 2, 0.8, 0.2);
  gradient.addColorStop(0, 'white');
  const pinpointLightRadius = 0.02;
  gradient.addColorStop(pinpointLightRadius, 'white');

  const n = 10;
  for (let i = 1; i < n; i++) {
    const p = i / (n - 1);
    const x = p * 3;
    glowColor.opacity =
      (((1 / Math.sqrt(2 * Math.PI)) * Math.pow(Math.E, -(x * x) / 2)) /
        0.3989422804014327 -
        0.01110899653824231) *
      opacity;
    gradient.addColorStop(
      pinpointLightRadius + p * (1 - pinpointLightRadius),
      glowColor
    );
  }
  context.fillStyle = gradient;
  context.fillRect(0, 0, side, side);

  return canvas;
};
