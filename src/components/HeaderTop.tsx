'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { BASE_URL } from '../../data';
import { User } from '../../types';

const HeaderTop = () => {
  const [userData, setUserData] = useState<User>();

  const getUserData = async () => {
    const storedUserDataString = sessionStorage.getItem('user');

    if (storedUserDataString !== null) {
      const storedUserData = JSON.parse(storedUserDataString);
      console.log('user data --> ', storedUserData);

      const { data } = await axios.get(
        `${BASE_URL}/user/profile/${storedUserData.id}`
      );
      console.log('user data --> ', data);
      if (data.status === 200) {
        setUserData(data.data);
        sessionStorage.setItem('user', JSON.stringify(data.data));
      }
      setUserData(storedUserData);
    } else {
      console.log('No user data found in sessionStorage');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="border-b border-gray-200 hidden sm:block">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <div className="hidden lg:flex gap-1">
            <div className="header_top__icon_wrapper">
              <BsFacebook />
            </div>
            <div className="header_top__icon_wrapper">
              <BsTwitter />
            </div>
            <div className="header_top__icon_wrapper">
              <BsInstagram />
            </div>
            <div className="header_top__icon_wrapper">
              <BsLinkedin />
            </div>
          </div>

          <div className="text-gray-500 text-[12px]">
            <b>FREE SHIPPING</b> THIS WEEK ORDER OVER - $55
          </div>

          <div className="flex gap-4">
            <select
              className="text-gray-500 text-[12px] w-[80px]"
              name="language"
              id="language"
            >
              <option value="English">English</option>
              <option value="French">French</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
