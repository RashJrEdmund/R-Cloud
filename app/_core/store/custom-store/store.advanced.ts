import { useSyncExternalStore } from 'react';

interface StoreState<T> {
  data: T;
  subscriptions: ((data: T) => void)[];
}

type Updater<T> = (old: T) => T;

interface Store<T> {
  getSnapshot: () => T;
  subscribe: (cb: StoreState<T>['subscriptions'][number]) => (() => void);
  set: (data: T | (Updater<T>)) => void;
}

function isFunction<T>(d: T | Updater<T>): d is Updater<T> {
  return typeof d === "function";
}

export function createStore<T>(initialData: T): Store<T> {
  let state: StoreState<T> = {
    data: initialData,
    subscriptions: []
  };

  return {
    getSnapshot() {
      return state.data;
    },
    subscribe(cb) {
      state.subscriptions.push(cb);
      return () => {
        state.subscriptions = state.subscriptions.filter(sub => sub !== cb);
      };
    },
    set(d) {
      const data = isFunction(d)? d(state.data): d;
      state.data = data;
      state.subscriptions.forEach(sub => sub(data));
    },
  };
}

export const useStore = <T>(store: Store<T>) => [useSyncExternalStore(store.subscribe, store.getSnapshot), store.set];

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
