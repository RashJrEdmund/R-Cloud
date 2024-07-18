import { createStore, useStore } from "./custom-store";

type ITestStore = {
  name: string;
  day: number;
  date: Date;
};

const testStore = createStore<ITestStore>({} as ITestStore);

const useTestStore = () => useStore<ITestStore>(testStore);

export default function Test() {
  const [testState, setTestState] = useTestStore();

  const clearState = () => {
    setTestState({
      name: "",
      day: 12,
      date: new Date(),
    });
  };

  return (
    <>
      <div>
        name: {testState.name}
        date: {testState.date.toLocaleDateString()}
        day: {testState.day}
      </div>

      <button type="button" onClick={clearState}>
        clear state
      </button>
    </>
  );
}
