// src/App.tsx
import React, { useState, useRef } from 'react';
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

const App: React.FC = () => {
  // const data: TaskData[] = [
  //   { task: 'A', duration: 2, anteriorTask: '-' },
  //   { task: 'B', duration: 5, anteriorTask: 'A' },
  //   { task: 'C', duration: 6, anteriorTask: 'B' },
  //   { task: 'D', duration: 9, anteriorTask: 'C' },
  //   { task: 'E', duration: 5, anteriorTask: 'D' },
  //   { task: 'F', duration: 8, anteriorTask: 'G' },
  //   { task: 'G', duration: 4, anteriorTask: 'E' },
  //   { task: 'H', duration: 1, anteriorTask: 'G' },
  //   { task: 'I', duration: 1, anteriorTask: 'H' },
  //   { task: 'J', duration: 1, anteriorTask: 'K' },
  //   { task: 'K', duration: 1, anteriorTask: 'H' },
  //   { task: 'L', duration: 1, anteriorTask: 'K' },
  // ];

  // // Transform data into nodes and edges
  // const nodes = data.map((task) => ({
  //   id: task.task,
  //   type: 'default',
  //   data: { label: task.task },
  //   position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
  // }));

  // const edges = data.map((task) => {
  //   if (task.anteriorTask === '-') return null; // Skip the first task
  //   return {
  //     id: `${task.anteriorTask}-${task.task}`,
  //     source: task.anteriorTask,
  //     target: task.task,
  //     type: 'default',
  //     style: {
  //       stroke: '#ffff',
  //       strokeWidth: 2,
  //       markerEnd: 'url(#arrowhead)' // Use the markerEnd property with a URL referencing an SVG marker
  //     },
  //   };
  // }).filter(edge => edge !== null); // Remove null values
  // State for tasks, durations, and dependencies
  const [tasks, setTasks] = useState(['a', 'b', 'c', 'd', 'e']);
  const [durations, setDurations] = useState([1, 2, 3, 4, 5]);
  const [dependencies, setDependencies] = useState(['-', 'a', 'b', 'b', 'c']);
  const canvasRef = useRef(null);

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
    console.log('Starting CPM process...');
    // Example logic to draw the CPM graph based on your table data
    // This is a placeholder for your actual drawing logic
    // if (canvasRef.current) {
    //   const canvas = canvasRef.current;
    //   const ctx = canvas.getContext('2d');
    //   ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    //   // Example drawing logic
    //   ctx.beginPath();
    //   ctx.moveTo(10, 10);
    //   ctx.lineTo(100, 100);
    //   ctx.stroke();

    //   // Add more drawing logic based on your table data
    // }
 };
  const onReplay = () => {
    console.log('Replaying CPM process...');
  };


  return (
    <>
    <div className='row'>
    <ActionButtons onAddColumn={onAddColumn} onRemoveColumn={onRemoveColumn} onStart={onStart} onReplay={onReplay} />
      <TaskTable
        tasks={tasks}
        durations={durations}
        dependencies={dependencies}
        setTasks={setTasks}
        setDurations={setDurations}
        setDependencies={setDependencies}
      />
      {/* <CanvasComponent tasks={tasks} durations={durations} dependencies={dependencies} /> */}
      {/* <TransposedTable data={data} />
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow nodes={nodes} edges={edges}>
        <MiniMap />
        <Controls />
        </ReactFlow>
      </div> */}
      </div>
      <div style={{ width: '90vw', height: '100vh' }}>
      <HorizontalArrow xStart={70} xEnd={200} y={100} arrowHeadSize={20} tacheText="A" dureeText="5" />
      <div className='row'>
      <CercleD />
      <CercleF />
      <CercleObject taskNumber={1} taskName="A" />
      <CercleObject taskNumber={2} taskName="B" />
      <CercleObject taskNumber={3} taskName="C" /></div>
      </div>
    </>
  );
};

export default App;
