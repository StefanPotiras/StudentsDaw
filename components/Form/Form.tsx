import React, { useState, useEffect, useRef, LegacyRef } from "react";

import InputItem from "./Input";
import Header from "./Header";
import { useRecoilState } from "recoil";
import { GroupData, StudentData, studentState } from "../../atoms/atom";
import useInput from "../../hooks/useInput";

const FormData = () => {
  const [students, setStudents] = useRecoilState(studentState);
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [group, setGroup] = useState<String>();

  const refSelect = useRef<LegacyRef<HTMLSelectElement>>();

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroup(event.target.value);
  };

  useEffect(() => {
    const url = "https://localhost:7024/api/Groups";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((groupsFromSv) => {
        setGroups(groupsFromSv);
      })
      .catch((error) => {
        //console.log(error);
        alert(error);
      });

    console.log(groups);
  }, []);

  const {
    state: firstName,
    handleInputChange: onChangeFirstName,
    resetInput: resetFirstName,
    isValid: isNameValid,
    onTouchedHandler: onTouchedHandlerName,
    hasErrors: hasErrorsName,
  } = useInput((state: string) => state.trim() !== "");

  const {
    state: secondName,
    handleInputChange: onChangeSecondName,
    resetInput: resetSecondName,
    isValid: isFunctionValid,
    onTouchedHandler: onTouchedHandlerFunction,
    hasErrors: hasErrorsFunction,
  } = useInput((state: string) => state.trim() !== "");
  const {
    state: email,
    handleInputChange: onChangeEmail,
    resetInput: resetEmail,
    isValid: isemailValid,
    onTouchedHandler: onTouchedHandlerEmail,
    hasErrors: hasErrorsemail,
  } = useInput((state: string) => state.trim() !== "");
  const {
    state: CNP,
    handleInputChange: onChangeCNP,
    resetInput: resetCNP,
    onTouchedHandler: onTouchedHandlerCNP,
    hasErrors: hasErrorsVariable,
  } = useInput((state: string) => state.trim() !== "");

  let isFormValid = false;

  if (isNameValid) {
    isFormValid = true;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // @ts-ignore
    const group: string = refSelect.current.value;

    let selectGroup = groups.find((gr) => gr.fullName === group);

    console.log(email);
    if (!isNameValid) {
      return;
    }

    let studentToCreate: StudentData = {
      firstName: firstName,
      lastName: secondName,
      email: email,
      cnp: CNP,
      selected: false,
      notes: [],
      groupId: selectGroup?.groupId,
      active: true,
      group: null,
    };

    setStudents([
      ...students,
      {
        firstName: firstName,
        lastName: secondName,
        email: email,
        cnp: CNP,
        selected: false,
        notes: [],
        groupId: selectGroup?.groupId,
        active: true,
        group: null,
        // @ts-ignore
        studentId: students[students.length - 1].studentId + 1,
      },
    ]);
    console.log(students);

    resetFirstName();
    resetEmail();
    resetSecondName();
    resetCNP();

    const url = "https://localhost:7024/api/Students";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentToCreate),
    }).catch((error) => {
      //console.log(error);
      alert(error);
    });
  };

  return (
    <div className="shadow-md flex flex-col  lg:ml-[10px]  h-full items-center lg:w-[69vw] w-[100vw] ">
      <Header />
      <div className="h-full flex justify-center items-center w-[99vw] md:w-[69vw]">
        <div className="flex mt-[30px] justify-center flex-col">
          <InputItem
            inputType={"text"}
            requiredType={true}
            label={"First Name"}
            value={firstName}
            errorText={"Name is empty"}
            error={hasErrorsName}
            functionHandler={onChangeFirstName}
            onBlurHandler={onTouchedHandlerName}
          />
          <InputItem
            inputType={"text"}
            requiredType={false}
            label={"Last Name"}
            value={secondName}
            functionHandler={onChangeSecondName}
            error={false}
            errorText={""}
            onBlurHandler={onTouchedHandlerFunction}
          />
          <InputItem
            inputType={"text"}
            requiredType={false}
            label={"Email"}
            value={email}
            functionHandler={onChangeEmail}
            error={false}
            errorText={""}
            onBlurHandler={onTouchedHandlerEmail}
          />
          <InputItem
            inputType={"text"}
            requiredType={false}
            label={"CNP"}
            value={CNP}
            functionHandler={onChangeCNP}
            error={false}
            errorText={""}
            onBlurHandler={onTouchedHandlerCNP}
          />

          <select
            className="select select-ghost w-full max-w-[] border-solid border-gray-300"
            onChange={selectChange}
            // @ts-ignore
            ref={refSelect}
          >
            {groups.map((item) => (
              <option key={item.groupId}>{item.fullName}</option>
            ))}
          </select>

          <button
            className={`btn bg-[#1565C0] h-[7vh] text-2xl font-bold text-white border-0 mt-5 ${
              !isFormValid && "cursor-not-allowed"
            }`}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormData;
