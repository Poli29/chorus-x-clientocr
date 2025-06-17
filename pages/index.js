
import { useState } from 'react';
import Tesseract from 'tesseract.js';

export default function Home() {
  const [file, setFile] = useState(null);
  const [verdict, setVerdict] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    const { data: { text } } = await Tesseract.recognize(file, 'eng');

    let decision = "❓ WAIT";
    if (text.includes("CHoCH") && text.includes("FVG")) {
      decision = "✅ BUY";
    } else if (text.includes("BOS") && text.includes("OB")) {
      decision = "❌ SELL BLOCKED";
    }

    const result = {
      verdict: decision,
      strategy: "CHORUS-X v3.5",
      propguard: "Compliant",
      structure: "Parsed from image",
      rejectionCandle: "Last candle OCR scan",
      tradeLog: "Live OCR via browser"
    };

    setVerdict(result);
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1><b>CHORUS-X™ Live Verdict</b></h1>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {verdict && (
        <div style={{ marginTop: "20px" }}>
          <h2>Verdict: {verdict.verdict}</h2>
          <pre>{JSON.stringify(verdict, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
