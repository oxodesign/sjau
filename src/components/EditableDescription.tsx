import React from "react";
import {
  Textarea,
  Box,
  Button,
  Stack,
  ButtonGroup,
  FormControl,
  FormLabel,
  BoxProps
} from "@chakra-ui/core";
type EditableDescriptionProps = Overwrite<
  BoxProps,
  {
    onSubmit: (e: string) => void;
    isEditing: boolean;
    defaultValue?: string;
    children: React.ReactNode;
  }
>;
export const EditableDescription: React.FC<EditableDescriptionProps> = ({
  onSubmit,
  defaultValue = "",
  children,
  isEditing,
  ...rest
}) => {
  const [value, setValue] = React.useState(defaultValue);
  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(value);
  };
  const handleBlur = () => {
    onSubmit(value);
  };
  if (isEditing) {
    return (
      <Box {...rest} as="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel htmlFor="description">Beskrivelse</FormLabel>
            <Textarea
              id="description"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
              onBlur={handleBlur}
              autoFocus
            />
          </FormControl>
          <ButtonGroup>
            <Button type="submit" variant="outline" size="xs">
              Lagre endringer
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    );
  }
  return <Box {...rest}>{children}</Box>;
};