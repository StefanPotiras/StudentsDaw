import React, { Fragment } from "react";

import HeaderList from "./HeaderList";
import ItemList from "./ItemList";
import Link from "next/link";
import { useRecoilState } from "recoil";


import ListBody from "./ListBody";
import NextLink from "next/link";


const ListWithHeader = () => {
 
  return (
    <div className="grid-rows-4 m-0 h-full w-full lg:w-[30vw]" >
      <div className="grid">
       
        <HeaderList></HeaderList>
      </div>
      <div className="grid" >
     
       <ListBody></ListBody> 
      </div >
      <div className="grid h-[9vh] ">
        <NextLink href="/FormPage" passHref>
          <button
            className="btn w-full h-[7vh] text-md font-bold bg-[#ff5e6c] text-2xl mt-[1vh] text-white"
          >
            Adauga
          </button>
        </NextLink>
      </div>
    </div>   
  );
};

export default ListWithHeader;
