import csvData from "./MockedData";
import { FetchedAPIData } from "../components/REPL.types";
import { Dispatch, SetStateAction, useState } from "react";

export const mockLoadCSV = (filepath: string): FetchedAPIData => {
  if (csvData[filepath]) {
    return {
      success: true,
      message: "Successfully loaded in csv file",
    };
  } else {
    return {
      success: false,
      message: "Invalid file path",
    };
  }
};

export const mockViewCSV = (filePath: string): FetchedAPIData => {
  if (filePath != "") {
    return {
      success: true,
      message: csvData[filePath],
    };
  } else {
    return {
      success: false,
      message: "No file path loaded",
    };
  }
};

export const mockSearchCSV = (
  filePath: string,
  column: string,
  value: string
) => {};
