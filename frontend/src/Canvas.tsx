import React, { useRef, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface CanvasProps {
  socket: typeof Socket;
}

interface CanvasEvent {
  type: string;
  x: number;
  y: number;
}

export default function Canvas({ socket }: CanvasProps) {
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
      socket.emit("draw", { type: "start", x: offsetX, y: offsetY });
    };

    const stopDrawing = () => {
      if (isDrawing) {
        context.closePath();
        setIsDrawing(false);
      }
      socket.emit("draw", { type: "stop" });
    };

    const draw = (event: MouseEvent) => {
      if (!isDrawing) return;

      const { offsetX, offsetY } = event;
      context.lineTo(offsetX, offsetY);
      context.stroke();
      socket.emit("draw", { type: "draw", x: offsetX, y: offsetY });
    };

    socket.on("draw", (data: CanvasEvent) => {
      if (data.type === "start") {
        context.beginPath();
        context.moveTo(data.x, data.y);
      } else if (data.type === "draw") {
        context.lineTo(data.x, data.y);
        context.stroke();
      } else if (data.type === "stop") {
        context.closePath();
      }
    });

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

  return (
    <canvas
      ref={canvasRef}
      className=""
      width="500"
      height="500"
      style={{ border: "1px solid black", cursor: "crosshair" }}
    ></canvas>
  );
}
