import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { ThreeCanvas } from "@remotion/three";
import { Caption, createTikTokStyleCaptions } from "@remotion/captions";

// Demo: a spinning 3D cube (Three.js) + audio + word-timed captions (Remotion).
export const CaptionsDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const [handle] = useState(() => delayRender("Loading captions"));

  useEffect(() => {
    fetch(staticFile("demo-captions.json"))
      .then((r) => r.json())
      .then((c) => {
        setCaptions(c);
        continueRender(handle);
      });
  }, [handle]);

  const nowMs = (frame / fps) * 1000;
  const page = captions
    ? createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: 1200,
      }).pages.find(
        (p) => nowMs >= p.startMs && nowMs < p.startMs + p.durationMs,
      )
    : undefined;

  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <ThreeCanvas width={width} height={height}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 5]} intensity={1.5} />
        <mesh rotation={[frame * 0.02, frame * 0.03, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#4f8ef7" />
        </mesh>
      </ThreeCanvas>
      <Audio src={staticFile("demo.wav")} />
      <AbsoluteFill
        style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 60 }}
      >
        <div style={{ fontSize: 56, fontWeight: 800, color: "white", fontFamily: "sans-serif" }}>
          {page?.tokens.map((t) => {
            const active = nowMs >= t.fromMs && nowMs < t.toMs;
            return (
              <span key={t.fromMs} style={{ color: active ? "#ffd400" : "white" }}>
                {t.text}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
