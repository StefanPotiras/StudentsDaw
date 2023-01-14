import React, { useEffect } from 'react'
import FormData from '../components/Form/Form'
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { studentState } from "../atoms/atom";
import workID from './[workID]';
const FormPage = () => {
  const router = useRouter();
  const [students, setStudents] = useRecoilState(studentState);

  useEffect(()=>{
    const {workID}=router.query;
    let changeState = students.map((el) =>
    el.selected == true ? { ...el, selected: false } : el
     );
     setStudents([...changeState]);

  },[workID]);
 

  return (
    <FormData/>
  )
}

export default FormPage