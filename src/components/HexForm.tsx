import { FormEvent, useState } from 'react';
import { ColorResult } from 'react-color';
import { ColorPicker } from './ColorPicker';

export type Props = {
  enableCoords: boolean;
  onSubmit: (values: { x: number; y: number; color: string }) => void;
  disabled?: boolean;
};

export function HexForm(props: Props) {
  const { disabled } = props;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [color, setColor] = useState('#ffffff');

  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.onSubmit({ x, y, color });
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.enableCoords ? (
        <div className="row mb-3">
          <div className="col">
            <label className="form-label" htmlFor="X">
              X
            </label>
            <input
              type="number"
              className="form-control"
              id="X"
              placeholder="X"
              value={x}
              onChange={(event) => setX(Number(event.target.value))}
            />
          </div>
          <div className="col">
            <label className="form-label" htmlFor="Y">
              Y
            </label>
            <input
              type="number"
              className="form-control"
              id="Y"
              placeholder="Y"
              value={y}
              onChange={(event) => setY(Number(event.target.value))}
            />
          </div>
        </div>
      ) : null}
      <div className="row">
        <div className="col">
          <label className="form-label">Colore</label>
          <ColorPicker color={color} onChangeComplete={handleChangeComplete} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <button type="submit" className="btn btn-primary" disabled={disabled}>
            Applica
          </button>
        </div>
      </div>
    </form>
  );
}
