import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { CommandInfo } from "./REPL.types";

interface REPLInputProps {
  history: CommandInfo[];
  setHistory: Dispatch<SetStateAction<CommandInfo[]>>;
  isBrief: boolean;
  setIsBrief: Dispatch<SetStateAction<boolean>>;
}

export function REPLInput({
  history,
  setHistory,
  isBrief,
  setIsBrief,
}: REPLInputProps) {
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");

  function handleSubmit(input: string) {
    const parsedCommand: string[] = commandString.split(" ");
    let output: string;
    let changedMode: boolean = false;
    switch (parsedCommand[0]) {
      case "mode": {
        if (parsedCommand[1] == "brief") {
          setIsBrief(true);
          output = "Successfully changed mode to brief";
          changedMode = true;
        } else if (parsedCommand[1] == "verbose") {
          setIsBrief(false);
          output = "Successfully changed mode to verbose";
          changedMode = true;
        } else {
          output = "Invalid mode command: enter brief or verbose";
        }
        break;
      }

      default: {
        output = "Invalid command: enter mode, load_file, view, or search";
      }
    }

    setHistory(
      history.concat({
        command: parsedCommand[0],
        output: output,
        isBrief: changedMode ? !isBrief : isBrief,
      })
    );
  }
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submitted</button>
    </div>
  );
}
