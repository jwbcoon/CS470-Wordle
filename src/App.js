import {useState, useRef} from "react";

import GuessArea from "./pages/GuessArea";
import TopBanner from "./pages/TopBanner";
import {Box, ThemeProvider} from "@mui/material";

import {numGuessAreaRows, numGuessAreaColumns} from "./utils/sizes";
import {boxStyleVariants, theme} from './utils/keyboardAndGuessAreaBoxTypes';
import MessageCenter from "./pages/MessageCenter";
import Keyboard from "./pages/Keyboard";


function App() {

    const keyboardInitKeys = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    const [submittedLetters, setSubmittedLetters] = useState([]);

    const initialKeyBoard = () => {
        let keys = keyboardInitKeys
            .map(row => row.split('')
                .map(letter => ({...boxStyleVariants.keyboardUnusedKey, letter: letter}))
            );
        const backspaceKey = [{
            ...boxStyleVariants.keyboardUnusedKey, // you should probably create a new variant for backspace and enter keys
            width: 50,
            letter: 'Delete',
            isBackspaceKey: true
        }]
        const enterKey = [{
            ...boxStyleVariants.keyboardUnusedKey,
            width: 50,
            letter: 'Enter',
            isEnterKey: true
        }]
        const blankKey = [{
            color: theme.palette.primary.dark,
            borderColor: theme.palette.primary.dark,
            width: 50,
            letter: ' ',
            isBlankKey: true
        }]

        return [keys[0], backspaceKey, blankKey, keys[1], enterKey, blankKey, keys[2]];
    }

    const initialRows = rowType => {
        if (rowType === 'active')
            return new Array(numGuessAreaColumns).fill({
                ...boxStyleVariants.blankBox,
                letter: ''
            })
        else if (rowType === 'remaining')
            return new Array((numGuessAreaRows - 1) * numGuessAreaColumns)
                .fill({
                    ...boxStyleVariants.blankBox,
                    letter: ''
                });
    }



    const inputRef = useRef(null); //react reference variable for onBlurHandler to access
    const [activeIdx, setActiveIdx] = useState(0); //index of the GuessArea GuessBox currently being typed into

    const [completedRows, setCompletedRows] = useState([]); //all the rows which contain five letter entries
    const [activeRow, setActiveRow] = useState(new Array(numGuessAreaColumns).fill({
        ...boxStyleVariants.blankBox,
        letter: ''
    })); //the row currently accepting input
    const [remainingRows, setRemainingRows] = useState(new Array((numGuessAreaRows - 1) * numGuessAreaColumns)
        .fill({
            ...boxStyleVariants.blankBox,
            letter: ''
        })); //the remaining rows to enter five letter guesses into
    const allBoxes = [...completedRows, ...activeRow, ...remainingRows]; //the total gameboard

    const dictionary = require('./fiveLetterWords.json');
    const [targetWord, setTargetWord] = useState(dictionary
        .words.slice()[Math.floor(Math.random() * dictionary.words.length + 1)].split('')
        .map(letter => ({letter: letter, isFound: false, isKnown: false})));

    const [message, setMessage] = useState('Guess within 6 tries!');



    const onKeyDownHandler = (event) => {
        const key = event.key;
        const globalActiveIdx = activeIdx + completedRows.length;

        if (globalActiveIdx < allBoxes.length
            && targetWord.filter(letter => letter.isFound).length < numGuessAreaColumns) {
            if (activeIdx < numGuessAreaColumns) {
                if (key.match(/^([a-z]|[A-Z])$/)) {
                    const newActiveRow = activeRow.slice();
                    newActiveRow[activeIdx] = {
                        ...boxStyleVariants.notEvaluated,
                        letter: key
                    }
                    setActiveRow(newActiveRow);
                    setActiveIdx(activeIdx < numGuessAreaColumns - 1 ? activeIdx + 1 : activeIdx);
                    return;
                }
            }
            if (key.match(/(Backspace)|(Delete)/)) {
                const newActiveRow = activeRow.slice();
                if (activeRow[activeIdx].letter !== '') { //if the current space is not blank, delete it
                    newActiveRow[activeIdx] = {
                        ...boxStyleVariants.blankBox,
                        letter: ''
                    }
                }
                else {
                    newActiveRow[activeIdx - 1] = { //if the current space is blank, delete the previous space
                        ...boxStyleVariants.blankBox,
                        letter: ''
                    }
                    setActiveIdx(activeIdx > 0 ? activeIdx - 1 : 0);
                }
                setActiveRow(newActiveRow);
                return;
            }
            if (key.match(/(Enter)/)) {
                const submitWordString = activeRow.map(box => box.letter).join('');
                const targetWordString = targetWord.map(ele => ele.letter).join('');
                const getOccurrences = word => {
                    return word.split('')
                        .map(letter => ({
                                letter: letter,
                                occurrences: word.split('')
                                    .reduce((charCount, char) => charCount + (char === letter ? 1 : 0)
                                        , 0)
                            })
                        );
                }
                let numOccurrences = getOccurrences(targetWordString);

                if (dictionary.words.includes(submitWordString)) {
                    if (activeIdx + 1 === numGuessAreaColumns) {
                        setTargetWord(targetWordString.split('')
                            .map((letter, idx) => {
                                numOccurrences[idx].occurrences -= 1;
                                if (letter === submitWordString[idx])
                                    return {letter: letter, isFound: true, isKnown: true};
                                if (submitWordString.includes(letter))
                                    return {letter: letter, isFound: false, isKnown: numOccurrences[idx] >= 0};
                                return {letter: letter, isFound: false, isKnown: false};
                            })
                        );

                        numOccurrences = getOccurrences(targetWordString);
                        setCompletedRows(completedRows
                            .concat(activeRow.slice()
                                .map((box, idx) => {
                                    if (box.letter === targetWordString[idx]) {
                                        numOccurrences[idx].occurrences -= 1;
                                        return {...boxStyleVariants.exactMatch, letter: box.letter};
                                    }
                                    if (targetWordString.includes(box.letter)) {
                                        numOccurrences[targetWordString.indexOf(box.letter)].occurrences -= 1;
                                        return numOccurrences[targetWordString.indexOf(box.letter)].occurrences >= 0
                                            ? {...boxStyleVariants.partialMatch, letter: box.letter}
                                            : {...boxStyleVariants.noMatch, letter: box.letter};
                                    }
                                    return {...boxStyleVariants.noMatch, letter: box.letter};
                                }))
                        );
                        setActiveRow(allBoxes.slice(globalActiveIdx + 1, globalActiveIdx + numGuessAreaColumns + 1));
                        setRemainingRows(remainingRows.slice(activeIdx + 1));
                        setSubmittedLetters(submittedLetters.concat(activeRow.map(box => box.letter))
                            .filter((box, idx, row) => idx === row.indexOf(box))
                        ); //get unique letters
                        setActiveIdx(0);

                        if (submitWordString.match(targetWordString))
                            setMessage(`Congrats! You guessed ${targetWordString}`
                                + ` within ${(completedRows.length / numGuessAreaColumns) + 1} tries.`);
                        else if (remainingRows.length === 0)
                            setMessage(`Nice try! The correct word was ${targetWordString}.`);
                    }
                }
                else {
                    setMessage(`${submitWordString} is not a valid word in the game dictionary.`);
                }
            }
        }
    }

    const onBlurHandler = event => {
        console.log('Blur Event! Returning focus...');
        inputRef.current.focus();
    }



    return (
    <ThemeProvider theme={theme}>
      <Box
          alignItems='center'
          height='100%'
          width='100%'
          paddingBottom='6.5%'
          sx={{
              display: 'flex',
              flexDirection: 'column'
          }}
          backgroundColor={theme.palette.primary.dark}
      >
          <TopBanner theme={theme}/>
          <MessageCenter message={message} theme={theme}/>
          <GuessArea allBoxes={allBoxes}
                     onKeyDownHandler={event => onKeyDownHandler(event)}
                     onBlurHandler={event => onBlurHandler(event)}
                     inputRef={inputRef}
          />
          <Keyboard keyboard={initialKeyBoard()}
                    submittedLetters={submittedLetters}
                    theme={theme}
          />
      </Box>
    </ThemeProvider>
  );
}

export default App;
