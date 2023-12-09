'use client';
import React, { useEffect, useState } from 'react';

import { BsSearch } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { FiHeart } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import AuthForm from './AuthForm';
import axios from 'axios';
import { BASE_URL } from '../../data';

const HeaderMain = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toggleLoginModal = () => {
    setLoginModalOpen(!loginModalOpen);
  };
  const toggleRegisterModal = () => {
    setRegisterModalOpen(!registerModalOpen);
  };

  const getUserData = async () => {
    const storedUserDataString = sessionStorage.getItem('user');

    if (storedUserDataString !== null) {
      const storedUserData = JSON.parse(storedUserDataString);
      console.log('User data from sessionStorage:', storedUserData);
      const { data } = await axios.get(
        `${BASE_URL}/user/profile/${storedUserData.id}`
      );
      console.log('user data x --> ', data);
      if (data.status === 200) {
        setUserData(data.data);
        sessionStorage.setItem('user', JSON.stringify(data.data));
      }
    } else {
      console.log('No user data found in sessionStorage');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="border-b border-gray-200 py-6">
      <div className="container sm:flex justify-between items-center">
        <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
          SickBooks
        </div>

        <div className="flex gap-4 text-gray-500 text-[30px] justify-center items-center sm:justify-between">
          {userData && userData.name ? (
            <p className="text-base mg:text-lg text-blackish font-semibold text-end">
              {userData.name}
            </p>
          ) : (
            <div className="flex flex-row gap-3">
              <button
                className="navbar__link relative"
                onClick={toggleLoginModal}
              >
                <p className="text-base text-center px-3 py-1">Login</p>
              </button>
              <button
                className="navbar__link relative"
                onClick={toggleRegisterModal}
              >
                <p className=" text-base text-center px-3 py-1">Register</p>
              </button>
            </div>
          )}
          <BiUser />
        </div>
      </div>
      {loginModalOpen && <AuthForm onClose={toggleLoginModal} type="login" />}
      {registerModalOpen && (
        <AuthForm onClose={toggleRegisterModal} type="signup" />
      )}
    </div>
  );
};

export default HeaderMain;
