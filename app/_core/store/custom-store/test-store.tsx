import { createStore, useStore } from './store.base';

type ITestStore = {
  name: string;
  day: number;
  date: Date;
}

const testStore = createStore<ITestStore>({} as ITestStore);

// testStore.

const useTestStore = () => useStore<ITestStore>(testStore);

export default function Test() {
  const testState = useTestStore();

  return (
    <div>
      name: {testState.name}
      date: {testState.date.toLocaleDateString()}
      day: {testState.day}
    </div>
  );
};
