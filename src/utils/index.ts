import { CANVA_SIZE } from "../types";

export const generateQRCode = () => {
  const canvas: HTMLCanvasElement = document.getElementById(
    "qrcode-canvas"
  ) as HTMLCanvasElement;
  const text = (document.getElementById("text-input") as HTMLInputElement)
    ?.value;

  const ctx = canvas.getContext("2d");
  const size = CANVA_SIZE;
  const scale = 15;

  canvas.width = size;
  canvas.height = size;
  ctx?.clearRect(0, 0, size, size);

  const binaryText = convertTextToBinary(text);
  const binaryLength = binaryText.length;
  const purpleShades = generatePurpleShades();

  for (let i = 0; i < binaryLength; i++) {
    const x = (i % (size / scale)) * scale;
    const y = Math.floor(i / (size / scale)) * scale;
    if (binaryText[i] === "1") {
      if (ctx) {
        ctx.fillStyle = purpleShades[i % purpleShades.length];
      }

      ctx?.fillRect(x, y, scale, scale);
    }
  }
};

const convertTextToBinary = (text: string) => {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
};

const generatePurpleShades = () => {
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const purpleShades = [];

  // Gerar array de tons de roxo
  for (let i = 270; i <= 330; i += 5) {
    purpleShades.push(hslToHex(i, 100, 50)); // Saturação 100% e luminosidade 50%
  }

  return purpleShades;
};
