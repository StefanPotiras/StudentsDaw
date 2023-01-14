import React, { ReactElement } from "react";


const useInput = (validateFunction : Function) => {

  const [state, setState] = React.useState<string>("");
  const [touched, setTouched] = React.useState(false);

  const isValid = validateFunction(state);
  const hasErrors = !isValid && touched;

  

  const handleInputChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  }

  const onTouchedHandler = () => {
    setTouched(true);
  };


  const resetInput = () => {
    setState("");
    setTouched(false);
  }

  return {state, handleInputChange, resetInput, isValid, onTouchedHandler, hasErrors}
};

export default useInput;
