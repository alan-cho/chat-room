import React, { useRef, useEffect, useState } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!context) return;

    const startDrawing = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    };

    const stopDrawing = () => {
      if (isDrawing) {
        context.closePath();
        setIsDrawing(false);
      }
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;

      const { offsetX, offsetY } = event;
      context.lineTo(offsetX, offsetY);
      context.stroke();
    };

    canvas?.addEventListener("mousedown", startDrawing);
    canvas?.addEventListener("mousemove", draw);
    canvas?.addEventListener("mouseup", stopDrawing);
    canvas?.addEventListener("mouseleave", stopDrawing);

    return () => {
      canvas?.removeEventListener("mousedown", startDrawing);
      canvas?.removeEventListener("mousemove", draw);
      canvas?.removeEventListener("mouseup", stopDrawing);
      canvas?.removeEventListener("mouseleave", stopDrawing);
    };
  }, [isDrawing]);

  function draw(context: CanvasRenderingContext2D, frameCount: number) {}

  return (
    <canvas
      ref={canvasRef}
      width="400"
      height="400"
      style={{ border: "1px solid black", cursor: "crosshair" }}
    ></canvas>
  );
}
