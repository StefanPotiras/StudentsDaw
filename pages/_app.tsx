import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import ListWithHeader from "../components/list/ListWithHeader";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(()=>{
    console.log(123123);  })
  return (
    <RecoilRoot>
      <div className="flex h-[100vh]" data-theme="winter">
      <div className="hidden lg:inline">
      <ListWithHeader/>
      </div>
        <div className=" drawer ">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
          <Component {...pageProps} />
            
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4  w-80 bg-base-100 inline lg:hidden">
              <ListWithHeader/>
            </ul>
            
          </div>
        </div>
       
        
      </div>
    </RecoilRoot>
  );
}

export default MyApp;
