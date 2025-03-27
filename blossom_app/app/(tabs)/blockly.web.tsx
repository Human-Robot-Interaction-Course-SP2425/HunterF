import { StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import ConfigFiles from "@/constants/BlocklyContent";
import * as BlocklyJS from "blockly";
import { CSSProperties } from "react";

export default function BlocklyComponent() {
  const workspaceConfiguration = {
    grid: {
      spacing: 20,
      length: 3,
      colour: "#ccc",
      snap: true,
    },
    toolbox: ConfigFiles.INITIAL_TOOLBOX_JSON,
    collapse: false,
    comments: true,
    css: true,
    disable: true,
    horizontalLayout: false,
    maxBlocks: Infinity,
    maxInstances: { "*": Infinity },
    modalInputs: true,
    move: {
      scrollbars: true,
      drag: true,
      wheel: true,
    },
    oneBasedIndex: true,
    readOnly: false,
    renderer: "geras",
    rendererOverrides: {},
    rtl: false,
    scrollbars: true,
    sounds: true,
    theme: "default",
    toolboxPosition: "start",
    trashcan: true,
    maxTrashcanContents: 32,
    plugins: {},
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true,
    },
    contextMenu: {
      enabled: false,
    },
  };

  const blocklyDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (blocklyDiv.current) {
      const workspace = BlocklyJS.inject(
        blocklyDiv.current,
        workspaceConfiguration
      );

      if (ConfigFiles.INITIAL_XML) {
        BlocklyJS.Xml.domToWorkspace(
          BlocklyJS.utils.xml.textToDom(ConfigFiles.INITIAL_XML),
          workspace
        );
      }

      return () => {
        workspace.dispose();
      };
    }
  }, []);

  const webStyles: Record<string, CSSProperties> = {
    container: {
      display: "flex",
      flexDirection: "row",
      height: "100vh",
      maxWidth: "100vw",
    },
    generatedCode: {
      height: "50%",
      backgroundColor: "rgb(247,240,228)",
      margin: 0,
      padding: 10,
      maxWidth: "400px",
      width: "100vw",
    },
    buttonContainer: {
      height: "50%",
      padding: 10,
      display: "flex",
      flexDirection: "column",
    },
    generatedCodeText: {
      overflow: "scroll",
    },
    blocklyDiv: {
      flexBasis: "100%",
      height: "100%",
      position: "relative",
      minWidth: "600px",
    },
    runButton: {
      backgroundColor: "green",
      color: "white",
      padding: 20,
      borderRadius: 5,
      fontWeight: "bold",
      fontSize: 32,
      border: "none",
      marginBottom: 20,
      cursor: "pointer",
    },
    saveButton: {
      backgroundColor: "blue",
      color: "white",
      padding: 20,
      borderRadius: 5,
      fontWeight: "bold",
      fontSize: 32,
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={webStyles.container}>
      <div>
        <pre style={webStyles.generatedCode}>
          <code style={webStyles.generatedCodeText}></code>
        </pre>
        <div style={webStyles.buttonContainer}>
          <button style={webStyles.runButton}>RUN</button>
          <button style={webStyles.saveButton}>SAVE</button>
        </div>
      </div>
      <div id="blocklyDiv" ref={blocklyDiv} style={webStyles.blocklyDiv} />
    </div>
  );
}
