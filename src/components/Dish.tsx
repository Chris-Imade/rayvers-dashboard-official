import React, { useState } from 'react';
import { generateRandomNumber } from '../utils/randomGenerator';

interface DishProps {
  dish: Dish;
}

const Dish: React.FC<DishProps> = ({ dish }) => {
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <div className="mx-2 pb-4 border-b-2 border-b-white">
      <div className="relative">
        <img
          src={dish.image_urls[imageIndex].url}
          className="rounded-md"
          width={300}
          alt={`image-${generateRandomNumber(5)}`}
        />
        <div className='flex justify-between absolute top-[50%] left-0 right-0'>
          <button onClick={() => setImageIndex(prev => (prev > 0 ? prev - 1 : 0))} className='bg-slate-700 w-6 h-6 rounded-full'>&larr;</button>
          <button onClick={() => setImageIndex(prev => (prev < dish.image_urls.length - 1 ? prev + 1 : dish.image_urls.length - 1))} className='bg-slate-700 w-6 h-6 rounded-full'>&rarr;</button>
        </div>
      </div>

      <div className='mt-4'>
        <h2 className='text-white font-semibold'>{dish?.name}</h2>
        <p>{dish.description}</p>
        <p>Category Id: {dish.category}</p>
      </div>
    </div>
  );
};

export default Dish;