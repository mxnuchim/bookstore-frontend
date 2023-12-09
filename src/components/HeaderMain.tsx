import React from 'react';

import { BsSearch } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { FiHeart } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';

const HeaderMain = () => {
  return (
    <div className="border-b border-gray-200 py-6">
      <div className="container sm:flex justify-between items-center">
        <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
          SickBooks
        </div>

        <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
          <BiUser />
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
