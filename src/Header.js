import React from "react";
import { Heading, Box, Tooltip } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

function Header() {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "inset",
      }}
    >
      <Heading style={{ padding: "2%" }}>Word Game</Heading>
      <Tooltip
        label="You have six attempts to guess a five-letter word."
        placement="right"
      >
        <QuestionIcon />
      </Tooltip>
    </Box>
  );
}

export default Header;
