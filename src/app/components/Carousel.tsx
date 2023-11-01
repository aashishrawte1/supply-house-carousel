// components/Carousel.tsx
import { useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.css';

const Carousel = ({ items }: any) => {
  const [currentIndex, setCurrentIndex] = useState<any>(0);
  const [isDragging, setIsDragging] = useState<any>(false);
  const [startX, setStartX] = useState(0);

  const containerRef = useRef<any>(null);

  const prevSlide = () => {
    setCurrentIndex((prevIndex: any) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex: any) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;

    const offsetX = e.clientX - startX;
    containerRef.current.scrollLeft -= offsetX;
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleResize = () => {
      // Adjust the width of the container based on the number of items
      if (containerRef.current) {
        const itemWidth = containerRef.current.clientWidth / items.length;
        containerRef.current.scrollLeft = currentIndex * itemWidth;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex, items]);

  return (
    <div className={styles.carousel}>
      <button onClick={prevSlide}>Previous</button>
      <div
        className={styles['carousel-container']}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {items.map((item: any, index: any) => (
          <div
            key={index}
            className={`${styles['carousel-item']} ${index === currentIndex ? styles.active : ''}`}
          >
            <img src={item.imageUrl} alt={`Item ${index}`} />
          </div>
        ))}
      </div>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Carousel;
