import { css, cx } from '@emotion/css';
import chroma from 'chroma-js';
import { Checkboard } from 'react-color/lib/components/common';
import ColorWrap from 'react-color/lib/components/common/ColorWrap';

type Props = {
  hex: string;
  onChange: (hex: string) => void;
};

export const ColorPicker = ColorWrap(function ColorPicker(props: any) {
  const { hex, onChange } = props as Props;

  const handleChange = (hexCode: any) => {
    const hex = hexCode as string;
    chroma.valid(hex) && onChange(hex);
  };

  const transparent = hex === 'transparent';

  const [r, g, b] = chroma(hex).rgb();

  return (
    <div className={cardStyle}>
      <div
        className={cx(
          headStyle,
          css({
            backgroundColor: hex,
          }),
        )}
      >
        {transparent && <Checkboard />}
        <span
          className={cx(
            labelStyle,
            css({
              color: chroma.contrast(hex, '#fff') > 4.5 ? '#fff' : '#00',
            }),
          )}
        >
          rgb({chroma(hex).rgb().join(', ')})
        </span>
      </div>

      <div className={bodyStyle}>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className={cx('input-group-text', inputStyle)}>R</span>
          </div>
          <input
            type="number"
            min={0}
            max={255}
            className={cx('form-control', inputStyle)}
            value={r}
            onChange={(e: any) => handleChange(chroma([e.target.value, g, b]).hex())}
          />
          <div className="input-group-prepend">
            <span className={cx('input-group-text', inputStyle)}>G</span>
          </div>
          <input
            type="number"
            min={0}
            max={255}
            className={cx('form-control', inputStyle)}
            value={g}
            onChange={(e: any) => handleChange(chroma([r, e.target.value, b]).hex())}
          />
          <div className="input-group-prepend">
            <span className={cx('input-group-text', inputStyle)}>B</span>
          </div>
          <input
            type="number"
            min={0}
            max={255}
            className={cx('form-control', inputStyle)}
            value={b}
            onChange={(e: any) => handleChange(chroma([r, g, e.target.value]).hex())}
          />
        </div>
      </div>
    </div>
  );
});

const cardStyle = css({
  width: '20rem',
  background: '#fff',
  border: '1px solid #eee',
  boxShadow: '0 1px rgba(0,0,0,.1)',
  borderRadius: '6px',
  position: 'relative',
});

const headStyle = css({
  height: '10rem',
  borderBottom: '1px solid #ddd',
  borderRadius: '6px 6px 0 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

const bodyStyle = css({
  padding: '10px',
});

const labelStyle = css({
  fontSize: '18px',
  position: 'relative',
});

const inputStyle = css({
  fontSize: '14px',
});
