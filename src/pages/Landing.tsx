import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CssVarsProvider,
  FormControl,
  FormLabel,
  Input,
  Typography,
  extendTheme,
} from "@mui/joy";
import { MdArrowForwardIos } from "react-icons/md";
import Api from "../utils/Api";

const customTheme = extendTheme({
  typography: {
    display1: {
      background:
        "linear-gradient(-30deg, var(--joy-palette-primary-400), var(--joy-palette-success-400))",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
});

export default function Landing() {
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    Api.setKey(key);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography>
        <CssVarsProvider theme={customTheme}>
          <Typography level="display1">RiverBed</Typography>
        </CssVarsProvider>
        <Typography
          level="display1"
          fontWeight="100"
          sx={{
            ml: 2,
          }}
        >
          labs
        </Typography>
      </Typography>
      <FormControl
        sx={{
          width: "min(100%, 400px)",
        }}
      >
        <FormLabel>RiverBed API key</FormLabel>
        <Input
          placeholder="Your API key"
          type="password"
          onChange={(event) => {
            setKey(event.target.value);
          }}
        />
      </FormControl>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Button
          variant="soft"
          color="info"
          onClick={() => {
            setIsToolTipOpen(true);
          }}
        >
          Request a key
        </Button>
        <Button
          variant="soft"
          type="submit"
          color="success"
          loading={loading}
          endDecorator={<MdArrowForwardIos />}
        >
          Get started
        </Button>
      </Box>
      {isToolTipOpen && (
        <Card
          sx={{
            position: "relative",
            width: "min(100%, 500px)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 2,
          }}
        >
          <Typography level="h5">Contacting us</Typography>
          <Typography level="body2">
            New API keys are issued on a case-by-case basis. Please contact us
            at
            <Typography
              level="body1"
              variant="outlined"
              component="a"
              href="mailto:contact@photonsquid.fr"
              sx={{ mx: 1 }}
            >
              contact@photonsquid.fr
            </Typography>
            to request a key. We will get back to you as soon as possible.
          </Typography>
        </Card>
      )}
    </Box>
  );
}
