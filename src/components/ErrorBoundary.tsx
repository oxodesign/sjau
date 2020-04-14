import React from "react";
import { Text, Box, Heading, ButtonGroup, Button } from "@chakra-ui/core";
import { MdRefresh } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import { useAnalytics } from "reactfire";
import * as firebase from "firebase/app";

type ErrorBoundaryProps = {
  analytics: firebase.analytics.Analytics;
};
type ErrorBoundaryState = {
  hasError: boolean;
  error: null | Error;
};
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error) {
    this.props.analytics.logEvent("error_occurred", {
      name: error.name,
      message: error.message
    });
  }
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

const withAnalytics = (Component: any) => (props: any) => {
  const analytics = useAnalytics();
  return <Component {...props} analytics={analytics} />;
};

export default withAnalytics(ErrorBoundary);
