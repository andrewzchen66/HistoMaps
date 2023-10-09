import "../styles/main.css"
import { Dispatch, SetStateAction, useState } from "react"
import { ControlledInput } from "./ControlledInput"
import { CommandInfo } from "./REPL.types"
import csvData from "./MockedData" 
import Table from "@mui/material/Table"

interface REPLInputProps {
  history: CommandInfo[]
  setHistory: Dispatch<SetStateAction<CommandInfo[]>>
  isBrief: boolean
  setIsBrief: Dispatch<SetStateAction<boolean>>
}

export function REPLInput({
  history,
  setHistory,
  isBrief,
  setIsBrief,
}: REPLInputProps) {
  
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("")
  const [filePath, setFilePath] = useState<string>("")

  function handleSubmit(input: string) {
    const parsedCommand: string[] = commandString.split(" ")
    let output: string | string[][]
    let changedMode: boolean = false
    switch (parsedCommand[0]) {
      case "mode": {
        if (parsedCommand.length != 2) {
          output = "Invalid mode command: only 1 argument"
        } else if (parsedCommand[1] == "brief") {
          setIsBrief(true)
          output = "Successfully changed mode to brief"
          changedMode = true
        } else if (parsedCommand[1] == "verbose") {
          setIsBrief(false)
          output = "Successfully changed mode to verbose"
          changedMode = true
        } else {
          output = "Invalid mode command: enter brief or verbose"
        }
        break
      }

      case "load_file": {
        if (parsedCommand.length != 2) {
          output = "Invalid load_file command: only file path should be given as argument"
        } else {
          if (csvData[parsedCommand[1]]) {
            setFilePath(parsedCommand[1])
            output = "Succesfully loaded in csv file"
          } else {
            output = "Invalid file path"
          }
        }
        break
      }

      case "view": {
        if (parsedCommand.length != 1) {
          output = "Invalid load_file command: no arguments should be given"
        } else {
          if (filePath != "") {
            output = csvData[filePath]
          } else {
            output = "No file path loaded"
          }
        }
        break
      }

      default: {
        output = "Invalid command: enter mode, load_file, view, or search"
      }
    }

    setCommandString("")

    setHistory(
      history.concat({
        command: commandString,
        output: output,
        isBrief: changedMode ? !isBrief : isBrief,
      })
    )
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
          onSubmit={() => handleSubmit(commandString)}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submitted</button>
    </div>
  )
}
