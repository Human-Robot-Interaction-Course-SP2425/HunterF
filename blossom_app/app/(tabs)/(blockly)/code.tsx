import { View, StyleSheet } from "react-native";
import BlocklyOutput from "@/components/blockly/BlocklyOutput";
import { useAtom } from "jotai";
import { blocklyCodeAtom } from "@/atoms/blockly.atom";

export default function BlocklyCode() {
  const [blocklyCode] = useAtom(blocklyCodeAtom);

  return (
    <View style={styles.container}>
      <BlocklyOutput rawCode={blocklyCode.code} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
