import {Fragment, useState, useRef} from "react";

import GuessArea from "./pages/GuessArea";
import TopBanner from "./pages/TopBanner";
import {Box} from "@mui/material";

import {
    numGuessAreaRows,
    numGuessAreaColumns} from "./utils/sizes";
import boxStyleVariants from './utils/keyboardAndGuessAreaBoxTypes';
import MessageCenter from "./pages/MessageCenter";
import Keyboard from "./pages/Keyboard";
import dictionary from "./fiveLetterWords.json";


function App() {

    const keyboardInitKeys = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
    const [submittedLetters, setSubmittedLetters] = useState([]);


    const initialKeyBoard = () => {
        let keys = keyboardInitKeys
            .map(row => row.split('').map(letter => ({...boxStyleVariants.keyboardUnusedKey, letter: letter})));
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
            color: 'white',
            width: 50,
            letter: ' ',
            isBlankKey: true
        }]

        return [keys[0], backspaceKey, blankKey, keys[1], enterKey, blankKey, keys[2]];
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
    const [winWord, setWinWord] = useState(dictionary
        .words[Math.floor(Math.random() * dictionary.words.length + 1)].split('')
        .map(letter => ({letter: letter, isFound: false, isKnown: false})));


    const onKeyDownHandler = (event) => {
        if (winWord.filter(letter => letter.isFound).length < numGuessAreaColumns - 1) {
            const key = event.key;
            const globalActiveIdx = activeIdx + completedRows.length;

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
            if (activeIdx >= 0) {
                if (key.match(/(Backspace)|(Delete)/)) {
                    const newActiveRow = activeRow.slice();
                    if (activeRow[activeIdx].letter !== ' ') { //if the current space is not blank, delete it
                        newActiveRow[activeIdx] = {
                            ...boxStyleVariants.blankBox,
                            letter: ' '
                        }
                    } else {
                        newActiveRow[activeIdx - 1] = { //if the current space is blank, delete the previous space
                            ...boxStyleVariants.blankBox,
                            letter: ' '
                        }
                        setActiveIdx(activeIdx > 0 ? activeIdx - 1 : 0);
                    }
                    setActiveRow(newActiveRow);
                    return;
                }
            }
            if (key.match(/(Enter)/)) {
                if (activeIdx + 1 === numGuessAreaColumns) {
                    const submitWord = activeRow.map(box => box.letter).join('');
                    const winningWord = winWord.map(ele => ele.letter).join('');

                    setWinWord(winningWord.split('')
                        .map((letter, idx) => {
                            if (letter === submitWord[idx])
                                return {letter: letter, isFound: true, isKnown: true}
                            if (submitWord.includes(letter))
                                return {letter: letter, isFound: false, isKnown: true}
                            return {letter: letter, isFound: false, isKnown: false}
                        })
                    );
                    setCompletedRows(completedRows
                        .concat(activeRow.slice()
                            .map(box => {
                                if (submitWord.match(winningWord))
                                    return {...boxStyleVariants.exactMatch, letter: box.letter};
                                if (winningWord.includes(box.letter))
                                    return submitWord.indexOf(box.letter) === winningWord.indexOf(box.letter)
                                        ? {...boxStyleVariants.exactMatch, letter: box.letter}
                                        : {...boxStyleVariants.partialMatch, letter: box.letter}
                                return {...boxStyleVariants.noMatch, letter: box.letter}
                            }))
                    );
                    setActiveRow(allBoxes.slice(globalActiveIdx + 1, globalActiveIdx + numGuessAreaColumns + 1));
                    setRemainingRows(allBoxes.slice(globalActiveIdx + numGuessAreaColumns + 1, allBoxes.length));
                    setSubmittedLetters(submittedLetters.concat(activeRow.map(box => box.letter))
                        .filter((box, idx, row) => idx === row.indexOf(box))); //get unique letters
                    setActiveIdx(0);
                }
            }
        }
    }

    const onBlurHandler = event => {
        console.log('Blur Event! Returning focus...');
        inputRef.current.focus();
    }


    return (
    <Fragment>
      <Box
          margin='auto'
          alignItems='center'
          justifyContent='center'
          sx={{
              height: 600,
              width: 500,
              display: 'flex',
              flexDirection: 'column'
          }}
      >
          <TopBanner />
          <MessageCenter/>
          <GuessArea allBoxes={allBoxes}
                     onKeyDownHandler={event => onKeyDownHandler(event)}
                     onBlurHandler={event => onBlurHandler(event)}
                     inputRef={inputRef}
          />
          <Keyboard keyboard={initialKeyBoard()}
                    submittedLetters={submittedLetters} />
      </Box>
    </Fragment>
  );
}

export default App;
