import { useState, useRef } from 'react';
import './Assignment_21.css';
function ColorPicker() {
  const fileInput = useRef(null);
  const canvasRef = useRef(null);
  const [file, setFile] = useState(null);
  const [rgb, setRGB] = useState();
  const [hex, setHex] = useState();

  function handleInput(event) {
    const file = event.target.files[0];
    setFile(file);
    if (!file) return;
    setRGB(null);
    setHex(null);
    const objectURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = objectURL;

    img.onload = () => {
      let drawWidth = img.naturalWidth;
      let drawHeight = img.naturalHeight;
      if (drawWidth > 400 || drawHeight > 400) {
        const scale = Math.min(400 / drawWidth, 400 / drawHeight)
        drawWidth = drawWidth * scale;
        drawHeight = drawHeight * scale;
      }
      canvasRef.current.width = drawWidth;
      canvasRef.current.height = drawHeight;
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);
      URL.revokeObjectURL(objectURL);
    }
  }
  function getPixelColor(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ctx = canvasRef.current.getContext('2d');
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    setRGB(`${pixelData[0]},${pixelData[1]},${pixelData[2]}`);
    const toHex = (color) => color.toString(16).padStart(2, '0');
    setHex(`#${toHex(pixelData[0])}${toHex(pixelData[1])}${toHex(pixelData[2])}`);

  }
  return (
    <div id="ass21">
      <h2>Upload the image and select a place to view the color codes</h2>
      <input type="file" accept="image/*" onChange={handleInput} style={{ display: 'none' }} ref={fileInput}></input>
      <button onClick={() => fileInput.current && fileInput.current.click()} className="uploadBtn">Upload</button><br />
      <canvas ref={canvasRef} onClick={getPixelColor}></canvas>
      {rgb && file &&
        <div><p>RGB:{rgb}</p>
          <p>Hex value: {hex}</p>
          <div className="output" style={{ backgroundColor: hex }}></div></div>}
    </div>
  )

}
export default ColorPicker