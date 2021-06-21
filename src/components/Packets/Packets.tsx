import './Packets.css';
import { useState } from 'react';
import { Carousel, CarouselControl, CarouselItem } from 'reactstrap';
import { HexEditor } from '../HexEditor/HexEditor';

export type Props = {
  packets: string[];
};

export function Packets(props: Props) {
  const { packets } = props;
  const [displayHex, setDisplayHex] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleHexChange = () => setDisplayHex(!displayHex);

  const handleNext = () => {
    const nextIndex = activeIndex === packets.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const handlePrevious = () => {
    const nextIndex = activeIndex === 0 ? packets.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = packets.map((packet) => {
    return (
      <CarouselItem key={packet}>
        <div className="carousel-caption">
          <HexEditor hexStream={packet} decimal={!displayHex} />
        </div>
      </CarouselItem>
    );
  });

  return (
    <div>
      <div className="custom-control custom-switch">
        <input
          className="custom-control-input"
          type="checkbox"
          id="hex"
          onChange={handleHexChange}
        />
        <label className="custom-control-label" htmlFor="hex">
          Visualizza in hex
        </label>
      </div>
      <div className="text-center">
        {activeIndex + 1} / {packets.length}
      </div>
      <Carousel
        activeIndex={activeIndex}
        next={handleNext}
        previous={handlePrevious}
        interval={false}
        className="carousel-dark"
      >
        {slides}
        <CarouselControl direction="prev" directionText="" onClickHandler={handlePrevious} />
        <CarouselControl direction="next" directionText="" onClickHandler={handleNext} />
      </Carousel>
    </div>
  );
}
