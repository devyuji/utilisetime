import { createContext, FC, useState } from "react";
import update from "immutability-helper";

interface dataProps {
  time: string;
  label: string;
}

interface timeProps {
  hr: string;
  min: string;
}

const initalValue = {
  totalTime: {
    hr: "24",
    min: "00",
  },
  data: [],
};

export const DataContext = createContext<Array<dataProps>>(initalValue.data);
export const AddContext = createContext((value: dataProps) => null);
export const TotalTimeContext = createContext<timeProps>(initalValue.totalTime);
export const DeleteDataContext = createContext(
  (index: number, time: string) => null
);
export const UpdateTimeContext = createContext((value: timeProps) => null);

export const isSingleDigit = (val: string) => {
  return /^\d$/.test(val);
};

const ContextProvider: FC = ({ children }) => {
  const [data, setData] = useState<Array<dataProps>>(initalValue.data);
  const [totalTime, setTotalTime] = useState<timeProps>(initalValue.totalTime);

  const addData = (value: dataProps) => {
    setData((prev) => update(prev, { $push: [value] }));

    return null;
  };

  const deleteData = (index: number, time: string) => {
    const hr = parseInt(time.split(":")[0]);
    const min = parseInt(time.split(":")[1]);
    let newHr = parseInt(totalTime.hr) + hr;
    let newMin = parseInt(totalTime.min) + min;

    if (newMin >= 60) {
      newMin = 60 - newMin;
      newHr = newHr + 1;
    }

    setTotalTime({
      hr: isSingleDigit(`${newHr}`) ? `0${newHr}` : `${newHr}`,
      min: isSingleDigit(`${newMin}`) ? `0${newMin}` : `${newMin}`,
    });

    setData((prev: any) => update(prev, { $splice: [[index, 1]] }));
    return null;
  };

  const updateTime = (value: timeProps) => {
    setTotalTime({
      hr: value.hr,
      min: value.min,
    });
    return null;
  };

  return (
    <DataContext.Provider value={data}>
      <AddContext.Provider value={addData}>
        <TotalTimeContext.Provider value={totalTime}>
          <DeleteDataContext.Provider value={deleteData}>
            <UpdateTimeContext.Provider value={updateTime}>
              {children}
            </UpdateTimeContext.Provider>
          </DeleteDataContext.Provider>
        </TotalTimeContext.Provider>
      </AddContext.Provider>
    </DataContext.Provider>
  );
};

export default ContextProvider;
