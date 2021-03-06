import React from "react";
import { Text, Heading, ButtonGroup, Button, Stack } from "@chakra-ui/core";
import { MdRefresh } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import { useAnalytics } from "reactfire";
import * as firebase from "firebase/app";
import { Container } from "./Container";
import * as Sentry from "@sentry/browser";

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
    error: null,
  };
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: any) {
    this.props.analytics.logEvent("error_occurred", {
      name: error.name,
      message: error.message,
    });
    if (process.env.NODE_ENV === "production") {
      Sentry.withScope((scope) => {
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
      });
    }
  }
  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return (
      <Container>
        <Stack spacing={6}>
          <Heading>Ojsann..</Heading>
          <Text>
            Nå var det noe uventa som skjedde. Vi har sagt ifra automatisk, så
            om ting ikke skulle fungere etter du har lastet siden på nytt, så
            prøv igjen litt senere.
          </Text>
          <Text>
            Det kan hende at det har kommet en ny versjon av appen siden du gikk
            inn på appen - og da pleier det å fikse seg med en refresh!
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
        </Stack>
      </Container>
    );
  }
}

const withAnalytics = (Component: any) => (props: any) => {
  const analytics = useAnalytics();
  return <Component {...props} analytics={analytics} />;
};

export default withAnalytics(ErrorBoundary);
