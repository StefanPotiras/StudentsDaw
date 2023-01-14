import React ,{useEffect}from "react";
import { GroupData, GroupTypeData } from "../../atoms/atom";
import { useRecoilState } from "recoil";
import { groupState1 ,groupTypeState1,selectedStudent} from "../../atoms/atom";
const InformationMain: React.FC<{
 
}> = (props) => {
  const [groups1, setGroups1] = useRecoilState(groupState1);
  const[groupsType1,setGroupsType1]=useRecoilState(groupTypeState1);
  const [student, setStudent] = useRecoilState(selectedStudent);
  
  return (
    <div className="pl-[1.5rem] pr-[1.5rem] pb-[1rem] ">
      <div
        className="flex md:flex-row
    flex-col justify-between text-lg "
      >
        <div>
          <p className="md:mb-2">Grupa: {groups1.fullName}</p>
          <p className="mb-2 md:mb-0">Specializarea:{groupsType1.fullName}</p>
          <p className="mb-2 md:mb-0">CNP:{student.cnp}</p>
        </div>

        
      </div>

      
    </div>
  );
};

export default InformationMain;
