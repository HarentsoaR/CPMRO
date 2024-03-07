// CercleObject.tsx
import { useRef, useEffect } from 'react';


interface CercleObjectProps {
  taskName: string;
  order: number;
 }

const CercleObject: React.FC<CercleObjectProps> = ({ taskName, order }) => {
 const canvasRef = useRef<HTMLCanvasElement>(null);


 useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      // Adjust position based on orderIndex for a simple example
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 30;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'grey';
      ctx.fill();
      ctx.closePath();

      // Draw task name inside the circle
      ctx.font = '15px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(taskName, centerX, centerY);
    }
 }, [taskName, order]); // Depend on taskName and orderIndex

 return <canvas ref={canvasRef} width={80} height={80} />;
};

export default CercleObject;
