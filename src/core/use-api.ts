import axios, { AxiosInstance } from "axios";
import { Dispatch, useState } from "react";

let Config = {
  stateBehavior: "await" as "eager" | "await" | "skip",
  shouldRefresh: true,
};

export let client = axios.create({
  baseURL: "",
});

// let model = (name: string, methods: Record<string, >) => {

// }

export let useApi = <T extends {}>(model: T): T => {
  // const [data, setData] = useState<Record<string, any>>({});

  // let refresh = () => {
  //   setData((data) => data);
  // };

  return model;
};

export let model = <
  T extends any,
  Y extends (
    client: AxiosInstance,
    state: T,
    setState: Dispatch<React.SetStateAction<T>>,
    refresh: () => void,
    config: typeof Config
  ) => {}
>(
  initialData: T,
  methodBuilder: Y,
  endpoint: string
): ((
  data: T,
  config?: typeof Config
) => ReturnType<Y> & {
  refresh: () => void;
}) => {
  let client = axios.create({
    baseURL: "",
  });

  return (data, config = Config) => {
    let [state, setState] = useState<T>(data);

    async function refresh() {
      let { data } = await client.get<T>(`${endpoint}`);
      setState(data);
    }

    const methods = methodBuilder(
      client,
      state,
      setState,
      refresh,
      config as typeof Config
    ) as ReturnType<Y>;

    return {
      ...methods,
      refresh,
    };
  };
};
