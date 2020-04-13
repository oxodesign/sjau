import React from "react";
import nbLocale from "date-fns/locale/nb";
import ReactDatepicker, {
  registerLocale,
  ReactDatePickerProps
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input, Box } from "@chakra-ui/core";
import styled from "@emotion/styled";

const DatepickerZIndexFixer = styled.div`
  .react-datepicker-popper {
    z-index: 3;
  }
`;

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
      <DatepickerZIndexFixer>
        <ReactDatepicker
          customInput={<Input width="xs" />}
          onChange={handleChange}
          {...rest}
        />
      </DatepickerZIndexFixer>
    </Box>
  );
};

export default Datepicker;
