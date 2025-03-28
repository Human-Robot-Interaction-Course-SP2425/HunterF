import { Platform, StyleSheet, View, Text } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import WebView from "react-native-webview";
import * as BlocklyJS from "blockly";
import { useAtom } from "jotai";
import { blocklyCodeAtom } from "@/atoms/blockly.atom";
import {
  customBlocksDefinitions,
  parseBlocklyCode,
} from "@/constants/BlocklyContent";

type Props = {
  workspaceConfiguration: BlocklyJS.BlocklyOptions;
};

type MessageData = {
  type: "workspaceChange" | "error" | "setup";
  code?: string;
  message?: string;
  status?: "complete";
};

export default function ComponentWithHook({ workspaceConfiguration }: Props) {
  const editorRef = useRef<WebView>(null);
  const [blocklyCode, setBlocklyCode] = useAtom(blocklyCodeAtom);

  const serializedConfig = JSON.stringify(workspaceConfiguration);

  const blocklyHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <script src="https://unpkg.com/blockly/blockly.min.js"></script>
    <script src="https://unpkg.com/blockly/javascript_compressed"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      #blocklyDiv { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
    </style>
  </head>
  <body>
    <div id="blocklyDiv"></div>
    <script>      
      ${customBlocksDefinitions}

      function sendToReactNative(type, data) {
        try {
          const message = JSON.stringify({ type, ...data });
          window.ReactNativeWebView.postMessage(message);
        } catch (e) {
          console.error('Error sending message:', e);
        }
      }

      document.addEventListener('DOMContentLoaded', function() {
        try {
          const workspace = Blockly.inject('blocklyDiv', ${serializedConfig});
          
          sendToReactNative('setup', { status: 'complete' });
          
          workspace.addChangeListener(function(event) {
            if (workspace.isDragging()) return;
            
            try {
              const code = Blockly.JavaScript.workspaceToCode(workspace);
              sendToReactNative('workspaceChange', { code });
            } catch (e) {
              sendToReactNative('error', { message: e.toString() });
            }
          });
        } catch (e) {
          sendToReactNative('error', { message: e.toString() });
        }

        document.addEventListener('contextmenu', function(e) {
          e.preventDefault();
          return false;
        });
      });
    </script>
  </body>
</html>`;

  const handleMessage = (event: any) => {
    try {
      const data: MessageData = JSON.parse(event.nativeEvent.data);
      if (data.type === "workspaceChange" && data.code) {
        setBlocklyCode({ code: parseBlocklyCode(data.code) });
      } else if (data.type === "error") {
        console.error("WebView error:", data.message);
      } else if (data.type === "setup") {
        console.log("Blockly setup complete");
      }
    } catch (e) {
      console.error("Error handling message:", e);
    }
  };

  return (
    <>
      <WebView
        style={{ flex: 1, backgroundColor: "#ffffff" }}
        ref={editorRef}
        originWhitelist={["*"]}
        source={{
          html: blocklyHTML,
          baseUrl: Platform.OS === "android" ? "" : undefined,
        }}
        onMessage={handleMessage}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error: ", nativeEvent);
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
        allowUniversalAccessFromFileURLs={true}
      />
    </>
  );
}

const styles = StyleSheet.create({});
