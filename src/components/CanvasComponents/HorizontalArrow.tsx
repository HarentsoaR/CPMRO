// HorizontalArrow.js or HorizontalArrow.tsx
import { useRef, useEffect } from 'react';

const HorizontalArrow = ({ xStart, xEnd, y, arrowHeadSize, tacheText, dureeText }) => {
 const canvasRef = useRef(null);

 useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      // Draw the horizontal line
      ctx.beginPath();
      ctx.moveTo(xStart, y);
      ctx.lineTo(xEnd, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 1.0)';
      ctx.stroke();

      // Draw the arrowhead
      const arrowHeadSizeHalf = arrowHeadSize / 2;
      ctx.beginPath();
      ctx.moveTo(xEnd, y);
      ctx.lineTo(xEnd - arrowHeadSize, y + arrowHeadSizeHalf);
      ctx.lineTo(xEnd - arrowHeadSize, y - arrowHeadSizeHalf);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
      ctx.fill();

      // Draw the text
      ctx.font = '15px Calibri, Geneva, Arial';
      ctx.fillStyle = 'rgba(1,1,1,1)';
      const textX = xStart + ((xEnd - xStart) / 3);
      ctx.fillText(tacheText, textX, y - 7);
      ctx.fillText(dureeText, textX, y + 17);
    }
 }, [xStart, xEnd, y, arrowHeadSize, tacheText, dureeText]);

 return <canvas ref={canvasRef} width={800} height={150} />;
};

export default HorizontalArrow;
