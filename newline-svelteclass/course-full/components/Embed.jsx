import React from "react";
import "./Embed.css";

export default function Embed({
  title,
  runOnClick = 0,
  editorSize = 35,
  previewOnly = false,
  height = "500px",
  module,
  lesson,
}) {
  if (typeof runOnClick !== "number") {
    runOnClick = runOnClick ? 1 : 0;
  }

  // const RENDER_LEGACY_CSB = false;
  // let srcForSandbox = `https://codesandbox.io/s/${title}?module=%2Fsrc/App.svelte`; // `https://codesandbox.io/p/sandbox/${title}?file=%2Fsrc%2FApp.svelte`;
  // let src = `https://${title}.sse.codesandbox.io/`;

  // if (RENDER_LEGACY_CSB) {
  //   srcForSandbox = `https://codesandbox.io/s/${title}?module=%2Fsrc/App.svelte`;
  //   src = `https://codesandbox.io/embed/${title}?fontsize=14&hidenavigation=true&view=${
  //     previewOnly ? "preview" : "split"
  //   }&editorsize=${editorSize}&runonclick=${runOnClick}&module=%2Fsrc/App.svelte`;
  // }

  let src = `https://connorrothschild.github.io/better-data-visualizations-with-svelte/${module}-${lesson}/`;
  let codeSrc = `https://github.com/connorrothschild/better-data-visualizations-with-svelte/tree/master/${module}/${lesson}`; // CodeSandBox!
  let editSrc = `https://githubbox.com/connorrothschild/better-data-visualizations-with-svelte/tree/master/${module}/${lesson}?file=/src/App.svelte`; // GitHub

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: height,
        border: "0",
        borderRadius: "4px",
        overflow: "hidden",
        marginBottom: "1rem",
      }}
    >
      {/* <div
        className={`loading loading-${title}`}
        style={{ transition: "opacity 300ms ease" }}
      >
        <div className="uil-ring-css" style={{ transform: "scale(0.79);" }}>
          <div />
        </div>
      </div> */}
      <div
        className="loaded"
        style={{
          background: "white",
          zIndex: 2,
          height: "100%",
          width: "100%",
        }}
      >
        {/* <iframe
          src={srcForSandbox}
          style={{
            display: "none",
            width: "100%",
            height: height,
            border: "0",
            borderRadius: "4px",
            overflow: "hidden",
            marginBottom: "1rem",
          }}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        /> */}
        <iframe
          src={src}
          onLoad={() => {
            const el = document.querySelector(`.loading-${title}`);
            if (el) {
              el.style.opacity = "0";
            }
          }}
          style={{ width: "100%", height: "100%", border: "0" }}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />

        <div
          style={{
            position: "absolute",
            bottom: "6px",
            right: "6px",
            display: "flex",
            gap: "6px",
          }}
        >
          <a
            style={{
              padding: ".25rem .5rem",
              fontSize: "0.8rem",
              border: "1px solid rgba(0,0,0,.1)",
              boxShadow: "1px 1px 2px rgba(0,0,0,.05)",
              background: "rgba(255,255,255,.8)",
              backdropFilter: "blur(3px)",
              zIndex: 100,
              borderRadius: "3px",
              zIndex: 1,
              background: "black",
              color: "white",
              textDecoration: "none",
            }}
            href={codeSrc}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            style={{
              padding: ".25rem .5rem",
              fontSize: "0.8rem",
              border: "1px solid rgba(0,0,0,.1)",
              boxShadow: "1px 1px 2px rgba(0,0,0,.05)",
              background: "rgba(255,255,255,.8)",
              backdropFilter: "blur(3px)",
              zIndex: 100,
              borderRadius: "3px",
              zIndex: 1,
              background: "black",
              color: "white",
              textDecoration: "none",
            }}
            href={editSrc}
            target="_blank"
            rel="noopener noreferrer"
          >
            CodeSandbox
          </a>
        </div>
      </div>
    </div>
  );
}
