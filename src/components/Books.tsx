'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import BookCard from './BookCard';
import axios from 'axios';
import { BASE_URL } from '../../data';
import { Book, User } from '../../types';
import AnimationView from './AnimationView';
import AuthForm from './AuthForm';

const Books = () => {
  const [data, setData] = useState<Array<Book>>([]);
  const [myBooks, setMyBooks] = useState<Array<Book>>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [list, setList] = useState<'home' | 'my books'>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>();

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

  const getUserData = async () => {
    const storedUserDataString = sessionStorage.getItem('user');

    if (storedUserDataString !== null) {
      const storedUserData = JSON.parse(storedUserDataString);
      console.log('session storage data --> ', storedUserData);

      const { data } = await axios.get(
        `${BASE_URL}/user/profile/${storedUserData.id}`
      );
      console.log('user data --> ', data);
      if (data.status === 200) {
        setUserData(data.data);
        sessionStorage.setItem('user', JSON.stringify(data.data));
      }
    } else {
      console.log('No user data found in sessionStorage');
    }
  };

  useEffect(() => {
    getBooks();
    getUserData();
  }, []);

  useEffect(() => {
    getUserBooks();
  }, [userData?.id]);

  const getUserBooks = async () => {
    console.log('user data exists --> ', userData);
    try {
      setLoading(true);
      console.log('user data --> ', userData);
      const { data } = await axios.get(
        `${BASE_URL}/user/${userData?.id}/books`
      );
      console.log('response --> ', data);
      if (data.status === 200) {
        setMyBooks(data?.data);
        console.log('fetched data --> ', data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // useEffect function to filter the data using search query
  useEffect(() => {
    if (searchQuery) {
      const filteredData = data.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.writer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(data);
    }
  }, [searchQuery, data]);

  const handlePurchaseBook = async (bookId: number) => {
    if (userData) {
      const userConfirmation = window.confirm(
        'Do you want to purchase this book?'
      );
      if (!userConfirmation) {
        return;
      }
      console.log('purchasing book with id --> ', bookId);
      setLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/books/purchase/${bookId}`,
        {
          userId: userData.id,
        }
      );

      console.log('response --> ', data);

      if (data.status === 200) {
        alert('Book purchased successfully');
        window.location.reload();
      }
      if (
        data.status === 201 &&
        data.message.toLowerCase() === 'You have already purchased this book'
      ) {
        alert('You have already purchased this book');
      }

      setLoading(false);
    } else {
      alert('Please login to purchase a book');
      toggleModal();
    }
  };

  const handleLinkClick = (link: 'home' | 'my books') => {
    setList(link);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div className="mb-10">
      {loading ? (
        <AnimationView animationType="loading" message="Loading..." />
      ) : (
        <div className="container pt-16">
          <div className="flex flex-row justify-between items-center">
            <h2 className="font-medium text-2xl pb-4">Books</h2>
            <span className="text-blackish">
              Balance: ${userData?.balance ?? 0}
            </span>
          </div>

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
                <div
                  className="relative navbar__link cursor-pointer"
                  onClick={() => handleLinkClick('home')}
                >
                  Home
                </div>
                <div
                  className="relative navbar__link cursor-pointer"
                  onClick={() => handleLinkClick('my books')}
                >
                  Your books
                </div>
              </div>
            </div>
          </div>

          <div>
            {list.toLowerCase() === 'home' && (
              <>
                {Boolean(data.length) ? (
                  <div className="mt-5 grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
                    {data.map((item, index) => (
                      <BookCard
                        book={item}
                        key={index}
                        handleBuyBook={(id) => handlePurchaseBook(id)}
                      />
                    ))}
                  </div>
                ) : (
                  <AnimationView
                    animationType="empty"
                    message="No books to show"
                  />
                )}
              </>
            )}

            {list.toLowerCase() === 'my books' && (
              <>
                {Boolean(myBooks.length) ? (
                  <div className="mt-5 grid grid-cols-1 place-items-center sm:place-items-start sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 gap-10 xl:gap-x-20 xl:gap-y-10">
                    {myBooks.map((item, index) => (
                      <BookCard book={item} key={index} />
                    ))}
                  </div>
                ) : (
                  <AnimationView
                    animationType="empty"
                    message={
                      userData
                        ? "You don't have any books"
                        : 'Please log in to view and purchase books'
                    }
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}

      {modalOpen && <AuthForm onClose={toggleModal} type="login" />}
    </div>
  );
};

export default Books;
