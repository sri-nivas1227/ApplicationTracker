import { useEffect } from "react";

type inputType = {
  inputType: string;
  inputKey: string;
  onInputValueChange: (key: string, value: string) => void;
  options: any;
  show: boolean;
  existingValue: string;
};

const InputTypes = ({
  inputType,
  inputKey,
  onInputValueChange,
  options = null,
  show,
  existingValue,
}: inputType) => {
  if (!show) return <></>;
  if (inputType === "text") {
    return (
      <input
        type="text"
        className="text-base px-2 border border-dark-blue p-1 rounded-lg bg-light-mode-bg"
        defaultValue={existingValue}
        onChange={(e) => {
          ("changed");
          onInputValueChange(inputKey, e.target.value);
        }}
      />
    );
  }
  if (inputType === "date") {
    return (
      <input
        type="date"
        className=" text-base px-2 border-dark-blue p-1  rounded-lg bg-light-mode-bg border"
        defaultValue={existingValue}
        onChange={(e) => {
          (e.target.value, onInputValueChange(inputKey, e.target.value));
        }}
      />
    );
  }
  if (inputType === "dropdown") {
    useEffect(() => {
      onInputValueChange(inputKey, options[0].value);
    }, []);
    return (
      <select
        className=" text-base px-2 p-1 border-dark-blue rounded-lg bg-light-mode-bg border"
        onChange={(e) => onInputValueChange(inputKey, e.target.value)}
        value={existingValue ? existingValue : options[0].value}
      >
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  if (inputType === "email") {
    return (
      <input
        type="email"
        className="text-base px-2 p-1 border-dark-blue rounded-lg bg-light-mode-bg border"
        onChange={(e) => onInputValueChange(inputKey, e.target.value)}
        defaultValue={existingValue}
      />
    );
  }
  if (inputType === "phone") {
    return (
      <input
        type="text"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        className="text-base px-2 p-1 border-dark-blue rounded-lg bg-light-mode-bg border"
        defaultValue={existingValue}
        onChange={(e) => onInputValueChange(inputKey, e.target.value)}
      />
    );
  }
  return <p className="">something</p>;
};

export default InputTypes;
