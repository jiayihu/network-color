import { css, cx } from '@emotion/css';
import { groupBy } from '../helpers';

type Props = {
  pixels: string[];
  width: number;
  height: number;
  activeRows: boolean[];
};

export function QRPixels(props: Props) {
  const { pixels, width, height, activeRows } = props;

  return (
    <div
      className={cx(
        qrStyle,
        css({
          gridTemplateColumns: `repeat(${width}, .5rem)`,
          gridTemplateRows: `repeat(${height}, .5rem)`,
        }),
      )}
    >
      {groupBy(pixels, width).map((row, i) => {
        return row.map((pixel, j) => (
          <span
            style={{ backgroundColor: activeRows[i] ? pixel : 'transparent' }}
            key={i * width + j}
          ></span>
        ));
      })}
    </div>
  );
}

const qrStyle = css({
  display: 'grid',
});
