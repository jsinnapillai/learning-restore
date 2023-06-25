import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import agent from "../../api/agent";

const AboutPage = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationError1 = () => {
    agent.TestErrors.getvalidationerror()
      .then(() => console.log("should not see this"))
      .catch((error) => setValidationErrors(error));
  };

  return (
    <React.Fragment>
      <Container>
        <Typography gutterBottom variant="h2">
          AboutPage
        </Typography>
        <ButtonGroup>
          <Button
            variant="contained"
            onClick={() =>
              agent.TestErrors.get400Error().catch((error) =>
                console.log("error")
              )
            }
          >
            Test 400 Errors
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              agent.TestErrors.get401Error().catch((error) =>
                console.log("error")
              )
            }
          >
            Test 401 Errors
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              agent.TestErrors.get404Error().catch((error) =>
                console.log("error")
              )
            }
          >
            Test 404 Errors
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              agent.TestErrors.get500Error().catch((error) =>
                console.log("error")
              )
            }
          >
            Test 500 Errors
          </Button>
          <Button variant="contained" onClick={getValidationError1}>
            Test Validation Errors
          </Button>
        </ButtonGroup>
        {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle> Validation Errors</AlertTitle>
            <List>
              {validationErrors.map((error) => (
                <ListItem key={error}>
                  <ListItemText>{error}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Alert>
        )}
      </Container>
    </React.Fragment>
  );
};

export default AboutPage;
