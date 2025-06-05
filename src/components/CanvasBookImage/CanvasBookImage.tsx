import { useEffect, useRef, useState } from "react";
import type { CanvasBookProps } from "../models/CanvasBookProps";

export const CanvasBookImage: React.FC<CanvasBookProps> = ({
  title,
  author,
  width = 120,
  height = 180,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string>("");

  // Convert HSL string like 'hsl(210, 60%, 60%)' to RGB object
  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  };

  // Calculate luminance to decide black or white text
  const getTextColor = (hsl: string) => {
    // extract h, s, l from 'hsl(210, 60%, 60%)'
    const result = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/.exec(hsl);
    if (!result) return "black";
    const h = parseInt(result[1]);
    const s = parseInt(result[2]);
    const l = parseInt(result[3]);

    const { r, g, b } = hslToRgb(h, s, l);

    // Relative luminance formula
    const [R, G, B] = [r, g, b].map((c) => {
      const channel = c / 255;
      return channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    });

    const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

    // Return black for bright backgrounds, white for dark
    return luminance > 0.5 ? "black" : "white";
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getRandomColor = () =>
      `hsl(${Math.floor(Math.random() * 360)}, 60%, 60%)`;
    const bgColor = getRandomColor();
    const textColor = getTextColor(bgColor);

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw title (top)
    ctx.fillStyle = textColor;
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(title, width / 2, 10, width - 10);

    // Draw author (bottom)
    ctx.font = "italic 11px sans-serif";
    ctx.textBaseline = "bottom";
    ctx.fillText(`by ${author}`, width / 2, height - 10, width - 10);

    // Export canvas as image
    setImageDataUrl(canvas.toDataURL("image/png"));
  }, [title, author, width, height]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ display: "none" }}
      />
      {imageDataUrl && (
        <img
          src={imageDataUrl}
          alt={`Book cover of ${title}`}
          width={width}
          height={height}
          className="rounded shadow border"
        />
      )}
    </>
  );
};
