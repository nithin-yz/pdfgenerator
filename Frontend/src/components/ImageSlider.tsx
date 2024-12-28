import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from './ui/button';

interface Slide {
  url: string;
  title: string;
}

interface ImageSliderProps {
  slides: Slide[];
}

export function ImageSlider({ slides }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-full w-full group">
      <div
        className="h-full w-full rounded-2xl bg-center bg-cover duration-500 shadow-2xl"
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl">
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h3 className="text-2xl font-bold mb-2">{slides[currentIndex].title}</h3>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="hidden group-hover:flex absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
        onClick={goToPrevious}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="hidden group-hover:flex absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white"
        onClick={goToNext}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}