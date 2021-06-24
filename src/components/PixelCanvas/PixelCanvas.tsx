import { useRef, useState } from 'react';
import { groupBy } from '../../helpers';
import chroma from 'chroma-js';
import { css } from '@emotion/css';
import { PixelImage } from '../PixelImage';

export type Props = {
  imgSrc: string;
  width: number;
  height: number;
  palette: string[];
  activeColors: string[];
  hideOriginal?: boolean;
};

function mostSimilarInPalette(palette: string[], color: string) {
  return palette.reduce(
    (best, paletteColor) => {
      const delta = chroma.deltaE(paletteColor, color);

      return delta < best.delta ? { delta, paletteColor } : best;
    },
    { delta: 100, paletteColor: palette[0] },
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractPalette(pixels: string[]) {
  const colorsByCount = pixels.reduce((count, color) => {
    count.set(color, (count.get(color) || 0) + 1);

    return count;
  }, new Map<string, number>());
  const mostPopularEntries = Array.from(colorsByCount.entries()).sort((a, b) => b[1] - a[1]);
  const mostPopularColors = mostPopularEntries.map(([color]) => color);

  // console.log(mostPopularEntries);

  const palette = new Array(30).fill(null).reduce(
    (palette: string[]) => {
      const nextColor = mostPopularColors.find(
        (color) => mostSimilarInPalette(palette, color).delta > 7,
      );

      if (nextColor) palette.push(nextColor);

      return palette;
    },
    [mostPopularColors[0]],
  );

  return palette;
}

function approximateDot(pixels: string[]) {
  const blackPixels = pixels.filter((pixel) => pixel === '#000000').length;

  if (blackPixels > 2) return '#000000';
  else if (blackPixels === 2) return pixels[0];
  else return '#ffffff';
}

function getColumns(pixels: string[][]) {
  const columns: string[][] = [];

  for (let column = 0; column < 32; column += 1) {
    columns.push([]);

    for (let row = 0; row < 4; row += 1) {
      columns[column].push(pixels[row][column]);
    }
  }

  return columns;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function extractQRBitmap(pixels: string[]) {
  const columns = groupBy(pixels, 4).map((dot) => approximateDot(dot));
  const rows = groupBy(columns, 32);
  const rowGroups = groupBy(rows, 4);
  const finalRows = rowGroups.map((rowGroup) =>
    getColumns(rowGroup).map((column) => approximateDot(column)),
  );

  return finalRows;
}

export function PixelCanvas(props: Props) {
  const { imgSrc, width, height, palette, activeColors, hideOriginal } = props;
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
      const color = chroma([r, g, b]).hex();

      return color;
    });

    // const bitmap = extractQRBitmap(pixels).flat();
    // console.log(bitmap);

    const uniqueColors = Array.from(new Set(pixels));

    // const palette = extractPalette(pixels);
    // console.log(palette);

    const approxMap = uniqueColors.reduce((map, color) => {
      map.set(color, mostSimilarInPalette(palette, color).paletteColor);

      return map;
    }, new Map<string, string>());
    const approxPixels = pixels.map((pixel) => approxMap.get(pixel) || '#000000');

    setPixels(approxPixels);
  };

  return (
    <div>
      {pixels ? (
        <div className="d-flex justify-content-center">
          <PixelImage pixels={pixels} width={width} height={height} activeColors={activeColors} />
        </div>
      ) : null}

      <canvas ref={canvasRef} className={canvasStyle} />

      <div className="text-center my-3">
        <img
          ref={imgRef}
          src={imgSrc}
          alt="Pika"
          width={width}
          height={height}
          onLoad={handleLoad}
          className={css({ display: hideOriginal ? 'none' : 'static' })}
        />
      </div>
    </div>
  );
}

const canvasStyle = css({
  display: 'none',
});
