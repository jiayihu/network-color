import chroma from 'chroma-js';
import { useState } from 'react';
import { HexForm } from '../HexForm';
import { Packets } from '../Packets/Packets';
import { PixelCanvas } from '../PixelCanvas/PixelCanvas';
import pikaImg from './pika-128.png';

/**
 * Destination: Apple_87:7f:08 (88:e9:fe:87:7f:08)
 * Source: Technico_b7:94:3a (10:13:31:b7:94:3a)
 * Sender IP: 216.58.206.46 d83ace2e
 * Receiver IP: 192.168.1.126 c0a8017e
 * */

const packets = [
  'ffffffffffff88e9fe877f0808004500004881d90000401173fec0a8017ec0a801ffe115e1150034038653706f',
  '101331b7943a88e9fe877f08080045000042048f00004011dbabc0a8017e5d397b11d69201bb002e7d5f5e4001',
  'ffffffffffff88e9fe877f08080045000048da6b000040111b6cc0a8017ec0a801ffe115e1150034038653706f',
  '88e9fe877f08101331b7943a080045800035000040003a113ac98efab44ec0a8017e01bbd48d00212a825ed2b5',
  '88e9fe877f08101331b7943a080045000048000040005111ec5dd83ace2ec0a8017e0ceb104800243988000000', //
  '101331b7943a88e9fe877f0808004500003ebd7b0000401122c3c0a8017e5d397b11d4fd01bb002adf03424000',
  '88e9fe877f08101331b7943a080045000059000040005411ec5dd83ace2ec0a8017e0d660fc100243988eaba3a', //
  '88e9fe877f08101331b7943a08004500003800004000591187445d397b11c0a8017e01bbd4fd00247fd14190c7',
  '101331b7943a88e9fe877f0808004500004266dc00004011795ec0a8017e5d397b11d4fd01bb002ecd54524000',
  '88e9fe877f08101331b7943a080045000034000040005911ec5dd83ace2ec0a8017e0e020d1d00243988ec7a5d', //
  '88e9fe877f08101331b7943a080045800035000040003a11720608080404c0a8017e01bbfc9a0021aaa1536909',
  '88e9fe877f08101331b7943a080045800036000040003a113ac88efab44ec0a8017e01bbd48d0022bec545b020',
  '88e9fe877f08101331b7943a080045000030000040004211ec5dd83ace2ec0a8017e0eb40def00243988ffffff', //
  '101331b7943a88e9fe877f0808004500003da7a500004011cd9bc0a8017e8efab44ed48d01bb00290623569ddd',
  '88e9fe877f08101331b7943a080045000040000040004011ec5dd83ace2ec0a8017e0ec60ccf00243988c8511c', //
  'ffffffffffff88e9fe877f08080045000048867e000040116f59c0a8017ec0a801ffe115e1150034038653706f',
  '88e9fe877f08101331b7943a080045000052000040005011ec5dd83ace2ec0a8017e0ef40ec700243988752609', //
  '88e9fe877f08101331b7943a080045800036000040003a11d791d83ace44c0a8017e01bbc40300229a1d40e09c',
  '01005e0000fb88e9fe877f08080045000049290b0000ff11ef76c0a8017ee00000fb14e914e900350b51000000',
];

/**
["rgb(255, 255, 255)", "rgb(0, 0, 0)", "rgb(117, 38, 9)", "rgb(234, 186, 58)", "rgb(200, 81, 28)", "rgb(236, 122, 93)"]
*/
const palette = ['#ffffff', '#000000', '#752609', '#eaba3a', '#c8511c', '#ec7a5d'];

export function PikaImage() {
  const [activeColors, setActiveColors] = useState<string[]>([]);

  const handleSubmit = ({ color }: { color: string }) => {
    if (!palette.includes(color)) {
      return alert(`Il colore rgb(${chroma(color).rgb().join(', ')}) non è presente`);
    }

    setActiveColors([...activeColors, color]);
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <PixelCanvas
          imgSrc={pikaImg}
          width={128}
          height={128}
          palette={palette}
          activeColors={activeColors}
        />
      </div>
      <div className="col-md-6">
        <Packets packets={packets} skipLast={0} />
        <hr className="my-3"></hr>
        <HexForm enableCoords={false} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
