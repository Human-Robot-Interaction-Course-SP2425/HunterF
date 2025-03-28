import { View, StyleSheet } from "react-native";
import ComponentWithHook from "@/components/blockly/ComponentWithHook";
import * as BlocklyJS from "blockly";
import ConfigFiles from "@/constants/BlocklyContent";

export default function Index() {
  const workspaceConfiguration: BlocklyJS.BlocklyOptions = {
    grid: {
      spacing: 20,
      length: 3,
      colour: "#ccc",
      snap: true,
    },
    toolbox: ConfigFiles.TOOLBOX,
    collapse: false,
    comments: true,
    css: true,
    disable: true,
    horizontalLayout: true,
    maxBlocks: Infinity,
    maxInstances: { "*": Infinity },
    modalInputs: true,
    move: {
      scrollbars: true,
      drag: true,
    },
    oneBasedIndex: true,
    readOnly: false,
    renderer: "geras",
    rendererOverrides: {},
    rtl: false,
    scrollbars: true,
    sounds: true,
    theme: "default",
    toolboxPosition: "top",
    trashcan: true,
    maxTrashcanContents: 32,
    plugins: {},
  };

  return (
    <View style={styles.container}>
      <ComponentWithHook workspaceConfiguration={workspaceConfiguration} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
