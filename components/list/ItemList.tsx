import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { StudentData, studentState } from "../../atoms/atom";
const ItemList: React.FC<{
  firstName: string;
  cnp?: string;
  lastName: string;
  studentId?: number;
  groupId?: number;
  active?: boolean;
  email: string;
  notes: [];
  group?: null;
  selected: boolean;
}> = (props) => {
  const router = useRouter();
  const [students, setStudents] = useRecoilState(studentState);

  const showDetailEmployeeHandeler = () => {
    let changeState = students.map((el) =>
      el.selected == true ? { ...el, selected: false } : el
    );

    let newMarkers = changeState.map((el) =>
      el.studentId == props.studentId ? { ...el, selected: true } : el
    );
    setStudents([...newMarkers]);
    router.push("/" + props.studentId);
  };

  

  const backgroundColor = props.selected
    ? "w-[100%] flex flex-row justify-between md:text-[1.2rem] active h-[6rem] bg-[#feb300] text-white"
    : "w-[100%] flex flex-row justify-between md:text-[1.2rem] h-[6rem]";

  return (
    <>
      <li onClick={showDetailEmployeeHandeler}>
        <div className={backgroundColor}>
          {props.studentId}. {props.firstName} {props.lastName}
        </div>
      </li>
    </>
  );
};

export default ItemList;
