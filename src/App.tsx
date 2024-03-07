// src/App.tsx
import React, { useState, useRef, useEffect } from 'react';
// import TransposedTable from './components/TransportedTable';
// import { TaskData } from './types/TaskData';
// import ReactFlow, { Controls, MiniMap } from 'react-flow-renderer';
import './tailwind.css';
import TaskTable from './components/TaskTable';
import ActionButtons from './components/ActionButtons';
import CanvasComponent from './components/CanvasComponent';
import CercleD from './components/CanvasComponents/CercleD';
import HorizontalArrow from './components/CanvasComponents/HorizontalArrow';
import CercleF from './components/CanvasComponents/CercleF';
import CercleObject from './components/CanvasComponents/CercleObject';
import { Grid } from '@mui/material';

interface AppProps {
  successors: string[];
}

const App: React.FC<AppProps> = () => {
  const [tasks, setTasks] = useState(['a', 'b', 'c', 'd', 'e']);
  const [durations, setDurations] = useState([1, 2, 3, 4, 5]);
  const [dependencies, setDependencies] = useState(['-', 'a', 'b', 'b', 'c']);
  const canvasRef = useRef(null);
  const [successors, setSuccessors] = useState([]);
  const [sortedTasks, setSortedTasks] = useState<string[]>([]);

  useEffect(() => {
    const sorted = sortTasksBasedOnDependencies(tasks, dependencies);
    setSortedTasks(sorted);
  }, [tasks, dependencies]);

  // Function to add a new column
  const onAddColumn = () => {
    setTasks([...tasks, '']);
    setDurations([...durations, '']);
    setDependencies([...dependencies, '']);
  };

  // Function to remove the last column
  const onRemoveColumn = () => {
    if (tasks.length > 1) {
      setTasks(tasks.slice(0, -1));
      setDurations(durations.slice(0, -1));
      setDependencies(dependencies.slice(0, -1));
    }
  };

  const onStart = () => {
    console.log("Start")
    const newSuccessors = getSuccesseure(tasks, dependencies);
    setSuccessors(newSuccessors);
    const sorted = sortTasksBasedOnDependencies(tasks, dependencies);
    console.log(sorted)
  }
  const onReplay = () => {
    console.log('Replaying CPM process...');
  };

  function getSuccesseure(tasks, dependencies) {
    // Initialize successors as an array of arrays, with each inner array representing successors for a task
    let successors = tasks.map(() => []);

    dependencies.forEach((dependency, index) => {
      let predecessors = dependency.split(',');
      predecessors.forEach(predecessor => {
        let predecessorIndex = tasks.indexOf(predecessor);
        if (predecessorIndex !== -1) {
          // If the predecessor is found in the tasks array, add the current task to its successors
          successors[predecessorIndex].push(tasks[index]);
        }
      });
    });

    // Convert each successors array to a string for display
    successors = successors.map(successor => successor.length > 0 ? successor.join(',') : "FIN");

    return successors;
  }

  function sortTasksBasedOnDependencies(tasks: string[], dependencies: string[]): string[] {
    return tasks.sort((a, b) => {
      const indexA = tasks.indexOf(a);
      const indexB = tasks.indexOf(b);
      const dependencyA = dependencies[indexA];
      const dependencyB = dependencies[indexB];
      const successorA = successors[indexA]; // Assuming successors is an array parallel to tasks
      const successorB = successors[indexB];

      // Prioritize tasks with '-' as t.ant
      if (dependencyA === '-' && dependencyB !== '-') {
        return -1;
      } else if (dependencyB === '-' && dependencyA !== '-') {
        return 1;
      }

      // Prioritize tasks with 'FIN' as t.succ
      if (successorA === 'FIN' && successorB !== 'FIN') {
        return 1;
      } else if (successorB === 'FIN' && successorA !== 'FIN') {
        return -1;
      }

      // If both conditions are met or not applicable, keep original order
      return 0;
    });
  }

  function calculateGridPositions(tasks) {
    const totalGridColumns = 12; // Material-UI Grid default
    const columnsUsedByTasks = tasks.length * 2; // Each task occupies 2 columns
    const taskColumnWidth = totalGridColumns / columnsUsedByTasks;

    return tasks.map((task, index) => {
      const xStart = taskColumnWidth * (index + 1);
      const xEnd = xStart + taskColumnWidth;
      return { xStart, xEnd };
    });
  }


  const start = [100, 50]; // Adjust based on CercleD's position
  const end = [300, 50];
  return (
    <>
      <div className='row px-6'>
        <ActionButtons onAddColumn={onAddColumn} onRemoveColumn={onRemoveColumn} onStart={onStart} onReplay={onReplay} />
        <TaskTable
          tasks={tasks}
          durations={durations}
          dependencies={dependencies}
          successors={successors} // Pass the successors state
          setTasks={setTasks}
          setDurations={setDurations}
          setDependencies={setDependencies}
        />
      </div>
      <div className='flex justify-around'>
      <CercleD />
      <CercleObject taskName={"A"} order={1} />
      </div>
      {/* <Grid container>
        <Grid item xs={1}>
          <CercleD />
        </Grid>
        <Grid item xs={10}>
          <Grid container>
            {tasks.map((taskName, index) => (
              <Grid item xs={2} className='flex justify-center'>
                <CercleObject key={index} taskName={taskName} order={index + 1} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={1} className='flex justify-end'>
          <CercleF />
        </Grid>
      </Grid> */}
    </>
  );
};

export default App;
