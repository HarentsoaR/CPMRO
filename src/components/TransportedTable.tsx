// src/components/Table/TransposedTable.tsx
import React, { useState } from 'react';
import { TaskData } from '../types/TaskData';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box } from '@mui/material';
import './tailwind.css'

interface TransposedTableProps {
  data: TaskData[];
}

const TransposedTable: React.FC<TransposedTableProps> = ({ data }) => {
  const [tableData, setTableData] = useState<TaskData[]>(data);

  const addSuccessorRow = () => {
    let successorTasks = [];

    data.forEach((item, index) => {
      if (item.anteriorTask === '-') {
        const nextTask = data[index + 1];
        successorTasks.push(nextTask ? nextTask.task : 'FIN');
      } else if (item.anteriorTask) {
        const successors = data.filter(task => task.anteriorTask === item.task);
        if (successors.length > 0) {
          // Accumulate all successors into a single string, separated by spaces
          successorTasks.push(successors.map(succ => succ.task).join(' '));
        } else {
          // If there are no successors, set to '-'
          successorTasks.push('-');
        }
      }
    });

    // Check if successorTasks is not empty before adding a new row
    if (successorTasks.length > 0 && !successorTasks.every(task => task === '-')) {
      // Add the new row to the table data with the collected successor tasks
      setTableData([...tableData, { duration: null, anteriorTask: null, successorTask: successorTasks }]);
    }
  };




  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" minHeight="100vh" className='pb-96'>
      <TableContainer>
        <Table className='t-succ-row'>
          <TableHead className='t-succ-row'>
            <TableRow>
              <TableCell>Task</TableCell>
              {tableData.map((item, index) => (
                <TableCell key={index}>{item.task}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Duration</TableCell>
              {tableData.map((item, index) => (
                <TableCell key={index}>{item.duration}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>T.ant</TableCell>
              {tableData.map((item, index) => (
                <TableCell key={index}>{item.anteriorTask}</TableCell>
              ))}
            </TableRow>
            {tableData.map((item, index) => item.successorTask && (
              <TableRow key={`succ-${index}`}>
                <TableCell>T.succ</TableCell>
                {/* Iterate over the successorTask array and create a TableCell for each letter */}
                {item.successorTask.map((letter, letterIndex) => (
                  <TableCell key={`letter-${letterIndex}`}>{letter}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <span className='py-1'></span>
      <Button variant="contained" color="primary" onClick={addSuccessorRow}>
        Generate
      </Button>
    </Box>
  );
};

export default TransposedTable;
