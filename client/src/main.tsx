import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import * as amplitude from "@amplitude/unified";

// Initialize Amplitude once at app root (client-side only)
amplitude.initAll("3452ae9f5f17d6b1b2e3f408863b375", {
  analytics: { autocapture: true },
  sessionReplay: { sampleRate: 1 },
});

createRoot(document.getElementById("root")!).render(<App />);
