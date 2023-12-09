'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import ProductCard from './BookCard';
import LoadingView from './AnimationView';

const productsData = [
  {
    id: 1,
    owner: null,
    title: 'The Maid',
    writer: 'Nita Prose',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1643228739i/55196813.jpg',
    price: 25,
    tags: ['Mystery'],
  },
  {
    id: 2,
    owner: null,
    title: 'Carrie Soto Is Back',
    writer: 'Taylor Jenkins',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1649848581i/60435878.jpg',
    price: 30,
    tags: ['Fiction'],
  },
  {
    id: 3,
    owner: null,
    title: 'House of Sky',
    writer: 'Sarah J. Maas',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1633097753i/40132775.jpg',
    price: 20,
    tags: ['Fantasy'],
  },
  {
    id: 4,
    owner: null,
    title: 'Book Lovers',
    writer: 'Emily Henry',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1638867089i/58690308.jpg',
    price: 18,
    tags: ['Fiction'],
  },
  {
    id: 5,
    owner: null,
    title: 'Sea of Tranquility',
    writer: 'Emily St. John',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1626710416i/58446227.jpg',
    price: 22,
    tags: ['Fiction'],
  },
  {
    id: 6,
    owner: null,
    title: 'Hidden Pictures',
    writer: 'Jason Rekulak',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1635260162i/58724923.jpg',
    price: 15,
    tags: ['Horror'],
  },
  {
    id: 7,
    owner: null,
    title: 'Bad Gays: A Homosexual History',
    writer: 'Huw Lemmey',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1631844850i/59012057.jpg',
    price: 28,
    tags: ['History'],
  },
  {
    id: 8,
    owner: null,
    title: 'Heartstopper: Volume Four',
    writer: 'Alice Oseman',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1640745736i/56060300.jpg',
    price: 10,
    tags: ['Self-help'],
  },
  {
    id: 9,
    owner: null,
    title: 'Lessons in Chemistry',
    writer: 'Bonnie Garmus',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1634748496i/58065033.jpg',
    price: 35,
    tags: ['History'],
  },
  {
    id: 10,
    owner: null,
    title: 'I’m Glad My Mom Died',
    writer: 'Jennette McCurdy',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1649228846i/59366244.jpg',
    price: 26,
    tags: ['Autobiography'],
  },
  {
    id: 11,
    owner: null,
    title: 'The Final Gambit',
    writer: 'Jennifer Lynn Barnes',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1634068432i/59233594.jpg',
    price: 32,
    tags: ['Fiction'],
  },
  {
    id: 12,
    owner: null,
    title: 'The Dark Queens',
    writer: 'Shelley Puhak',
    cover_image:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1593216033i/53138220.jpg',
    price: 24,
    tags: ['Biography'],
  },
];

const Books = () => {
  const [data, setData] = useState(productsData);
  const [list, setList] = useState<'home' | 'my books'>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // useEffect function to filter the data using search query
  useEffect(() => {
    const filteredData = productsData.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.writer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredData);
  }, [searchQuery]);

  const handleLinkClick = () => {
    console.log(list);
    list === 'home' ? setList('my books') : setList('home');
  };
  return (
    <div className="mb-10">
      <div className="container pt-16">
        <h2 className="font-medium text-2xl pb-4">Books</h2>

        <div className="w-full sm:w-[300px] md:w-[70%] mx-auto relative">
          <input
            className="border-gray-200 border p-2 px-4 rounded-lg w-full"
            type="text"
            placeholder="Search books..."
            onChange={handleSearch}
          />

          <BsSearch
            className="absolute right-0 top-0 mr-3 mt-3 text-gray-400"
            size={20}
          />
        </div>

        <div className="hidden md:block py-7">
          <div className="container">
            <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
              <a
                className="relative navbar__link cursor-pointer"
                onClick={handleLinkClick}
              >
                Home
              </a>
              <a
                className="relative navbar__link cursor-pointer"
                onClick={handleLinkClick}
              >
                Your books
              </a>
            </div>
          </div>
        </div>

        {!Boolean(productsData.length) ? (
          <LoadingView animationType="empty" message="No books to show" />
        ) : list.toLowerCase() === 'home' ? (
          <div className="mt-5 grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
            {data.map((item, index) => (
              <ProductCard book={item} key={index} />
            ))}
          </div>
        ) : null}

        {!Boolean(productsData.length) ? (
          <LoadingView animationType="empty" message="No books to show" />
        ) : list.toLowerCase() === 'my books' ? (
          <div className="mt-5 grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
            {data.map((item, index) => (
              <ProductCard book={item} key={index} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Books;
