import {Fragment, useState} from "react";

import Keyboard from "../../../Downloads/wordle/wordle/src/pages/Keyboard";
import GuessArea from "../../../Downloads/wordle/wordle/src/pages/GuessArea";
import TopBanner from "../../../Downloads/wordle/wordle/src/pages/TopBanner";
import {Box} from "@mui/material";

import dim from "../../../Downloads/wordle/wordle/src/utils/dimensions";



function App() {

    const completedRows = [];

    const [activeRow, setActiveRow] = useState(new Array(dim.numGCols).fill({
        backgroundColor: 'white'
    }));

    const remainingRows = new Array((dim.numGRows - 1) * dim.numGCols)
        .fill({
            backgroundColor: 'white'
        })

    const allRows = [...completedRows, ...activeRow, ...remainingRows];

    const onClickHandler = (idx) => {

        console.log(`element at idx ${idx} was clicked. 
                     It contains ${JSON.stringify(allRows[idx])}`)
        if(idx > 5)
            return;
        const newActiveRow = activeRow.slice();
        newActiveRow[idx] = {
            backgroundColor: 'yellow'
        }
        setActiveRow(newActiveRow);
        // allRows.forEach(cell => console.log(JSON.stringify(cell)));
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
                 onClickHandler={(idx) => onClickHandler(idx)}
      />
      <Keyboard />
      </Box>
    </Fragment>
  );
}

export default App;
