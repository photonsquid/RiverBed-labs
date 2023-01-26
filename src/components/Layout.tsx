import React from "react";
import Box, { BoxProps } from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import { thresholds } from "../utils/Responsive";
import { useMediaQuery } from "react-responsive";

function Root(props: BoxProps) {
  return (
    <Box
      sx={
        useMediaQuery({ minWidth: thresholds.desktop })
          ? {
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gridTemplateRows: "auto 1fr",
              gridTemplateAreas: `
          "navbar navbar"
          "main sidebar"
        `,
              width: "100%",
              height: "100vh",
            }
          : {
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }
      }
      {...props}
    />
  );
}

function Header(props: BoxProps) {
  return (
    <Box
      sx={{
        gridArea: "navbar",
        bgcolor: "background.surface",
        color: "primary.contrastText",
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        p: 2,
        gap: 2,
      }}
      {...props}
    />
  );
}

function Sidebar(props: BoxProps) {
  return (
    <Sheet
      sx={{
        gridArea: "sidebar",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        pt: 4,
      }}
    >
      {props.children}
    </Sheet>
  );
}

function Main(props: BoxProps) {
  return (
    <Box
      sx={{
        gridArea: "main",
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
      {...props}
    />
  );
}

const Layout = {
  Root,
  Header,
  Sidebar,
  Main,
};

export default Layout;
