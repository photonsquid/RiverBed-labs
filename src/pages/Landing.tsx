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

const customTheme = extendTheme({
  typography: {
    display1: {
      // `--joy` is the default CSS variable prefix.
      // If you have a custom prefix, you have to use it instead.
      // For more details about the custom prefix, go to https://mui.com/joy-ui/customization/using-css-variables/#custom-prefix
      background:
        "linear-gradient(-30deg, var(--joy-palette-primary-400), var(--joy-palette-success-400))",
      // `Webkit*` properties must come later.
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
});

export default function Landing() {
  const [key, setKey] = useState("");
  const [toolTipOpen, setToolTipOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (key) {
      console.log(key);
    }
  };

  return (
    <Box
      component="form"
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
            setToolTipOpen(true);
          }}
        >
          Request a key
        </Button>
        <Button
          variant="soft"
          type="submit"
          color="success"
          endDecorator={<MdArrowForwardIos />}
        >
          Get started
        </Button>
      </Box>
      {toolTipOpen && (
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
