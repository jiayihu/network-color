import { useEffect, useRef } from 'react';
import chroma from 'chroma-js';
import { css } from '@emotion/css';

export type Props = {
  pixels: string[];
  width: number;
  height: number;
  activeColors: string[];
};

function setCanvasPixel(rgba: Uint8ClampedArray, width: number, i: number, [r, g, b]: number[]) {
  rgba[i * 4] = r;
  rgba[i * 4 + 1] = g;
  rgba[i * 4 + 2] = b;
  rgba[i * 4 + 3] = 255;
}

export function PixelImage(props: Props) {
  const { pixels, width, height, activeColors } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d')!;
    const rgba = pixels.reduce((rgba, pixel, i) => {
      const isActive = activeColors.includes(pixel);

      if (isActive) {
        setCanvasPixel(rgba, width, i, chroma(pixel).rgb());
      } else {
        setCanvasPixel(rgba, width, i, [255, 255, 255]);
      }

      return rgba;
    }, new Uint8ClampedArray(width * height * 4));

    const imageData = new ImageData(rgba, width, height);
    ctx.putImageData(imageData, 0, 0);
  }, [pixels, activeColors, width, height]);

  return (
    <div
      className={css({
        width: width * 2,
        height: height * 2,
        border: '2px solid #eee',
        overflow: 'hidden',
      })}
    >
      <canvas ref={canvasRef} className={css({ width: width * 2, height: height * 2 })} />
    </div>
  );
}
