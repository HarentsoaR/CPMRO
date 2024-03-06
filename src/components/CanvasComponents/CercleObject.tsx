// CercleObject.js or CercleObject.tsx
import  { useRef, useEffect } from 'react';

const CercleObject = ({ taskNumber, taskName }) => {
 const canvasRef = useRef(null);

 useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      // Draw a circle with task number inside
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 30;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'grey';
      ctx.fill();
      ctx.closePath();

      // Draw task number inside the circle
      ctx.font = '15px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(taskNumber, centerX, centerY);
    }
 }, [taskNumber, taskName]); // Depend on taskNumber and taskName to re-draw when they change

 return <canvas ref={canvasRef} width={200} height={200} />;
};

export default CercleObject;
