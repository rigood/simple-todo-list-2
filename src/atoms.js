import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "react-todolist",
});

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const categoryAtom = atom({
  key: "category",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const todoAtom = atom({
  key: "todo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
