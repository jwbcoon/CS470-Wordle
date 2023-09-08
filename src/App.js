import {Fragment, useState, useRef} from "react";

import GuessArea from "./pages/GuessArea";
import Keyboard from "./pages/Keyboard"
import TopBanner from "./pages/TopBanner";
import {Box} from "@mui/material";

import dim from "./util/dimensions";



function App() {

    const inputRef = useRef(null);

    const [activeIdx, setActiveIdx] = useState(0); //index of the GuessArea GuessBox currently being typed into

    const completedRows = [];

    const [activeRow, setActiveRow] = useState(new Array(dim.numGCols).fill({
        backgroundColor: 'white',
        char: ' '
    }));

    const remainingRows = new Array((dim.numGRows - 1) * dim.numGCols)
        .fill({
            backgroundColor: 'white',
            char: ' '
        });

    const allRows = [...completedRows, ...activeRow, ...remainingRows];


    const onClickHandler = (idx) => {

        console.log(`element at idx ${idx} was clicked. 
                     It contains ${JSON.stringify(allRows[idx])}`)
        if(idx > 4) return;
        const newActiveRow = activeRow.slice();
        newActiveRow[idx] = {
            backgroundColor: 'yellow',
            char: activeRow[idx].char
        }
        setActiveRow(newActiveRow);
    };

    const onKeyDownHandler = (event) => {
        const key = event.key;
        console.log(`Handling key ${key} at index ${activeIdx}`);
        if (activeIdx < activeRow.length) {
            if (key.match(/^([a-z]|[A-Z])$/)) {
                const newActiveRow = activeRow.slice();
                newActiveRow[activeIdx] = {
                    backgroundColor: 'grey',
                    char: key
                }
                setActiveRow(newActiveRow);
                setActiveIdx(activeIdx < activeRow.length - 1 ? activeIdx + 1 : activeIdx);
                console.log(`Index is now ${activeIdx + 1}`);
                return;
            }
        }
        if (activeIdx >= 0) {
            if (key.match(/(Backspace)|(Delete)/)) {
                const newActiveRow = activeRow.slice();
                newActiveRow[activeIdx] = {
                    backgroundColor: 'white',
                    char: ' '
                }
                setActiveRow(newActiveRow);
                setActiveIdx(activeIdx > 0 ? activeIdx - 1 : 0);
                console.log(`Index is now ${activeIdx}`);
                return;
            }
        }
        if (key.match(/(Enter)/)) {

        }
    }

    const onBlurHandler = event => {
        console.log('Blur Event! Returning focus...');
        inputRef.current.focus();
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
                     onKeyDownHandler={event => onKeyDownHandler(event)}
                     onBlurHandler={event => onBlurHandler(event)}
                     inputRef={inputRef}
          />
          <Keyboard />
      </Box>
    </Fragment>
  );
}

export default App;
