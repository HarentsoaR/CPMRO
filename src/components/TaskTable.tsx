import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface TaskTableProps {
    tasks: string[];
    durations: number[];
    dependencies: string[];
    setTasks: (tasks: string[]) => void;
    setDurations: (durations: number[]) => void;
    setDependencies: (dependencies: string[]) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, durations, dependencies, setTasks, setDurations, setDependencies }) => {
    const [editing, setEditing] = useState({ row: null, col: null });

    const handleEdit = (row: number, col: number) => {
        setEditing({ row, col });
    };

    const handleChange = (row: number, col: number, value: string) => {
        let newArray;
        if (row === 0) {
            newArray = [...tasks.slice(0, col), value, ...tasks.slice(col + 1)];
            setTasks(newArray);
        } else if (row === 1) {
            // Check if the value is a valid number before parsing
            const numericValue = value ? parseInt(value) : 0; // Default to 0 if the value is not valid
            if (!isNaN(numericValue)) {
                newArray = [...durations.slice(0, col), numericValue, ...durations.slice(col + 1)];
                setDurations(newArray);
            } else {
                // Optionally revert to the original value or handle the error
                console.error('Invalid numeric value');
            }
        } else if (row === 2) {
            newArray = [...dependencies.slice(0, col), value, ...dependencies.slice(col + 1)];
            setDependencies(newArray);
        }
        setEditing({ row: null, col: null });
    };


    return (
        <TableContainer component={Paper} className="mb-96">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tâches</TableCell>
                        {tasks.map((task, index) => (
                            <TableCell key={index} onClick={() => handleEdit(0, index)}>
                                {editing.row === 0 && editing.col === index ? (
                                    <input
                                        type="text"
                                        value={task}
                                        onChange={(e) => handleChange(0, index, e.target.value)}
                                        onBlur={() => setEditing({ row: null, col: null })}
                                    />
                                ) : (
                                    task
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Durée</TableCell>
                        {durations.map((duration, index) => (
                            <TableCell key={index} onClick={() => handleEdit(1, index)}>
                                {editing.row === 1 && editing.col === index ? (
                                    <input
                                        type="text"
                                        value={duration}
                                        onChange={(e) => handleChange(1, index, e.target.value)}
                                        onBlur={() => setEditing({ row: null, col: null })}
                                    />
                                ) : (
                                    duration
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell>Tâches antérieures</TableCell>
                        {dependencies.map((dependency, index) => (
                            <TableCell key={index} onClick={() => handleEdit(2, index)}>
                                {editing.row === 2 && editing.col === index ? (
                                    <input
                                        type="text"
                                        value={dependency}
                                        onChange={(e) => handleChange(2, index, e.target.value)}
                                        onBlur={() => setEditing({ row: null, col: null })}
                                    />
                                ) : (
                                    dependency
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskTable;
