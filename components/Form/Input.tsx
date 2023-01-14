
import React from "react";

const InputItem: React.FC<{
  inputType: string
  label: string;
  value: string;
  error: boolean,
  requiredType: boolean
  errorText: string,
  functionHandler: (event:  React.ChangeEvent<HTMLInputElement>) => void,
  onBlurHandler: any
  defaultValueInput?: string
}> = (props) => {
  return (
    <div className="flex flex-col item-center justify-end mb-[20px] text-black"  >
      <input
        type={props.inputType}
        placeholder={props.label}
        value={props.value}
        onChange={props.functionHandler}
        className={`input-md w-[60vw] lg:w-[30vw] input-bordered  border-[2px] rounded-md ${props.error && "input-error"} `}
        onBlur={props.onBlurHandler}
        defaultValue={props.defaultValueInput}
      />
    {props.error && 
      <p className="text-red-600">{props.errorText}</p>
    }
    </div>

  );
};

export default InputItem;
