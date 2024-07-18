import { useSyncExternalStore } from "react";

interface StoreState<T> {
  data: T;
  subscriptions: ((data: T) => void)[];
}

interface Store<T> {
  getSnapshot: () => T;
  subscribe: (cb: StoreState<T>["subscriptions"][number]) => () => void;
  set: (data: T) => void;
  update: (update: (data: T) => T) => void;
}

export function createStore<T>(initialData: T): Store<T> {
  let state: StoreState<T> = {
    data: initialData,
    subscriptions: [],
  };

  const set = (data: T) => {
    state.data = data;
    state.subscriptions.forEach((sub) => sub(data));
  };

  return {
    getSnapshot() {
      return state.data;
    },
    subscribe(cb) {
      state.subscriptions.push(cb);
      return () => {
        state.subscriptions = state.subscriptions.filter((sub) => sub !== cb);
      };
    },
    set,
    update(cb) {
      const data = cb(state.data);
      set(data);
    },
  };
}

export const useStore = <T>(store: Store<T>) =>
  useSyncExternalStore(store.subscribe, store.getSnapshot);

// interface User {
//   id: string;
//   name?: string;
// }

// const userStore = createStore<User>({id: '20'});

// const useLoadUser = () => {
//   const {id} = useStore(userStore);

//   // useEffect(() => {
//     setTimeout(() => {
//       userStore.set({id: '30', name: 'Rash'});
//     }, 1000);
//   // }, []);

//   return useStore(userStore);
// };
