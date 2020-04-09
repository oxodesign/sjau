import React from "react";
import nbLocale from "date-fns/locale/nb";
import ReactDatepicker, {
  registerLocale,
  ReactDatePickerProps
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input, Box } from "@chakra-ui/core";

type DatepickerProps = Overwrite<
  ReactDatePickerProps,
  {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
>;
export const Datepicker: React.FC<DatepickerProps> = ({
  onChange,
  ...rest
}) => {
  React.useEffect(() => {
    registerLocale("nb", nbLocale);
  }, []);
  const handleChange = (date: Date, event: React.SyntheticEvent) =>
    onChange({ target: { value: date.toLocaleDateString("fr-CA") } } as any);
  return (
    <Box>
      <ReactDatepicker
        customInput={<Input width="xs" />}
        onChange={handleChange}
        {...rest}
      />
    </Box>
  );
};

export default Datepicker;
