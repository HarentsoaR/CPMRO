// CanvasComponent.js or CanvasComponent.tsx
import { useRef, useEffect } from 'react';

const CercleTask = () => {
 const canvasRef = useRef(null);

 useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a circle with "D" inside
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 50;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'blue';
      ctx.fill();
      ctx.closePath();

      // Draw "D" inside the circle
      ctx.font = '30px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('D', centerX, centerY);
    }
 }, []);

 return <canvas ref={canvasRef} width={200} height={200} />;
};

export default CercleTask;
