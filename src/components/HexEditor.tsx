import { css, cx } from '@emotion/css';
import { Fragment } from 'react';
import { groupBy } from '../helpers';

export type Props = {
  hexStream: string;
};

export function HexEditor(props: Props) {
  const hexStream = Array.from(props.hexStream);
  const hexPairs = groupBy(hexStream, 2).map((pair) => pair.join(''));
  const hexRows = groupBy(hexPairs, 8);

  const headers = Array.from({ length: 8 }, (_, i) => i).map((x) =>
    x.toString(16).padStart(2, '0').toUpperCase(),
  );

  return (
    <div className={cx(hexStyles, 'monospace')}>
      <div></div>
      <div className={columnStyles}>
        {headers.map((header) => (
          <span className={cx(valueStyle, headerStyle)} key={header}>
            {header}
          </span>
        ))}
      </div>
      {hexRows.map((row, i) => {
        const rowIndex = (i * 8).toString(16).padStart(4, '0').toUpperCase();

        return (
          <Fragment key={i}>
            <div className={cx(valueStyle, headerStyle)}>{rowIndex}</div>
            <div className={columnStyles}>
              {row.map((hex, j) => (
                <span className={valueStyle} key={i + '' + j}>
                  {hex}
                </span>
              ))}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

const hexStyles = css({
  display: 'grid',
  gridTemplateColumns: '3rem auto',
  columnGap: '1rem',
});

const columnStyles = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 2rem)',
});

const headerStyle = css({
  backgroundColor: '#e9ecef',
});

const valueStyle = css({
  textAlign: 'center',

  '&:hover': css({
    backgroundColor: '#e9ecef',
  }),
});
