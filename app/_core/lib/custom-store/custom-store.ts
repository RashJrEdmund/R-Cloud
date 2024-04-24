import { useSyncExternalStore } from 'react';

interface StoreState<T> {
  data: T;
  subscriptions: ((data: T) => void)[];
}

type Updater<T> = (old: T) => T;

type Setter<T> = (data: T | (Updater<T>)) => void;

interface Store<T> {
  getSnapshot: () => T;
  subscribe: (cb: StoreState<T>['subscriptions'][number]) => (() => void);
  set: Setter<T>;
}

function isFunction<T>(d: T | Updater<T>): d is Updater<T> {
  return typeof d === "function";
}

/**
 * @param initialDate
 * of type T
 *
 * Creates a store in stance and exposes the getSnapshot, subscribe and set methods
*/
function createStore<T>(initialData: T): Store<T> {
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

/**
 * @returns [state, setState] // an array of length 2, with the state and the state updater
*/
const useStore = <T>(store: Store<T>): [T, Setter<T>] => [useSyncExternalStore(store.subscribe, store.getSnapshot), store.set];

export type {
  Setter,
};

export {
  createStore,
  useStore,
};
