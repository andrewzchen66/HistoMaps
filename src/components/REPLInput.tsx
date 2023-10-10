import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { CommandInfo, FetchedAPIData } from "./REPL.types";
import csvData from "../mock/MockedData";
import Table from "@mui/material/Table";
import { mockLoadCSV, mockViewCSV, mockSearchCSV } from "../mock/MockAPICalls";

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
  const [filePath, setFilePath] = useState<string>("");

  function handleSubmit(input: string) {
    const parsedCommand: string[] = commandString.split(" ");
    let output: string | string[][];
    let changedMode: boolean = false;
    switch (parsedCommand[0]) {
      case "mode": {
        if (parsedCommand.length == 1) {
          output = "Invalid mode command: only 1 argument allowed";
        } else if (parsedCommand.length > 2) {
          output = "Invalid mode command: too many arguments provided";
        } else if (parsedCommand[1] == "brief") {
          if (!isBrief) {
            setIsBrief(true);
            changedMode = true;
          }
          output = "Successfully changed mode to brief";
        } else if (parsedCommand[1] == "verbose") {
          if (isBrief) {
            setIsBrief(false);
            changedMode = true;
          }
          output = "Successfully changed mode to verbose";
        } else {
          output = "Invalid mode command: enter brief or verbose";
        }
        break;
      }

      case "load_file": {
        if (parsedCommand.length != 2) {
          output =
            "Invalid load_file command: only file path should be given as argument";
        } else {
          const { success, message }: FetchedAPIData = mockLoadCSV(
            parsedCommand[1]
          );
          if (success) {
            setFilePath(parsedCommand[1]);
          }
          output = message;
        }
        break;
      }

      case "view": {
        if (parsedCommand.length != 1) {
          output = "Invalid view command: no arguments should be given";
        } else {
          const { success, message }: FetchedAPIData = mockViewCSV(filePath);
          output = message;
        }
        break;
      }

      // case "search": {
      //   if (parsedCommand.length != 3) {
      //     output =
      //       "Invalid search command: must provide 2 arguments, column and value to search";
      //   } else {
      //     if (filePath != "") {
      //       output = csvData[filePath];
      //     } else {
      //       output = "No file path loaded";
      //     }
      //   }
      //   break;
      // }

      default: {
        output = "Invalid command: enter mode, load_file, view, or search";
      }
    }

    setCommandString("");

    setHistory(
      history.concat({
        command: commandString,
        output: output,
        isBrief: changedMode ? !isBrief : isBrief,
      })
    );
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
          onSubmit={() => handleSubmit(commandString)}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
