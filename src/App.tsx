import "./App.css";
import { CANVA_SIZE } from "./types";
import { generateQRCode } from "./utils";

function App() {
  return (
    <main className="main">
      <h1>Insira seu identificador</h1>
      <input type="text" id="text-input" placeholder="Digite o texto aqui" />
      <button className="button" onClick={generateQRCode}>Gerar</button>
      <canvas id="qrcode-canvas" width={CANVA_SIZE} height={CANVA_SIZE}></canvas>
    </main>
  );
}

export default App;
