import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "react-todolist",
});

export const isDarkAtom = atom({
  key: "isDarkAtom",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const categoryAtom = atom({
  key: "categoryAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const todoAtom = atom({
  key: "todoAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const sortAtom = atom({
  key: "sortAtom",
  default: "new",
  effects_UNSTABLE: [persistAtom],
});

export const filterAtom = atom({
  key: "filterAtom",
  default: "all",
  effects_UNSTABLE: [persistAtom],
});

export const sortedTodoSelector = selector({
  key: "sortedTodoSelector",
  get: ({ get }) => {
    const sort = get(sortAtom);
    const todos = get(todoAtom);
    const todosCopy = [...todos];

    switch (sort) {
      case "new":
        return todosCopy.sort((a, b) => {
          return b.id - a.id;
        });
      case "old":
        return todosCopy.sort((a, b) => {
          return a.id - b.id;
        });
      case "asc":
        return todosCopy.sort((a, b) => {
          const textA = a.value;
          const textB = b.value;
          return textA.localeCompare(textB);
        });
      case "desc":
        return todosCopy.sort((a, b) => {
          const textA = a.value;
          const textB = b.value;
          return textB.localeCompare(textA);
        });
    }
  },
});

export const filteredTodoSelector = selector({
  key: "filteredTodoSelector",
  get: ({ get }) => {
    const filter = get(filterAtom);
    const sortedTodos = get(sortedTodoSelector);

    switch (filter) {
      case "doing":
        return sortedTodos.filter((todo) => !todo.isDone);
      case "done":
        return sortedTodos.filter((todo) => todo.isDone);
      default:
        return sortedTodos;
    }
  },
});
