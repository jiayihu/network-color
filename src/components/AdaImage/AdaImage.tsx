import { useState } from 'react';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { HexForm } from '../../components/HexForm';
import { Packets } from '../Packets/Packets';
import { PixelCanvas } from '../PixelCanvas/PixelCanvas';
import adaImg from './ada-128.png';
import { useEffect } from 'react';
import { getDb } from '../../db';
import { Redirect, useParams } from 'react-router-dom';
import chroma from 'chroma-js';
import { css, cx } from '@emotion/css';

// const solution = {
//   /** ["rgb(157,169,154)", "rgb(39,30,29)", "rgb(96,83,35)", "rgb(67,59,50)", "rgb(0,0,0)"] */
//   alpha: ['#9da99a', '#271e1d', '#605323', '#433b32', '#000000'],
//   /** ["rgb(204,196,132)", "rgb(175,161,148)", "rgb(193,167,154)", "rgb(46,48,50)", "rgb(86,86,80)"] */
//   beta: ['#ccc484', '#afa194', '#c1a79a', '#2e3032', '#565650'],
//   /** ["rgb(231,206,192)", "rgb(138,122,112)", "rgb(199,196,161)", "rgb(101,97,85)", "rgb(68,70,72)"] */
//   gamma: ['#e7cec0', '#8a7a70', '#c7c4a1', '#656155', '#444648'],
//   /** ["rgb(142,147,136)", "rgb(77,69,32)", "rgb(237,216,38)", "rgb(234,227,168)", "rgb(243,228,201)"]  */
//   delta: ['#8e9388', '#4d4520', '#edd826', '#eae3a8', '#f3e4c9'],
//   /** ["rgb(114,107,12)", "rgb(53,45,28)", "rgb(186,186,184)", "rgb(114,119,122)", "rgb(255,255,255)"] */
//   epsilon: ['#726b0c', '#352d1c', '#babab8', '#72777a', '#ffffff'],
// };

/**
 * Alpha IP: 31.13.86.36 1f0d5624
 * Beta IP: 93.57.123.17 5d397b11
 * Gamma IP: 142.250.180.74 8efab44a
 * Delta IP: 172.217.21.78 acd9154e
 * Epsilon IP: 216.58.206.68 d83ace44
 */
const packets = [
  '88e9fe877f08101331b7943a080045000053000040003311ec5dd83ace2e1f0d56240e890f6400243988009da99a',
  '88e9fe877f08101331b7943a080045000045000040003411ec5dd83ace2ed83ace440f0b0c8d0024398802babab8',
  '88e9fe877f08101331b7943a080045000035000040003711ec5dd83ace2eacd9154e0c130bd80024398803eae3a8',
  '88e9fe877f08101331b7943a080045000042000040003911ec5dd83ace2e5d397b110bcb0f480024398802c1a79a',
  '88e9fe877f08101331b7943a080045000059000040003411ec5dd83ace2e8efab44a0ed60db60024398802c7c4a1',
  '88e9fe877f08101331b7943a080045000038000040005511ec5dd83ace2ed83ace440f4a0e5d0024398804ffffff',
  '88e9fe877f08101331b7943a080045000052000040004411ec5dd83ace2eacd9154e0ed50c4d00243988014d4520',
  '88e9fe877f08101331b7943a080045000039000040005511ec5dd83ace2ed83ace440d360e700024398801352d1c',
  '88e9fe877f08101331b7943a080045000056000040003011ec5dd83ace2e1f0d56240d6910570024398802605323',
  '88e9fe877f08101331b7943a080045000055000040005211ec5dd83ace2eacd9154e0fdd100d0024398802edd826',
  '88e9fe877f08101331b7943a080045000035000040005511ec5dd83ace2e5d397b110fe810070024398804565650',
  '88e9fe877f08101331b7943a080045000045000040004611ec5dd83ace2ed83ace440c530cd4002439880372777a',
  '88e9fe877f08101331b7943a080045000039000040004411ec5dd83ace2e1f0d56240d020efa0024398804000000',
  '88e9fe877f08101331b7943a080045000045000040005211ec5dd83ace2e1f0d56240c4b100b0024398801271e1d',
  '88e9fe877f08101331b7943a080045000055000040004511ec5dd83ace2ed83ace44101510240024398800726b0c',
  '88e9fe877f08101331b7943a080045000040000040003411ec5dd83ace2eacd9154e0ed60e7f00243988008e9388',
  '88e9fe877f08101331b7943a080045000051000040004011ec5dd83ace2e8efab44a0eab0ffd0024398803656155',
  '88e9fe877f08101331b7943a080045000044000040005611ec5dd83ace2e8efab44a0f740bd40024398800e7cec0',
  '88e9fe877f08101331b7943a080045000042000040004411ec5dd83ace2e8efab44a0ce70d370024398804444648',
  '88e9fe877f08101331b7943a080045000038000040004611ec5dd83ace2e1f0d56240f720eb70024398803433b32',
  '88e9fe877f08101331b7943a080045000044000040006011ec5dd83ace2e8efab44a0ea40f2e00243988018a7a70',
  '88e9fe877f08101331b7943a080045000049000040003811ec5dd83ace2e5d397b110bd80c7b0024398801afa194',
  '88e9fe877f08101331b7943a080045000036000040003211ec5dd83ace2eacd9154e0c290f0b0024398804f3e4c9',
  '88e9fe877f08101331b7943a080045000032000040003911ec5dd83ace2e5d397b110f570e470024398800ccc484',
  '88e9fe877f08101331b7943a080045000036000040005811ec5dd83ace2e5d397b110e120e1e00243988032e3032',
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
];

type Group = 'alpha' | 'beta' | 'gamma' | 'delta' | 'epsilon';
type Groups = Record<Group, string[]>;
const allowedGroups: Group[] = ['alpha', 'beta', 'gamma', 'delta', 'epsilon'];

const groupPallettes = palette.reverse().reduce<Groups>(
  (groups, color, i) => {
    Object.values(groups)[i % 5].push(color);

    return groups;
  },
  { alpha: [], beta: [], gamma: [], delta: [], epsilon: [] },
);

export function AdaImage() {
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const { group }: { group: Group } = useParams();
  const groupPalette = groupPallettes[group];

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(getDb(), 'images', 'ada'), (doc) => {
      const activeColors = (doc.data() as any).activeColors || [];
      setActiveColors(activeColors);
    });

    return unsubscribe;
  }, []);

  const handleSubmit = ({ color }: { color: string }) => {
    if (!groupPalette.includes(color)) {
      return alert(
        `Il colore rgb(${chroma(color)
          .rgb()
          .join(', ')}) non esiste nell'immagine o non appartiene al tuo gruppo`,
      );
    }

    const nextIndex = groupPalette.findIndex((color) => !activeColors.includes(color));
    const colorIndex = groupPalette.indexOf(color);

    if (activeColors.includes(color)) {
      return alert(`Il colore è stato già inserito`);
    }

    if (nextIndex !== colorIndex) {
      return alert(`Non è il prossimo colore da inserire`);
    }

    updateDoc(doc(getDb(), 'images', 'ada'), {
      activeColors: arrayUnion(color),
    });
  };

  const handleReset = () =>
    updateDoc(doc(getDb(), 'images', 'ada'), {
      activeColors: [],
    });

  if (!allowedGroups.includes(group)) {
    alert(
      `Il gruppo ${group} non esiste. I gruppi validi sono: alpha, beta, gamma, delta, epsilon.`,
    );
    return <Redirect to="/" />;
  }

  const isFinished = groupPalette.every((color) => activeColors.includes(color));

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <PixelCanvas
            imgSrc={adaImg}
            width={128}
            height={128}
            palette={palette}
            activeColors={activeColors}
            hideOriginal
          />
        </div>
        <div className="col-md-6">
          <Packets packets={packets} skipLast={0} />
          <hr className="my-3"></hr>
          {isFinished && (
            <div className="alert alert-secondary" role="alert">
              Hai completato l'esercizio
            </div>
          )}
          <HexForm enableCoords={false} onSubmit={handleSubmit} disabled={isFinished} />
        </div>
      </div>
      <div className="mt-5 border-top pt-3">
        <button type="button" className="btn" onClick={handleReset}>
          Reset del gioco per tutti
        </button>
      </div>
    </div>
  );
}
