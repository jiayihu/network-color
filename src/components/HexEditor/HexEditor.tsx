import './HexEditor.css';
import { css, cx } from '@emotion/css';
import { Fragment } from 'react';
import { groupBy } from '../../helpers';

export type Props = {
  hexStream: string;
  decimal: boolean;
  skipLast: number;
};

export function HexEditor(props: Props) {
  const hexStream = Array.from(props.hexStream).slice(0, props.hexStream.length - props.skipLast);
  const pairs = groupBy(hexStream, 2).map((pair) => {
    const hex = pair.join('');

    return props.decimal ? `${parseInt(hex, 16)}` : hex;
  });
  const binaries = Array.from(props.hexStream.slice(props.hexStream.length - props.skipLast));
  const rows = groupBy([...pairs, ...binaries], 8);

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
      {rows.map((row, i) => {
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
  rowGap: '0.25rem',
  fontSize: 14,
});

const columnStyles = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 2.25rem)',
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
