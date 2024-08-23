/* FILE_DESC +=> =======================================
| This exports a class CLIENT_STORAGE that will act as |
| localStorage or sessionStorage browser API. Took out |
| time to make it dynamic and it's type will be decide |
| whenever an instance is being created 😇             |
========================================//============*/

interface Options {
  isString: boolean;
}

class CLIENT_STORAGE {
  myStorage: Storage; // will either be localStorage or sessionStorage;

  constructor(type: "local" | "session") {
    if (type === "local") {
      this.myStorage = window.localStorage; // utilizing localStorage;
    } else if (type === "session") {
      this.myStorage = window.sessionStorage; // utilizing sessionStorage;
    } else {
      throw new Error(
        "NO STORAGE TYPE SELECTED. PICK ONE OF 'local' | 'session' !!"
      );
    }
  }

  save<T>(key: string, val: T) {
    if (typeof val === "string")
      return this.myStorage.setItem(key, val); // if i stringiy a string, it'll have additional quotes to it.

    return this.myStorage.setItem(key, JSON.stringify(val));
  }

  get<T>(key: string, options: Required<Options>) {
    const val: T = this.myStorage.getItem(key) as T;

    if (options.isString) return val;

    return JSON.parse(val as any) as T;
  }

  remove(key: string) {
    return this.myStorage.removeItem(key);
  }

  clear() {
    return this.myStorage.clear();
  }
}

export { CLIENT_STORAGE };
