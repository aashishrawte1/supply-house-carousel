'use client';
//page.tsx
import Carousel from './components/Carousel';

const items = [
  { imageUrl: 'https://picsum.photos/200' },
  { imageUrl: 'https://picsum.photos/200' },
  { imageUrl: 'https://picsum.photos/200' },
  { imageUrl: 'https://picsum.photos/200' },
  { imageUrl: 'https://picsum.photos/200' },
];

const Home = () => {
  return (
    <div>
      <h1>Image Carousel</h1>
      <Carousel items={items} />
    </div>
  );
};

export default Home;
