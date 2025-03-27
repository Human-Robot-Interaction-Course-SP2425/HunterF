import ConfigFiles from "@/constants/BlocklyContent";
import ComponentWithHook from "@/components/blockly/ComponentWithHook";

export default function Blockly() {
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
  };

  return <ComponentWithHook workspaceConfiguration={workspaceConfiguration} />;
}
