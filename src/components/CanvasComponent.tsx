// CanvasComponent.js or CanvasComponent.tsx
import { useRef, useEffect } from 'react';

const CanvasComponent = ({ tasks, durations, dependencies }) => {
 const canvasRef = useRef(null);

 useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      // Example drawing logic based on your table data
      // This is where you would implement the logic to draw the CPM graph
      // For demonstration, let's just draw a simple line
      ctx.beginPath();
      ctx.moveTo(10, 10);
      ctx.lineTo(100, 100);
      ctx.stroke();

      // You can add more complex drawing logic here based on tasks, durations, and dependencies
    }
 }, [tasks, durations, dependencies]); // Depend on tasks, durations, and dependencies to re-draw when they change

 return <canvas ref={canvasRef} />;
};

export default CanvasComponent;
