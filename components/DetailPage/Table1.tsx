// @ts-nocheck
import React, { useEffect,useState } from "react";
import {
 
  selectedStudent,
  studentState,
  noteState,
  modalUpdateVisible,
  selectedNotaTabel
  
  
} from "../../atoms/atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import axios from "axios";

import { GrUpdate }  from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import ModalNoteUpdate from "../modal/ModalNoteUpdate";

const Table1: React.FC<{
  studentId: number;
}> = (props) => {


    
    const router = useRouter();

    const [students, setStudents] = useRecoilState(selectedStudent);
    const [notes, setNotes] = useRecoilState(noteState);
    const [selectedNota, setSelectedNota] = useRecoilState(selectedNotaTabel);
    const [noteUpdate,setNoteUpdate]=useRecoilState(modalUpdateVisible);

  useEffect(() => {
    const url1 = "https://localhost:7024/api/Notes/" + students.studentId;
    const loadGroup = async () => {
      const response = await axios.get(url1);
      console.log(response.data);
      setNotes(response.data);    
    };

    loadGroup();
  }, [students]);
  
 async function deleteNotes(id: number | undefined) {
  const url = "https://localhost:7024/api/Notes/" + id;
  await  axios.delete(url)
  .then(response => alert("Sters cu succes"))
  .catch(error => { 
     alert('There was an error!'+error);
  });

  
     
}

  const handleDelete= (event: React.FormEvent) => {
    event.preventDefault();
    const id = event.target.id;
    debugger
    const copy = [...notes];
    const index = copy.findIndex((copyNote,curentIndex)=>{
      if(copyNote.id == id){
        return true;
      }
    });
    if(index !==-1)
    {
         copy.splice(index,1);
    }
    console.log(copy);
    setNotes(copy);
    deleteNotes(id);
  }
  const handleUpdate =(event: React.FormEvent) =>{
    event.preventDefault();
    const id = event.target.id;
    const index = id.substring(0, id.indexOf('.'));
    setSelectedNota(index); 
    console.log(index);   
    
    setNoteUpdate(true);
  }

  return (
    <div className="w-full overflow-auto h-[63vh]">
      <table className="table w-full">
        
        <thead className="h-[10vh]">
          
          <tr>
            <th className="text-center">Nota</th>
            <th className="text-center">Materie</th>
            <th className="text-center">Tip Materie</th>
            <th className="text-center">Profesor</th>
            <th className="text-center">Data  </th>
            <th className="text-center">Delete  </th>
            <th className="text-center">Update  </th>
          </tr>
          
        </thead>
        <tbody>
          {notes.map((row) => (
            <tr key={row.id}>
              <td className="">
                <div className="flex justify-center font-bold">{row.grade}</div>
              </td>
              <td>
                <div className="flex justify-center font-bold">
                  {row.subject.fullName}
                </div>
              </td>
              <td>
                <div className="flex justify-center font-bold">
                 {row.subject.shortName}
                </div>
              </td>
              <td>
                <div className="flex justify-center font-bold">
                  {row.professor.firstName} {row.professor.lastName}
                </div>
              </td>
              <td>
                <div className="flex justify-center font-bold">
                  {row.examDate}
                </div>
              </td>
              <td>
                <div className="flex justify-center">
                <button className="btn btn-error " id={row.id} onClick={handleDelete}><RiDeleteBin6Line></RiDeleteBin6Line></button>
                </div>
                
              </td>
              <td>
                <div className="flex justify-center">
                <button className="btn btn-primary"  id={row.id+".update"} onClick={handleUpdate}><GrUpdate></GrUpdate></button>
                </div>
                
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      { noteUpdate && <ModalNoteUpdate></ModalNoteUpdate>}
    </div>
  );
};

export default Table1;
