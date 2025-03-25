import { atom } from 'jotai'
import { Gesture } from 'react-native-gesture-handler';

export interface Gesture {
  name: string;
  duration: string;
}

export interface GestureResponse {
  data: Gesture[];
  isLoading: boolean;
}

export const gesturesAtom = atom<GestureResponse>({
  data: [],
  isLoading: false
})