'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import ProductCard from './BookCard';
import axios from 'axios';
import { BASE_URL } from '../../data';
import { Book } from '../../types';
import AnimationView from './AnimationView';

const Books = () => {
  const [data, setData] = useState<Array<Book>>([]);
  const [list, setList] = useState<'home' | 'my books'>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getBooks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(BASE_URL + '/books');
      if (data.status === 200) {
        setData(data?.data);
        console.log('fetched data --> ', data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // useEffect function to filter the data using search query
  useEffect(() => {
    const filteredData = data.filter(
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
      {loading ? (
        <AnimationView animationType="loading" message="Loading..." />
      ) : (
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

          {!Boolean(data.length) ? (
            <AnimationView animationType="empty" message="No books to show" />
          ) : (
            <div>
              {list.toLowerCase() === 'home' ? (
                <div className="mt-5 grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
                  {data.map((item, index) => (
                    <ProductCard book={item} key={index} />
                  ))}
                </div>
              ) : null}
              {list.toLowerCase() === 'my books' ? (
                <div className="mt-5 grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
                  {data.map((item, index) => (
                    <ProductCard book={item} key={index} />
                  ))}
                </div>
              ) : null}
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
            {data.map((item, index) => (
              <ProductCard book={item} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;
