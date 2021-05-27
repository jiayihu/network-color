import { useRef, useState } from 'react';
import { groupBy } from '../../helpers';
import tinycolor from 'tinycolor2';
import pikaImg from './pika-64.png';
import { css } from '@emotion/css';
import { PixelImage } from '../PixelImage';

export type Props = {
  activeColors: string[];
  colorReplacements: { [color: string]: string | undefined };
};

export function PixelCanvas(props: Props) {
  const { activeColors, colorReplacements } = props;
  const [pixels, setPixels] = useState<string[] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = () => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const img = imgRef.current;
    const { width, height } = img;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d')!;

    context.drawImage(img, 0, 0, width, height);
    const data = context.getImageData(0, 0, width, height);
    const dataPixels = Array.from(data.data.values());
    const pixels = groupBy(dataPixels, 4).map(([r, g, b]) => {
      const color = tinycolor({ r, g, b }).toHexString();
      const replacement = colorReplacements[color];

      return replacement ? replacement : color;
    });

    const uniqueColors = Array.from(new Set(pixels));
    console.log(uniqueColors);

    setPixels(pixels);
  };

  return (
    <div>
      {pixels ? (
        <div className="d-flex justify-content-center">
          <PixelImage pixels={pixels} width={64} height={64} activeColors={activeColors} />
        </div>
      ) : null}

      <canvas ref={canvasRef} className={canvasStyle} />

      <div className="text-center my-3">
        <img ref={imgRef} src={pikaImg} alt="Pika" width={64} height={64} onLoad={handleLoad} />
      </div>
    </div>
  );
}

const canvasStyle = css({
  display: 'none',
});
