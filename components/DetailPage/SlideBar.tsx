import * as React from "react";
interface TabPanelProps {
  setIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
  isSelected: boolean;
}
import MyDialog from '../modal/ModalNote'


import { useRecoilState } from "recoil";
import { modalVisible } from "../../atoms/atom";
function TabPanel(props: TabPanelProps) {
  const [visibleModal,setVisibleModal]= useRecoilState(modalVisible);
  const { ...other } = props;

  function onClickModal(){
      setVisibleModal(true);
  }
  const slideBarCss1 = props.isSelected
    ? " "
    : "tab text-white text-blue-200 pb-[4.5vh] border-b-[0.8vh] text-base sm:text-xl md:text-3xl";
  return (
    <div className="w-full ">
      <div className="tabs bg-[#ff5e6c] h-[9vh]  font-bold shadow-2xl pl-5 pr-5">
       <h1 className="tab tab-active text-white pb-[4.5vh] border-b-[0.8vh] text-base sm:text-xl md:text-3xl m-auto ">NOTE</h1>
        <button className="float-left btn btn-success mb-[2vh]" onClick={onClickModal}>ADD</button>
      </div>
  { visibleModal && <MyDialog></MyDialog>}
    </div>
  );
}
export default TabPanel;
