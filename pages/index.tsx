import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { FcSearch } from "react-icons/fc";
import logo from "../resources/fmi.png";

import { AiOutlineMenu } from "react-icons/ai";

const Home: NextPage = () => {
  return (
    <div className=" h-[98vh] w-[100vw] lg:w-[70vw]">
      <div className="h-[9vh]  bg-[#feb300] relative  flex flex-row items-center justify-between lg:justify-center  w-[100vw] lg:w-[69vw] m-auto mt-1 shadow-2xl p-3">
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button lg:hidden bg-white font-bold text-black text-[25px] ml-4 md:ml-0"
        >
          <AiOutlineMenu></AiOutlineMenu>
        </label>
        <div className="text-white text-lg sm:text-xl md:text-2xl font-bold  mr-4 md:mr-0">
          Facultatea de Matematica si Informatica
        </div>
      </div>

      <div className="h-[89vh] flex flex-col justify-center items-center">
        <div className="text-[7rem] md:text-[15rem] text-center  flex flex-col items-center">
         
          <div className="text-[1.1rem] sm:text-[1.3rem] md:text-[2rem] w-[30vw]">
            
              <span className="wave text-[10rem]">👋🏻</span>
            
          </div>
        </div>

        <div className="flex items-center absolute mt-[70vh] ">
          <Image src={logo} alt="Logo" /> 
    
        </div>
      </div>
    </div>
  );
};

export default Home;
