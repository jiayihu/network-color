import { useState } from 'react';
import { HexForm } from '../../components/HexForm';
import { Packets } from '../Packets/Packets';
import { PixelCanvas } from '../PixelCanvas/PixelCanvas';
import adaImg from './ada-128.png';

const packets = [
  '88e9fe877f08101331b7943a08004540006c000040003a11d7b1d83ace2ec0a8017e01bbd0c9005884494afd13aba07d6f4477362bdf34fe626e94eabb0264d2dd0baa00fa53d4a9891d8c5f6cdec3ec9b6141e30c3165c2d0eed9debb584bdd3eb6c3bed620c8f46659b74efb013a6608dd8e9b5e196c54ee23',
  '101331b7943a88e9fe877f08080045000040bf710000401152acc0a8017ed83ace2ed0c901bb002ce1d2426252fd1f98b3a661331d1989c6a919ca2d65fe79e7c7279aefbc334bf7417ce1bb9155',
  '88e9fe877f08101331b7943a08004540003e000040003a11d7dfd83ace2ec0a8017e01bbd0c9002a007a4ae21c690c21f67240c1585e2a6134f0edb644913c0f5a954025d8ba3f6a78f7c78c',
  '101331b7943a88e9fe877f0808004500003d1e1c00004011f404c0a8017ed83ace2ed0c901bb0029a747436252fd1f98b3a6616fcdb4c6a1b569cd1d9a47d6908177c2cb4686f9c42ced19',
  '88e9fe877f08101331b7943a08004580008d000040003a11d750d83ace2ec0a8017e01bbd0c90079f62559fcf3d931b57a360e31c337a8138fa5d16d8c4962d38fc359973b02b0d5c9a82eccf5638df4b988747f85738c75e0cf4377ea2d05f6493c7c3fcf5e4a9bf29f118a8a14dd406622810d061a737e3bd4622401d96366c7e8c4e8bc7e56b606e24599586eb40bfcd5d1be2536f4e6d25202',
];

const palette = [
  '#ffffff',
  '#f3e4c9',
  '#444648',
  '#565650',
  '#000000',
  '#72777a',
  '#eae3a8',
  '#656155',
  '#2e3032',
  '#433b32',
  '#babab8',
  '#edd826',
  '#c7c4a1',
  '#c1a79a',
  '#605323',
  '#352d1c',
  '#4d4520',
  '#8a7a70',
  '#afa194',
  '#271e1d',
  '#726b0c',
  '#8e9388',
  '#e7cec0',
  '#ccc484',
  '#9da99a',
  '#abc1ac',
  '#fdfdef',
];

export function AdaImage() {
  const [activeColors, setActiveColors] = useState<string[]>([
    '#ffffff',
    '#f3e4c9',
    '#444648',
    '#565650',
    '#000000',
    '#72777a',
    '#eae3a8',
    '#656155',
    '#2e3032',
    '#433b32',
    '#babab8',
    '#edd826',
    '#c7c4a1',
    '#c1a79a',
    '#605323',
    '#352d1c',
    '#4d4520',
    '#8a7a70',
    '#afa194',
    '#271e1d',
    '#726b0c',
    '#8e9388',
    '#e7cec0',
    '#ccc484',
    '#9da99a',
    '#abc1ac',
    '#fdfdef',
  ]);

  const handleSubmit = ({ color }: { color: string }) => {
    console.log(color);
    if (!palette.includes(color)) {
      return alert('Invalid color');
    }

    setActiveColors([...activeColors, color]);
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <PixelCanvas
          imgSrc={adaImg}
          width={128}
          height={128}
          palette={palette}
          activeColors={activeColors}
        />
      </div>
      <div className="col-md-6">
        <Packets packets={packets} />
        <hr className="my-3"></hr>
        <HexForm enableCoords={false} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
