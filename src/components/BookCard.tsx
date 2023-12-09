import Image from 'next/image';
import React from 'react';

import { Book } from '../../types';

interface propsType {
  book: Book;
  handleBuyBook?: () => void;
}

const ProductCard: React.FC<propsType> = ({ book, handleBuyBook }) => {
  return (
    <div className="p-4 border border-gray-200 rounded-xl min-w-[200px] max-w-[400px]">
      <div>
        <Image
          src={book.cover_image}
          alt={book.title}
          width={200}
          height={300}
          className="object-cover w-full h-full rounded-md"
        />
      </div>

      <div className="space-y-2 py-2">
        <h2 className="text-accent font-medium uppercase">{book.title}</h2>
        <p className="text-gray-500 max-w-[150px]">{book.writer}</p>

        <div className="flex flex-row items-center justify-between">
          <div className="font-bold flex gap-4">${book.price}</div>
          <div className="bg-blackish rounded-full" onClick={handleBuyBook}>
            <p className="text-white text-base text-center px-3 py-1">
              Buy now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
