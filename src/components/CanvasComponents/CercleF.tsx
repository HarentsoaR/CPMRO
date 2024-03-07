// CanvasComponent.js or CanvasComponent.tsx
import { useRef, useEffect } from 'react';

const CercleF = () => {
 const canvasRef = useRef(null);

 useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a circle with "debut" inside
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 30;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();

      // Draw "fin" inside the circle
      ctx.font = '15px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('fin', centerX, centerY);
    }
 }, []);

 return <canvas ref={canvasRef} width={80} height={80} />;
};

export default CercleF;
