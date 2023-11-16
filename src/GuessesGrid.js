import React from "react";
import { range } from "./utils";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";

function GuessesGrid({
  guesses,
  amountOfColumns,
  amountOfRows,
  fiveLetterAnswer,
}) {
  const backgroundColor = (guessWord, position) => {
    if (guessWord[position] === fiveLetterAnswer[position]) {
      return "#8bac8b";
    } else if (fiveLetterAnswer.includes(guessWord[position])) {
      return "#f7f7c3";
    } else {
      return "#ee8080cf";
    }
  };

  return (
    <SimpleGrid
      columns={amountOfColumns}
      spacing={30}
      style={{
        margin: "4%",
        padding: "0% 30%",
        justifyItems: "center",
      }}
    >
      {range(amountOfRows).map((rowIndex) => {
        return (
          <React.Fragment key={`rowKey-${rowIndex}`}>
            {range(amountOfColumns).map((columnIndex) => {
              return (
                <React.Fragment key={`rowColumnKey-${rowIndex}-${columnIndex}`}>
                  {guesses[rowIndex] ? (
                    <Box
                      key={`guessCellKey-${columnIndex}-${rowIndex}`}
                      style={{
                        backgroundColor: backgroundColor(
                          guesses[rowIndex].guessValue,
                          columnIndex
                        ),
                        borderStyle: "outset",
                        height: "50px",
                        width: "60px",
                      }}
                    >
                      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        {guesses[rowIndex].guessValue[columnIndex]}
                      </Text>
                    </Box>
                  ) : (
                    <Box
                      key={`emptyCellKey-${columnIndex}-${rowIndex}`}
                      style={{
                        background: "#aeaecb",
                        borderStyle: "outset",
                        height: "50px",
                        width: "60px",
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </SimpleGrid>
  );
}

export default GuessesGrid;
