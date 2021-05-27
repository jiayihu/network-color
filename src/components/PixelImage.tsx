import { css } from '@emotion/css';

export type Props = {
  pixels: string[];
  width: number;
  height: number;
  activeColors: string[];
};

export function PixelImage(props: Props) {
  const { pixels, width, height, activeColors } = props;

  return (
    <div
      className={css(imgStyle, {
        gridTemplateColumns: `repeat(${width}, 3px)`,
        gridTemplateRows: `repeat(${height}, 3px)`,
      })}
    >
      {Array.from({ length: width * height }, (_, i) => i).map((i) => {
        const color = pixels[i];
        const isActive = activeColors.includes(color);

        return (
          <span
            className={css(dotStyle, {
              backgroundColor: isActive ? color : 'transparent',
            })}
            key={i}
          ></span>
        );
      })}
    </div>
  );
}

const imgStyle = css({
  border: '1px dashed #ccc',
  display: 'grid',
  gap: '2px',
});

const dotStyle = css({
  borderRadius: '50%',
});
