import {Fragment, useState} from "react";

import GuessArea from "./pages/GuessArea";
import Keyboard from "./pages/Keyboard"
import TopBanner from "./pages/TopBanner";
import {Box} from "@mui/material";

import dim from "./util/dimensions";



function App() {

    const letterMap =  {
        65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F', 71: 'G',
        72: 'H', 73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N',
        79: 'O', 80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T', 85: 'U',
        86: 'V', 87: 'W', 88: 'X', 89: 'Y', 90: 'Z', 8: ' ', 46: ' ', 13: ' '
    }
    const keyCodes = {
        //https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
        A: 65,
        Z: 90,
        backspace: 8,
        delete: 46,
        enter: 13
    }

    let activeIdx = 0; //index of the GuessArea GuessBox currently being typed into

    const completedRows = [];

    const [activeRow, setActiveRow] = useState(new Array(dim.numGCols).fill({
        bgcolor: 'white',
        code: keyCodes.backspace,
        char: letterMap[keyCodes.backspace]
    }));

    const remainingRows = new Array((dim.numGRows - 1) * dim.numGCols)
        .fill({
            bgcolor: 'white',
            code: keyCodes.backspace,
            char: letterMap[keyCodes.backspace]
        });

    const allRows = [...completedRows, ...activeRow, ...remainingRows];


    const onClickHandler = (idx) => {

        console.log(`element at idx ${idx} was clicked. 
                     It contains ${JSON.stringify(allRows[idx])}`)
        if(idx > 4) return;
        const newActiveRow = activeRow.slice();
        newActiveRow[idx] = {
            bgcolor: 'yellow',
            code: 1234,
            char: letterMap[keyCodes.backspace]
        }
        setActiveRow(newActiveRow);
    };

    const onKeyDownHandler = (code) => {
        console.log(`Handling key code ${code} at index ${activeIdx}`);
        const newActiveRow = activeRow.slice();
        if (activeIdx < activeRow.length) {
            if (code >= keyCodes.A && code <= keyCodes.Z) {
                newActiveRow[activeIdx] = {
                    bgcolor: 'grey',
                    code: code,
                    char: letterMap[code]
                }
                activeIdx += 1;
            }
        } if (activeIdx > 0) {
            if (code === keyCodes.backspace || code === keyCodes.delete) {
                newActiveRow[activeIdx] = {
                    bgcolor: 'white',
                    code: code,
                    char: letterMap[code]
                }
                activeIdx -= 1;
            }
        }
        setActiveRow(newActiveRow);
        console.log(`code is now ${code} and index is now ${activeIdx}`);
    }


    return (
    <Fragment>
      <Box
          margin="auto"
          sx={{
            height: dim.numGRows * dim.height + (dim.numGRows - 1) * dim.vGap + dim.topBannerHeight + dim.keyboardHeight,
            width: dim.numGCols * dim.width + (dim.numGCols - 1) * dim.hGap,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
      }}
      >
          <TopBanner />
          <GuessArea allRows={allRows}
                     onClickHandler={idx => onClickHandler(idx)}
                     onKeyDownHandler={code => onKeyDownHandler(code)}
          />
          <Keyboard />
      </Box>
    </Fragment>
  );
}

export default App;
