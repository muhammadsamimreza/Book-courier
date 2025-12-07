import React from "react";
import { FaBold, FaBook } from "react-icons/fa";
import { Link } from "react-router";
const Logo = () => {
  return (
    <Link to="/" className="cursor-pointer">
      <h1 className="text-2xl font-bold flex items-center"> 
        <span className="text-green-600">Book</span>
        <span className="text-black">Express</span>
      </h1>
    </Link>
  );
};

export default Logo;
