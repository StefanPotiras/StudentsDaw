import React from "react";
import { IoClose, IoExpand } from "react-icons/io5";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  return (

    <div
    className="h-[9vh] bg-[#feb300] relative flex flex-row items-center justify-between shadow-sm px-[30px]  w-[100vw] lg:w-[69vw] m-auto lg:mt-2"
     
    >
      <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button lg:hidden bg-white font-bold text-black text-[20px] "
        >
         
         <AiOutlineMenu ></AiOutlineMenu>
        </label>
        
      <div   className="text-lg md:text-2xl font-bold text-white text-center"  >
       Adauga un student nou
      </div>
  
    </div>
  );
};

export default Header;
