import { atom } from 'jotai'

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