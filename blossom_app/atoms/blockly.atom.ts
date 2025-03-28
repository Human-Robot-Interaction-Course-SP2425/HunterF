import { atom } from "jotai";

export interface BlocklyCode {
  code: string;
} 

export const blocklyCodeAtom = atom<BlocklyCode>({
  code: "",
});

