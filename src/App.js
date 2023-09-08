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


function App() {

    const demoKeys = 'asdfg', demoNumKeys = demoKeys.length;

    const initialKeyBoard = () => {
        let keys = demoKeys.split("").map(letter => ({...boxStyleVariants.keyboardUnusedKey, letter: letter}))
        const backspaceKey = {
            ...boxStyleVariants.keyboardUnusedKey, // you should probably create a new variant for backspace and enter keys
            width: 50,
            letter: 'Delete',
            isBackspaceKey: true
        }
        const enterKey = {
            ...boxStyleVariants.keyboardUnusedKey,
            width: 50,
            letter: 'Enter',
            isEnterKey: true
        }
        keys.unshift(backspaceKey);
        keys.push(enterKey);

        return keys;
    }

    const inputRef = useRef(null);

    const [activeIdx, setActiveIdx] = useState(0); //index of the GuessArea GuessBox currently being typed into

    const [completedRows, setCompletedRows] = useState([]);

    const [activeRow, setActiveRow] = useState(new Array(numGuessAreaColumns).fill({
        color: 'white',
        letter: ''
    }));

    const [remainingRows, setRemainingRows] = useState(new Array((numGuessAreaRows - 1) * numGuessAreaColumns)
        .fill({
            color: 'white',
            letter: ''
        }));

    const allBoxes = [...completedRows, ...activeRow, ...remainingRows];


    const keyboardKeyPressedCallBack = (attrsOfKeyThatUserClicked) => {
        console.log(`attributes of the key that was just clicked is ${JSON.stringify(attrsOfKeyThatUserClicked)}`);
        const activeRowIdx = activeIdx + completedRows.length;

        if(activeRowIdx === 0 && attrsOfKeyThatUserClicked.isBackspaceKey) {
            return; // activeRow is empty as such, there are no letters to erase.
        }
        if(attrsOfKeyThatUserClicked.isBackspaceKey) {
            const newActiveRow = activeRow.slice();
            newActiveRow[activeRowIdx - 1] = boxStyleVariants.blankBox;
            setActiveRow(newActiveRow);
            setActiveIdx(activeRowIdx - 1);
            return;
        }
        if(activeRowIdx === numGuessAreaColumns && attrsOfKeyThatUserClicked.isEnterKey) {
            // evaluate user's work that is now in activeRow. The feedback boxes get
            // stored in a 5-element array and get pushed into the completedRows.
            // the activeRow gets reset to 5 blank boxes.
            // the number of elements in remainingRows gets reduced by 5.
            // if the remainingRows is empty, game is over. Display a message in the
            // message center.
            return;
        }
        if(attrsOfKeyThatUserClicked.isEnterKey) {
            // ignore the enter key as there are not enough letters in activeRow
            return;
        }

        if(activeRowIdx === numGuessAreaColumns) {
            // activeRow is already full.
            return;
        }


        const newActiveRow = activeRow.slice();
        newActiveRow[activeRowIdx] = { ...boxStyleVariants.notEvaluated, letter: attrsOfKeyThatUserClicked.letter};
        setActiveRow(newActiveRow);
        setActiveIdx(activeRowIdx + 1);
        // console.log(JSON.stringify(activeRow));
    }

    const onClickHandler = (idx) => {

        console.log(`element at idx ${idx} was clicked. 
                     It contains ${JSON.stringify(allBoxes[idx])}`)
        if(idx > 4) return;
        const newActiveRow = activeRow.slice();
        newActiveRow[idx] = {
            backgroundColor: 'yellow',
            letter: activeRow[idx].letter
        }
        setActiveRow(newActiveRow);
    };

    const onKeyDownHandler = (event) => {
        const key = event.key;
        const globalActiveIdx = activeIdx + completedRows.length;
        console.log(`Handling key ${key} at index ${globalActiveIdx}`);
        if (activeIdx < numGuessAreaColumns) {
            if (key.match(/^([a-z]|[A-Z])$/)) {
                const newActiveRow = activeRow.slice();
                newActiveRow[activeIdx] = {
                    color: 'grey',
                    letter: key
                }
                setActiveRow(newActiveRow);
                setActiveIdx(activeIdx < numGuessAreaColumns - 1 ? activeIdx + 1 : activeIdx);
                console.log(`Index is now ${globalActiveIdx + 1}`);
                return;
            }
        }
        if (activeIdx >= 0) {
            if (key.match(/(Backspace)|(Delete)/)) {
                const newActiveRow = activeRow.slice();
                newActiveRow[activeIdx] = {
                    color: 'white',
                    letter: ' '
                }
                setActiveRow(newActiveRow);
                setActiveIdx(activeIdx > 0 ? activeIdx - 1 : 0);
                console.log(`Index is now ${globalActiveIdx}`);
                return;
            }
        }
        if (key.match(/(Enter)/)) {
            if ((globalActiveIdx + 1) % numGuessAreaColumns === 0) {
                setCompletedRows(completedRows
                    .concat(activeRow.slice()
                        .map(val => { return { color: 'green', letter: val.letter };}))
                );
                setActiveRow(allBoxes.slice(globalActiveIdx + 1, globalActiveIdx + numGuessAreaColumns + 1));
                setRemainingRows(allBoxes.slice(globalActiveIdx + numGuessAreaColumns + 1, allBoxes.length));
                setActiveIdx(0);
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
          sx={{
              height: 600,
              width: 500,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-top ',
          }}
      >
          <TopBanner />
          <GuessArea allBoxes={allBoxes}
                     onClickHandler={idx => onClickHandler(idx)}
                     onKeyDownHandler={event => onKeyDownHandler(event)}
                     onBlurHandler={event => onBlurHandler(event)}
                     inputRef={inputRef}
          />
          <MessageCenter/>
          <Keyboard keyboard={initialKeyBoard()} demoNumKeys={demoNumKeys} onClickCallback={keyboardKeyPressedCallBack} />
      </Box>
    </Fragment>
  );
}

export default App;
