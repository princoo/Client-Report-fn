import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { SupportGroupImages } from '../pages/supportGroup/interface';

export default function Carousel(props: { images: SupportGroupImages[] }) {
  const { images } = props;
  const [currentImageIndex, setcurrentImageIndex] = useState<number>(0);

  const nextSlide = () => {
    setcurrentImageIndex((prevIndex: number) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setcurrentImageIndex((prevIndex: number) => (prevIndex - 1 + images.length) % images.length);
  };
  return (
    <div>
      <div id="default-carousel" className="relative w-full" data-carousel="slide">
        {/* <!-- Carousel wrapper --> */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-all ${index === currentImageIndex ? 'block' : 'hidden'} duration-700 ease-in-out`}
              data-carousel-item
            >
              <img
                src={image.url}
                alt={`Slide ${index + 1}`}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <div className="actions">
            {/* <!-- Slider indicators --> */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
              {images.map((_image, index) => (
                <>
                  <button
                    type="button"
                    className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-gray-600' : 'bg-gray-300'}`}
                    aria-current="true"
                    aria-label={`Slide ${currentImageIndex}`}
                    data-carousel-slide-to="0"
                    onClick={() => setcurrentImageIndex(index)}
                  ></button>
                </>
              ))}
            </div>
            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <FontAwesomeIcon icon="arrow-left" onClick={prevSlide} />
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <FontAwesomeIcon icon="arrow-right" onClick={nextSlide} />
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
