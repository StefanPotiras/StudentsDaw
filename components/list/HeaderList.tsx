import React, { useEffect } from "react";
import { IoReload } from "react-icons/io5";
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { FcAlphabeticalSortingZa } from "react-icons/fc";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import {
  studentState,
  studentStateDefault,
  selectedStudent,
} from "../../atoms/atom";

const HeaderList = () => {
  const router = useRouter();
  const [students, setStudents] = useRecoilState(studentState);
  const [studentsDefault, setStudentsDefault] =
    useRecoilState(studentStateDefault);
  const [student, setStudent] = useRecoilState(selectedStudent);
  const strAscending: React.MouseEventHandler<HTMLDivElement> = () => {
    let sortedAsceding = [...students].sort((a, b) => {
      return a.firstName.localeCompare(b.firstName);
    });
    setStudents(sortedAsceding);
  };

  const strDes: React.MouseEventHandler<HTMLDivElement> = () => {
    let sortedDesc = [...students].sort((a, b) => {
      return b.firstName.localeCompare(a.firstName);
    });
    setStudents(sortedDesc);
  };

  const reset: React.MouseEventHandler<HTMLDivElement> = () => {
    let newDefault = studentsDefault.map((el) =>
      el.studentId == student.studentId ? { ...el, selected: true } : el
    );
    setStudents(newDefault);
  };
  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (!e.target.value) {
      let newDefault = studentsDefault.map((el) =>
        el.studentId == student.studentId ? { ...el, selected: true } : el
      );
      setStudents(newDefault);
    } else {
      const resultArray = studentsDefault.filter(
        (st) =>
          st.firstName.includes(e.target.value) ||
          st.lastName.includes(e.target.value)
      );
      setStudents(resultArray);
    }
  };

  return (
    <div className="w-full bg-[#eff4f9] flex flex-col justify-center items-center p-2 space-y-[2vh] h-[16vh]">
      <div className="flex w-full justify-between items-center">
        <div className="md:text-2xl font-bold">
          Students ( {students.length} )
        </div>
        <div className="flex flex-row ">
          <div
            className="btn btn-ghost btn-xs text-[20px] cursor-pointer"
            onClick={reset}
          >
            <IoReload></IoReload>
          </div>
          <div className="flex ">
            {/* <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button lg:hidden bg-white font-bold text-black text-[25px]"
        > */}
            <div
              className="btn btn-ghost btn-xs text-[20px] cursor-pointer"
              onClick={strAscending}
            >
              <FcAlphabeticalSortingAz />
            </div>
            <div
              className="btn btn-ghost btn-xs text-[20px] cursor-pointer"
              onClick={strDes}
            >
              <FcAlphabeticalSortingZa />
            </div>
          </div>
        </div>
      </div>
      <input
        required
        id="Material"
        placeholder="Search Student by Name"
        name="Material"
        type="text"
        autoFocus
        className="input input-bordered input-ghost w-full"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default HeaderList;
