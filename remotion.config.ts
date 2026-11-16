/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setChromiumOpenGlRenderer("angle");
Config.setVideoImageFormat("jpeg");

// This cloud container has no GPU, so use software WebGL here only.
if (require("fs").existsSync("/opt/pw-browsers")) {
  Config.setChromiumOpenGlRenderer("swangle");
  // Remotion's official headless Chrome, downloaded via curl (its downloader ignores the proxy).
  Config.setBrowserExecutable(
    process.cwd() + "/.remotion-browser/chrome-headless-shell-linux64/chrome-headless-shell",
  );
}
