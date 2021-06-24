import { css, cx } from '@emotion/css';
import { useState } from 'react';
import { groupBy } from '../../helpers';

type Props = {
  onSubmit: (row: number, bitRow: boolean[]) => void;
};

export function QRForm(props: Props) {
  const [row, setRow] = useState(0);
  const [bitRow, setBitRow] = useState(new Array(32).fill(false));

  return (
    <form
      action=""
      onReset={(e) => {
        e.preventDefault();
        setBitRow(new Array(32).fill(false));
      }}
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(row, bitRow);
      }}
    >
      <div className="form-group row">
        <label htmlFor="row-number" className="col-2 col-form-label">
          Riga
        </label>
        <div className="col-10">
          <input
            type="number"
            className="form-control"
            id="row-number"
            value={row}
            onChange={(e) => setRow(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center flex-wrap">
        {groupBy(bitRow, 8).map((group, i) => {
          const row = group.map((on, j) => (
            <input
              className={cx('form-check-input my-2', checkStyle)}
              type="checkbox"
              key={i * 8 + j}
              checked={on}
              onChange={() => {
                const updatedBitRow = bitRow.map((x, k) => (k === i * 8 + j ? !x : x));
                setBitRow(updatedBitRow);
              }}
            />
          ));

          return (
            <div className="form-check form-check-inline" key={i}>
              {row}
            </div>
          );
        })}
      </div>
      <div className="mt-3">
        <button type="reset" className="btn btn-secondary mr-3">
          Reset
        </button>
        <button type="submit" className="btn btn-primary">
          Invia
        </button>
      </div>
    </form>
  );
}

const checkStyle = css({
  appearance: 'none',
  display: 'inline-block',
  width: '.875rem',
  height: '.875rem',
  border: '1px solid #ccc',
  borderRadius: '3px',
  ':checked': {
    border: '1px solid #000',
    backgroundColor: '#000',
  },
});
