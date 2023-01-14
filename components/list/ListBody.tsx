import React, { useState , useEffect} from "react";

import ItemList from "./ItemList";
import { useRecoilState } from "recoil";
import { studentState, studentStateDefault } from "../../atoms/atom";
import { StudentData } from "../../atoms/atom";
import NoteModal from "../modal/ModalNote";
const ListBody = () => {
  const [students,setStudents]= useRecoilState(studentState);
  const [studentsDefault,setStudentsDefault]= useRecoilState(studentStateDefault);
  const [temp,setTemp]= useState<StudentData[]>([]);

   useEffect(() => {
    const url = "https://localhost:7024/api/Students";
     fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((professorsFromServer) => {

       setTemp(professorsFromServer);
       console.log(professorsFromServer);
      })
      .catch((error) => {
        //console.log(error);
        alert(error);
      });

      

  }, []);

useEffect(()=>{
 
   let changeState = temp.map((el) =>
   el.selected == null ? { ...el, selected: false } : el);
   setStudents([...changeState]);
   setStudentsDefault([...changeState]);
},[temp,setTemp]);

  function getProfessors() {
    
  }


  
  // useEffect(() => {
  //   getProfessors();
  // }, []);
 
 
  return (
    <div className="w-full h-[75vh] overflow-auto" >
      <ul className="menu bg-neutral-500 rounded-box"
       
      >
         {students.map((item) => (
          <ItemList key={item.studentId}
            firstName= {item.firstName}
            lastName={item.lastName}
            active={item.active}
            studentId={item.studentId}
            groupId={item.groupId}
            group={item.group}
            selected={item.selected}
            cnp={item.cnp}
            notes={item.notes}
            email={item.email}

          ></ItemList>
        ))} 
      </ul>
      
    </div>
  );
};

export default ListBody;
