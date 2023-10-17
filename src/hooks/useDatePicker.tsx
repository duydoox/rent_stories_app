import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const useDatePicker = () => {
  return useContext(DatePickerContext);
};

export default useDatePicker;

export type DatePickerT = {
  status: boolean;
  toggle: (
    bool: boolean,
    _mode?: 'date' | 'time' | 'datetime',
    onOk?: (selectedDate?: Date) => void,
  ) => void;
  selectedDate?: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setMinimumDateDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setMaximumDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export const DatePickerContext = React.createContext<Partial<DatePickerT>>({});

export const DatePickerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [status, setStatus] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [minimumDateDate, setMinimumDateDate] = useState<Date>();
  const [maximumDate, setMaximumDate] = useState<Date>();

  const [mode, setMode] = useState<'date' | 'time' | 'datetime'>('datetime');
  const onChange = useRef<(selectedDate?: Date) => void>();

  const toggle = useCallback(
    (
      bool: boolean,
      _mode: 'date' | 'time' | 'datetime' = 'datetime',
      onOk?: (selectedDate?: Date) => void,
    ) => {
      setStatus(bool);
      setMode(_mode);
      if (bool) {
        onChange.current = onOk;
      }
    },
    [],
  );

  const hideDatePicker = () => {
    setStatus(false);
  };

  const handleConfirm = (date: Date) => {
    setStatus(false);

    console.warn(
      'A date has been picked: ',
      date,
      date.toUTCString(),
      date.toTimeString(),
    );
    setSelectedDate(date);
    onChange.current?.(date);
    onChange.current = undefined;
  };

  const contextValue = useMemo<DatePickerT>(
    () => ({
      status,
      toggle,
      selectedDate,
      setSelectedDate,
      setMinimumDateDate,
      setMaximumDate,
    }),
    [selectedDate, status, toggle],
  );
  return (
    <DatePickerContext.Provider value={contextValue}>
      {children}
      <DateTimePickerModal
        isVisible={status}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        onHide={hideDatePicker}
        date={selectedDate}
        locale="vi_VN"
        display={Platform.OS === 'ios' ? undefined : 'spinner'}
        minimumDate={minimumDateDate}
        maximumDate={maximumDate}
      />
    </DatePickerContext.Provider>
  );
};
