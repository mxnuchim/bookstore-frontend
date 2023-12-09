'use client';
import React, { useState } from 'react';

import { BsSearch } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { FiHeart } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import AuthForm from './AuthForm';

const HeaderMain = () => {
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  const toggleLoginModal = () => {
    setLoginModalOpen(!loginModalOpen);
  };
  const toggleRegisterModal = () => {
    setRegisterModalOpen(!registerModalOpen);
  };

  return (
    <div className="border-b border-gray-200 py-6">
      <div className="container sm:flex justify-between items-center">
        <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
          SickBooks
        </div>

        <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
          <button className="bg-accent rounded-full" onClick={toggleLoginModal}>
            <p className="text-white text-base text-center px-3 py-1">Login</p>
          </button>
          <button
            className="bg-accent rounded-full"
            onClick={toggleRegisterModal}
          >
            <p className="text-white text-base text-center px-3 py-1">
              Register
            </p>
          </button>
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
