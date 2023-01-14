// @ts-nocheck
import { useState, Fragment, useRef, LegacyRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import { modalUpdateVisible } from "../../atoms/atom";
import {
  selectedStudent,
  noteState,
  selectedNotaTabel,
} from "../../atoms/atom";
import InputItem from "../Form/Input";
import useInput from "../../hooks/useInput";
import axios from "axios";
function ModalNoteUpdate() {
  const {
    state: Date,
    handleInputChange: onChangeDate,
    resetInput: resetDate,
    onTouchedHandler: onTouchedHandlerDate,
    hasErrors: hasErrorsVariable,
  } = useInput((state: Date) => state !== null);

  let isFormValid = false;

  let [isOpen, setIsOpen] = useRecoilState(modalUpdateVisible);

  const refSelectProffesor = useRef<LegacyRef<HTMLSelectElement>>();
  const refSelectSubject = useRef<LegacyRef<HTMLSelectElement>>();
  const refSelectedNota = useRef<LegacyRef<HTMLSelectElement>>();

  const [student, setStudent] = useRecoilState(selectedStudent);
  const [notes, setNotes] = useRecoilState(noteState);
  const [notaIndex, setIndexNota] = useRecoilState(selectedNotaTabel);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [professors, setProfessors] = useState();

  const [defaultProfessor, setDefaultProfessor] = useState();
  const [defaultSubject, setDefaultSubject] = useState();
  const [defaultDate, setDefaultDate] = useState();

  const [professorsSel, setProfessorsSel] = useState();
  const [subjects, setSubjects] = useState();
  const [note, setNote] = useState([1, 2, 3, 4, 5, 6, , 7, 8, 9, 10]);
  const [loading, setLoading] = useState(false);
  const [nota, setNota] = useState();
  useEffect(() => {
    const loadProfesor = async () => {
      const response = await axios.get("https://localhost:7024/api/Professors");
      setProfessors(response.data);
      //SubjectS
      var tempArraySubjects = [];
      response.data[0].professorSubjects.forEach((element) => {
        tempArraySubjects.push(element.subject);
      });
      console.log(tempArraySubjects);
      setSubjects(tempArraySubjects);
      //professor
      setProfessorsSel(response.data[0]);
      //nota initiala

      let notaSelected = notes.find((gr) => gr.id == notaIndex);
      console.log(notaIndex);
      setNota(notaSelected);
      //subjectInitial

      let selectedSubject = tempArraySubjects.find(
        (gr) => gr.subjectId == notaSelected.subject.subjectId
      );
      setDefaultSubject(selectedSubject);
      setDefaultProfessor(notaSelected.professor);

      // let t: string = nota.examDate;
      // let dateTemp = t.substring(0, t.length - 9);
      // setDefaultDate(dateTemp);
      setLoading(true);
    };
    loadProfesor();
  }, [isOpen]);

  const selectHandellerProffesor = () => {
    const prof: string = refSelectProffesor.current.value;
    const index = prof.substring(0, prof.indexOf("."));
    let selectedProf = professors.find((gr) => gr.professorId == index);
    setProfessorsSel(selectedProf);
    var tempArraySubjects = [];
    selectedProf.professorSubjects.forEach((element) => {
      tempArraySubjects.push(element.subject);
    });
    console.log(tempArraySubjects);

    setSubjects(tempArraySubjects);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // @ts-ignore

    const subject: string = refSelectSubject.current.value;
    const index = subject.substring(0, subject.indexOf("."));
    let selectedSubject = subjects.find((gr) => gr.subjectId == index);

    const nota: number = Number(refSelectedNota.current.value);

    let gradeToCreate = {
      examDate: Date,
      grade: nota,
      //id: email,
      //professor: professorsSel,
      professorId: professorsSel.professorId,
      //student: student,
      studentId: student.studentId,
      // subject: selectedSubject,
      subjectId: selectedSubject.subjectId,
    };

    let gradeToAdd = {
      examDate: Date,
      grade: nota,
      id: notes[notes.length - 1].id + 1,
      professor: professorsSel,
      professorId: professorsSel.professorId,
      student: student,
      studentId: student.studentId,
      subject: selectedSubject,
      subjectId: selectedSubject.subjectId,
    };

    let copy = [...notes];
    const indexNote = copy.findIndex((notesCopyPost, curentIndex) => {
      if (notesCopyPost.id === gradeToAdd.id) {
        return true;
      }
    });
      if(index !==-1){
        copy[indexNote] = gradeToAdd;
      }
    setNotes(copy);

    resetDate();

    const url = "https://localhost:7024/api/Notes";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gradeToCreate),
    }).catch((error) => {
      // console.log(error);
      alert(error);
    });
  };

  return (
    <>
      {loading && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto "
            onClose={closeModal}
          >
            <div
              className="min-h-screen px-4 text-center bg-black/30"
              aria-hidden="true"
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 " />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle "
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-[35vw] p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-medium leading-6 text-gray-900 align-middle text-center mb-8"
                  >
                    Adauga Nota
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col align-middle justify-center items-center">
                    <div className="ml-6">
                      <div className="float-left">Poffesor</div>
                      <select
                        className="select select-ghost w-[30vw] max-w-[] border-solid border-gray-300 mb-4 bg-white"
                        ref={refSelectProffesor}
                        onChange={selectHandellerProffesor}
                        defaultValue={
                          defaultProfessor.professorId +
                          "." +
                          defaultProfessor.firstName +
                          " " +
                          defaultProfessor.lastName
                        }
                      >
                        {professors.map((item) => (
                          <option key={item.professorId}>
                            {item.professorId}.{item.firstName} {item.lastName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="ml-6">
                      <div className="float-left">Subject</div>
                      <select
                        className="select select-ghost w-[30vw] max-w-[] border-solid border-gray-300 mb-4 bg-white"
                        ref={refSelectSubject}
                        defaultValue={
                          defaultSubject.subjectId +
                          "." +
                          defaultSubject.fullName
                        }
                      >
                        {subjects.map((item) => (
                          <option key={item.subjectId}>
                            {item.subjectId}.{item.fullName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="ml-6">
                      <div className="float-left">Nota</div>
                      <select
                        className="select select-ghost w-[30vw] max-w-[] border-solid border-gray-300 mb-4 bg-white"
                        ref={refSelectedNota}
                        defaultValue={nota.grade}
                      >
                        {note.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                    </div>

                    <InputItem
                      inputType={"date"}
                      requiredType={false}
                      label={"Date"}
                      value={Date}
                      functionHandler={onChangeDate}
                      error={false}
                      errorText={""}
                      onBlurHandler={onTouchedHandlerDate}
                      defaultValueInput={defaultDate}
                    />
                  </div>

                  <div className="mt-4 flex flex-row justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 duration-300"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
export default ModalNoteUpdate;
