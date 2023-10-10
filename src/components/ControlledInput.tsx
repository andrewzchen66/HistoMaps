import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
  onSubmit: () => void;
}

export function ControlledInput({
  value,
  setValue,
  ariaLabel,
  onSubmit,
}: ControlledInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
    ></input>
  );
}
