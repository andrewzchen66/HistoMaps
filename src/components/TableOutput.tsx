import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface TableOutputProps {
    data : string[][],
    hasHeader: boolean,
}

export default function TableOutput({ data, hasHeader } : TableOutputProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {data[0].map((header, idx) =>
              idx === 0 ? <TableCell>{header}</TableCell> : <TableCell align="right">{header}</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => {
            if (idx === 0) {
              return null;
            } else {
              return (
                <TableRow key={row[0]} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  {row.map((val, idx) =>
                    idx === 0 ? (
                      <TableCell component="th" scope="row">
                        {val}
                      </TableCell>
                    ) : (
                      <TableCell align="right">{val}</TableCell>
                    )
                  )}
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
