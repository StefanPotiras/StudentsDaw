// @ts-nocheck
import InformationMain from "./InformationMain";
import { useRecoilState } from "recoil";
import axios from "axios";
import {

  DivRefState,
  studentState,
  StudentData,
  groupState,
  groupTypeState,
  GroupData,
  GroupTypeData,
  groupState1,
  groupTypeState1,
  selectedStudent,
} from "../../atoms/atom";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Table2 from "./Table2";
import SlideBar from "./SlideBar";
import Table1 from "./Table1";
import { useReactToPrint } from "react-to-print";


const Main = () => {
  const router = useRouter();
  const [students, setStudents] = useRecoilState(studentState);
  const [refData, setRefData] = useRecoilState(DivRefState);

  const [groups1, setGroups1] = useRecoilState(groupState1);
  const [groupsType1, setGroupsType1] = useRecoilState(groupTypeState1);
  const [currentStudent, setCurrentStudent] = useState<StudentData>();
  const [student, setStudent] = useRecoilState(selectedStudent);

  const [load, setLoad] = useState<boolean>(false);

  const [isSelected, setIsSelected] = React.useState(true);
  const { workID } = router.query;

  const componentRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    setRefData(componentRef);
  }, []);

  useEffect(() => {
    let copy = [...students];
    let test = copy.filter((index) => {
      return index.studentId === Number(workID);
    });

    setCurrentStudent((student) => ({
      ...test[0],
    }));
    setStudent((student) => ({
      ...test[0],
    }));
    const url1 = "https://localhost:7024/api/Groups/" + test[0].groupId;

    const loadGroup = async () => {
      const response = await axios.get(url1);
      setGroups1(response.data);

      const url2 =
        "https://localhost:7024/api/GroupTypes/" + response.data.groupTypeId;
      const response1 = await axios.get(url2);

      setGroupsType1(response1.data);
      setLoad(true);
    };
    loadGroup();

    console.log(currentStudent);
  }, [router.query]);

  return (
    <>
      {load == true && (
        <div
          
          className="bg-[#eff4f9] w-[100vw] lg:w-[69vw] m-auto h-[20h]"
        >
          <div className="flex flex-row items-center md:justify-start justify-center ml-[1.5rem]">
            <div className="text-[1.5rem] md:text-[2rem] ">
              {currentStudent.firstName} {currentStudent.lastName} 
            </div>
          </div>

          <InformationMain
      
      ></InformationMain> 
           <SlideBar
        setIsSelected={setIsSelected}
        isSelected={isSelected}
      ></SlideBar>  
           <Table1 studentId={currentStudent.studentId}></Table1>   
        </div>
      )}

  
    </>
  );
};

export default Main;
