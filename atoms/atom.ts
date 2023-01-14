import React from "react";
import { atom } from "recoil";
import internal from "stream";

export interface GroupData {
  fullName: string;
  active: boolean;
  groupId: number;
  groupTypeId:number;
  shortName:string;
  students:[];
  groupType:number;
}

export interface GroupTypeData {
  fullName: string;
  active: boolean;
  groupTypeId: number;
}

export interface NoteData {
  examDate: string;
  grade: number;
  id: number;
}


export interface StudentData{
  firstName: string;
  cnp?: string;
  lastName: string;
  studentId?: number;
  groupId?: number;
  active?: boolean;
  email:string;
  notes:[];
  group?:null;
  selected: boolean
}

export const selectedNotaTabel = atom({
  key: "modalSeletedNota",
  default: -1 as number
});

export const studentState = atom({
  key: "studentData",
  default: [] as StudentData[]
});
export const modalVisible = atom({
  key: "modalData",
  default: false as boolean
});
export const modalUpdateVisible = atom({
  key: "modalUpdateData",
  default: false as boolean
});

export const noteState = atom({
  key: "noteData",
  default: [] as []
});
export const studentStateDefault = atom({
  key: "studentDataDefault",
  default: [] as StudentData[]
});

export const selectedStudent = atom({
  key: "studentSelected",
  default: {} as StudentData
});

export const groupState = atom({
  key: "groupData",
  default: [] as GroupData[]
});
export const groupState1 = atom({
  key: "groupData1",
  default: {} as GroupData
});

export const groupTypeState = atom({
  key: "groupData",
  default: [] as GroupTypeData[]
});

export const groupTypeState1 = atom({
  key: "groupTypeData1",
  default: {} as GroupTypeData
});

export const DivRefState = atom({
  key: "refData",
  default: null as unknown as React.RefObject<HTMLDivElement>,
});


