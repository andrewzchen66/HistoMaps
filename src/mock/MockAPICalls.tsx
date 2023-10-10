import { csvData, searchAllData, searchColumnData } from "./MockedData";
import { FetchedAPIData } from "../components/REPL.types";
import { Dispatch, SetStateAction, useState } from "react";

// mocks loadCSV backend call
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

// mocks viewCSV backend call
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

// mocks searchCSV backend call
export const mockSearchCSV = (
  filePath: string,
  value: string,
  containsHeader: boolean,
  column?: string | number
) => {
  let success: boolean;
  let message: string | string[][];
  if (filePath == "") {
    success = false;
    message = "No file path loaded";
  } else if (column) {
    if (searchColumnData[filePath][column]) {
      success = true;
      if (containsHeader) {
        message = searchColumnData[filePath][column][value]
          ? searchColumnData[filePath][column][value]
          : [csvData[filePath][0]];
      } else {
        message = searchColumnData[filePath][column][value]
          ? searchColumnData[filePath][column][value]
          : [[]];
      }
    } else {
      success = false;
      message = "Invalid search command: column not found in " + filePath;
    }
  } else {
    success = true;
    if (containsHeader) {
      message = searchAllData[filePath][value]
        ? searchAllData[filePath][value]
        : [csvData[filePath][0]];
    } else {
      message = searchAllData[filePath][value]
        ? searchAllData[filePath][value]
        : [[]];
    }
  }
  return {
    success: success,
    message: message,
  };
};
