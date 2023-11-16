import React, { useState, useEffect } from "react";
import { Box, FormLabel, Input } from "@chakra-ui/react";
import GuessesGrid from "./GuessesGrid";

function Body() {
  const [inputValue, setInputValue] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [fiveLettersRandomWords, setFiveLettersRandomWords] = useState([]);
  const [finalMessage, setFinalMessage] = useState("");
  const amountOfColumns = 5;
  const amountOfRows = 6;

  const fiveLetterAnswer = fiveLettersRandomWords
    ? fiveLettersRandomWords[0]
    : "apple";

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?length=5&number=10")
      .then((response) => response.json())
      .then((data) => setFiveLettersRandomWords(data)); // devuelve una promesa
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`guess: ${inputValue}`);
    console.log(`answer: ${fiveLetterAnswer}`);

    const newArrayGuesses = [
      ...guesses,
      { guessValue: inputValue, id: crypto.randomUUID() },
    ];
    setGuesses(newArrayGuesses);

    if (inputValue === fiveLetterAnswer) {
      setFinalMessage(
        `Congratulations! Got it in ${newArrayGuesses.length} guesses`
      );
    }

    if (
      newArrayGuesses.length === amountOfRows &&
      inputValue !== fiveLetterAnswer
    ) {
      setFinalMessage(`Sorry, the correct answer is ${fiveLetterAnswer}`);
    }

    setInputValue("");
  };

  return (
    <>
      <GuessesGrid
        guesses={guesses}
        amountOfColumns={amountOfColumns}
        amountOfRows={amountOfRows}
        fiveLetterAnswer={fiveLetterAnswer}
      />
      <form
        className="guess-input-wrapper"
        onSubmit={handleSubmit}
        style={{ marginTop: "4%", textAlignLast: "center" }}
      >
        {finalMessage ? (
          <Box
            style={{
              backgroundColor: "#bfd0f2",
              padding: "1%",
            }}
          >
            {finalMessage}
          </Box>
        ) : (
          <>
            <FormLabel forhtml="guess-input">Enter Guess</FormLabel>
            <Input
              id="guess-input"
              disabled={finalMessage}
              style={{ marginTop: "1%" }}
              type="text"
              isRequired
              value={inputValue}
              onChange={handleInputChange}
              size="lg"
              minLength={5}
              maxLength={amountOfColumns}
            />
          </>
        )}
      </form>
    </>
  );
}

export default Body;
