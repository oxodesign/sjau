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
    size?: "sm" | "md" | "lg";
  }
>;
export const Datepicker: React.FC<DatepickerProps> = ({
  onChange,
  size,
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
        customInput={<Input size={size} width="xs" />}
        onChange={handleChange}
        locale="nb"
        {...rest}
      />
    </Box>
  );
};

export default Datepicker;
