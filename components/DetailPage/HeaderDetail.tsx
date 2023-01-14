import React, { useRef } from "react";
import { FcPrint } from "react-icons/fc";
import { MdOutlinePersonSearch } from "react-icons/Md";
import { MdAspectRatio } from "react-icons/Md";
import { AiOutlineMenu } from "react-icons/ai";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useRecoilState } from "recoil";
import { DivRefState, selectedStudent, StudentData, studentState } from "../../atoms/atom";
import { useRouter } from "next/router";
import axios from "axios";
const HeaderDetail = () => {
  const [refData, setRefData] = useRecoilState(DivRefState);
  const [student, setStudent] = useRecoilState(selectedStudent);
  const [students,setStudents]=useRecoilState(studentState);
  const router = useRouter();
  const handelerPrint = useReactToPrint({
    content: () => refData.current,
    documentTitle: "Test",
    //onAfterPrint: () => alert("PrintSucces"),
    copyStyles:false,
  });


 async function deleteStudents(studentId: number | undefined) {
    const url = "https://localhost:7024/api/Students/" + studentId;
    debugger
    await  axios.delete(url)
    .then(response => alert("Sters cu succes"))
    .catch(error => { 
       alert('There was an error!'+error);
    });

    
       
  }

  const strDes: React.MouseEventHandler<HTMLButtonElement> = () => {
    const copy = [...students];
    const index = copy.findIndex((copySt,curentIndex)=>{
      if(copySt.studentId === student.studentId){
        return true;
      }
    });
    if(index !==-1)
    {
         copy.splice(index,1);
    }
    console.log(copy);
    deleteStudents(student.studentId);
   debugger
    router.push("/"+students[index-1].studentId);
    setStudents(copy);
  };



  return (
    <div className="h-[9vh] bg-[#feb300] relative flex flex-row items-center justify-between shadow-sm px-[30px] text-white text-3xl font-bold  w-[100vw] lg:w-[69vw] md:m-auto md:mt-2 ">
     
       
        <div className="text-[1rem] truncate md:text-2xl ms:text-[1.3rem] hidden md:flex ">
         Detalii Student
        </div>
        <button className="btn btn-error" onClick={strDes} >Delete</button>
     
     
    </div>
  );
};

export default HeaderDetail;
