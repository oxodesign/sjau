import React from "react";
import { Text, Box, Heading, ButtonGroup, Button } from "@chakra-ui/core";
import { MdRefresh } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";

export class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error) {}
  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return (
      <Box>
        <Heading>Ojsann..</Heading>
        <Text>
          Nå var det noe uventa som skjedde. Vi har sagt ifra automatisk, så om
          ting ikke skulle fungere etter du har lastet siden på nytt, så prøv
          igjen litt senere.
        </Text>
        <ButtonGroup spacing={3}>
          <Button
            variant="outline"
            variantColor="red"
            leftIcon={FaExclamationTriangle}
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Prøv en gang til
          </Button>
          <Button
            variant="solid"
            variantColor="red"
            leftIcon={MdRefresh}
            onClick={() => window.location.reload()}
          >
            Last siden på nytt
          </Button>
        </ButtonGroup>
      </Box>
    );
  }
}
