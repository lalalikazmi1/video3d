# video3d

Two video toolchains live here:
- **Remotion + Three.js** (repo root, `src/`): custom 3D videos with captions/audio. Render: `npx remotion render <Composition> out/x.mp4`.
- **GrowKaz Stickman Studio** (`growkaz-stickman-studio/`): narrated stick-figure videos. Driven by the `make-2d-video`, `new-video`, `video-styles`, `render-video`, `video-sound` skills in `.claude/skills/`. Scripts come from the `script-forge` skill (narration saved to `scripts/<slug>.txt`).

Default for "make the next video": script-forge -> make-2d-video.

## Cloud-session setup (fresh container)
Run once per new session; large files are git-ignored.
```bash
npm install
(cd growkaz-stickman-studio && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install)
pip install numpy scipy faster-whisper "av<16"
```
- Always `export HF_HUB_DISABLE_XET=1` before transcription (the xethub host is not allowed; the standard HF CDN is).
- PyAV must be `<16` (newer breaks faster-whisper's `av.open`).
- Studio `render.mjs` auto-uses `/opt/pw-browsers/.../chrome`; never run `playwright install`.
- Remotion's browser: download with curl (its downloader ignores the proxy):
  `mkdir -p .remotion-browser && curl -sSL -o /tmp/s.zip "https://remotion.media/chromium-headless-shell-linux-x64-158.0.8127.2.zip?clear" && unzip -qo /tmp/s.zip -d .remotion-browser`
- whisper.cpp (Remotion captions only): `@remotion/install-whisper-cpp` into `whisper.cpp/`, model via curl from huggingface.co.
- No GPU: rendering is CPU/software and slow. Preview at `--scale 0.5` before final renders.

## Video preferences
- Make videos fast-paced so viewers keep paying attention: quicker cuts (aim for a new shot every 2-4 s), more motion and pops. Apply this at the animation stage, without changing the art style or the animation quality.
- Shorts: standalone 9:16 1080x1920 scripts (~30-45 s), not clips cut from long videos. User's queue: 1 (shocks vs boredom), 4 (nobody noticed), 9 (47 seconds), 10 (clean your room). Finish one fully, then wait for the user to type the next number.
- Next batch (all as Shorts, in order): 1 overthinking (done), 2 comparing yourself, 3 tired after doing nothing, 4 people pleasers, 5 attached fast, 6 angry at loved ones, 7 time flies, 8 more time (planning fallacy), 9 never admit wrong, 10 behind in life.
