import { Platform, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import WebView from "react-native-webview";
import ConfigFiles from "@/constants/BlocklyContent";
import { useBlocklyNativeEditor } from "@react-blockly/core";

export default function ComponentWithHook(props: any) {
  const { workspaceConfiguration } = props;
  const { editorRef, init, dispose, onMessage } = useBlocklyNativeEditor({
    workspaceConfiguration,
    initial: ConfigFiles.INITIAL_XML,
    onError: (error) => console.error("Blockly error:", error),
    platform: Platform.OS,
  });

  useEffect(() => {
    return () => {
      dispose();
    };
  }, []);

  const onLoadEnd = () => {
    console.log("WebView loaded");
    init({
      workspaceConfiguration,
      initial: ConfigFiles.INITIAL_XML,
    });
  };

  const handleWebViewError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn("WebView error: ", nativeEvent);
  };

  // Add toolbox dimensions to the configuration
  const configWithToolbox = {
    ...workspaceConfiguration,
    horizontalLayout: true,
    toolboxPosition: "top",
    trashcan: true,
    move: {
      scrollbars: true,
      drag: true,
      wheel: true,
    },
    grid: {
      spacing: 20,
      length: 3,
      colour: "#ccc",
      snap: true,
    },
    zoom: {
      pinch: true,
    },
  };

  const serializedConfig = JSON.stringify(configWithToolbox);

  const blocklyHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <script src="https://unpkg.com/blockly/blockly.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      #blocklyDiv { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
      
      /* Toolbar styling */
      .blocklyToolboxDiv {
        background-color: #f0f0f0;
        border-right: 1px solid #ddd;
        width: 100% !important;
      }
      
      /* For horizontal toolbar */
      .blocklyToolboxHorizontal {
        height: 100px !important;
        width: 100% !important;
      }

      /* Flyout styling */
      .blocklyFlyout {
        background-color: #fff;
        max-height: 100px !important;
      }
      
      .blocklyFlyoutButton {
        fill: #fff;
      }

      /* Fixed block sizes */
      .blocklyText {
        font-size: 12px !important;
      }
      
      .blocklyBlockCanvas {
        min-width: 0 !important;
      }

      .blocklyMainBackground {
        stroke-width: 0;
      }

      /* Make blocks a fixed size */
      .blocklyBlock {
        min-width: 40px !important;
        min-height: 24px !important;
      }

      /* Adjust input fields to fixed size */
      .blocklyEditableText rect {
        min-width: 60px !important;
        height: 24px !important;
      }
      
      /* Optional: Style the scrollbar */
      .blocklyToolboxDiv::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      .blocklyToolboxDiv::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      
      .blocklyToolboxDiv::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div id="blocklyDiv"></div>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const workspace = Blockly.inject('blocklyDiv', ${serializedConfig});
        
        // Disable workspace scaling
        workspace.setScale(1.0);
        workspace.zoomToFit = function() { return; }; // Disable zoom to fit
        
        workspace.addChangeListener(function(event) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'workspaceChange',
            xml: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace))
          }));
        });

        if ('${ConfigFiles.INITIAL_XML}') {
          const xml = Blockly.Xml.textToDom('${ConfigFiles.INITIAL_XML}');
          Blockly.Xml.domToWorkspace(xml, workspace);
        }
      });
    </script>
  </body>
</html>`;

  return (
    <WebView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      ref={editorRef}
      originWhitelist={["*"]}
      source={{
        html: blocklyHTML,
        baseUrl: Platform.OS === "android" ? "" : undefined,
      }}
      onMessage={onMessage}
      onLoadEnd={onLoadEnd}
      onError={handleWebViewError}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      scalesPageToFit={true}
      mixedContentMode="compatibility"
      allowUniversalAccessFromFileURLs={true}
    />
  );
}

const styles = StyleSheet.create({});
