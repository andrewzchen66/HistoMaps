import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import {
  CommandInfo,
  FetchedAPIData,
  TableOutput,
} from "../interfaces/REPL.types";
// import csvData from "../mock/MockedData";
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
  const [containsHeader, setContainsHeader] = useState<boolean>(true);

  function handleSubmit(input: string) {
    const parsedCommand: string[] = commandString.trim().split(" ");
    let output: string | TableOutput;
    let changedMode: boolean = false;
    switch (parsedCommand[0]) {
      case "mode": {
        if (parsedCommand.length < 2) {
          output =
            "Invalid mode command: must provide brief or verbose argument";
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
        if (parsedCommand.length < 2) {
          output =
            "Invalid load_file command: file path should be given as argument";
        } else if (parsedCommand.length > 3) {
          output =
            "Invalid load_file command: only accepted arguments are filepath and containsHeader";
        } else if (parsedCommand.length === 2) {
          const { success, message }: FetchedAPIData = mockLoadCSV(
            parsedCommand[1]
          );
          if (success) {
            setFilePath(parsedCommand[1]);
            setContainsHeader(true);
          }
          output = message + ". Default true for containsHeader";
        } else if (
          parsedCommand[2] !== "true" &&
          parsedCommand[2] !== "false"
        ) {
          output =
            "Invalid load_file command: containsHeader can only be true or false";
        } else {
          const { success, message }: FetchedAPIData = mockLoadCSV(
            parsedCommand[1]
          );
          if (success) {
            setFilePath(parsedCommand[1]);
            parsedCommand[2] === "true"
              ? setContainsHeader(true)
              : setContainsHeader(false);
          }

          if (typeof message == "string") {
            output = message;
          } else {
            output = "Error";
          }
        }
        break;
      }

      case "view": {
        if (parsedCommand.length != 1) {
          output = "Invalid view command: no arguments should be given";
        } else {
          const { success, message }: FetchedAPIData = mockViewCSV(filePath);
          if (typeof message !== "string") {
            output = {
              data: message,
              hasHeader: containsHeader,
            };
          } else {
            output = message;
          }
        }
        break;
      }

      case "search": {
        if (parsedCommand.length < 2) {
          output = "Invalid search command: must provide a value to search";
        } else if (parsedCommand.length > 3) {
          output =
            "Invalid search command: only accepts 2 arguments, value to search and column";
        } else if (parsedCommand.length === 3) {
          if (containsHeader) {
            const column: string | number = containsHeader
              ? parsedCommand[1]
              : parseInt(parsedCommand[1]);
            const { success, message }: FetchedAPIData = mockSearchCSV(
              filePath,
              parsedCommand[2],
              containsHeader,
              column
            );
            if (typeof message !== "string") {
              output = {
                data: message,
                hasHeader: containsHeader,
              };
            } else {
              output = message;
            }
          } else {
            output = "Invalid search command: " + filePath + " has no headers";
          }
        } else {
          const { success, message }: FetchedAPIData = mockSearchCSV(
            filePath,
            parsedCommand[1],
            containsHeader
          );
          if (typeof message !== "string") {
            output = {
              data: message,
              hasHeader: containsHeader,
            };
          } else {
            output = message;
          }
        }
        break;
      }

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
