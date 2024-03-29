import {Grid} from "@mui/material";
import {Box} from "@mui/material";
import {forwardRef, Fragment} from "react";
import {
    guessBoxSizes,
    numGuessAreaColumns,
    guessRowsHGap} from "../utils/sizes";

import Typography from "@mui/material/Typography";


const GuessInput = forwardRef((props, ref) => {

    const {onKeyDownHandler, onBlurHandler} = props;

    return (
        <input
        autoFocus={true}
        style={{
            position: 'absolute',
            top: '-9999px',
            left: '-9999px',
        }}
        onKeyDown={code => onKeyDownHandler(code)}
        onBlur={event => onBlurHandler(event)}
        ref={ref}
    />
    );
});

const LetterBox = (props) => {

    const {boxAttributes} = props;

    return (
        <Box sx={{
            ...guessBoxSizes,
            border: 1,
            ...boxAttributes,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Typography  variant='h4' sx={{fontWeight: 'bold', color: boxAttributes.color }}>
                {boxAttributes.letter ? boxAttributes.letter : ''}
            </Typography>
        </Box>
    )
}


const GuessArea = (props) => {

    const {allBoxes, onKeyDownHandler, onBlurHandler, inputRef} = props;

    return (
        <Fragment>
            <GuessInput onKeyDownHandler={onKeyDownHandler} onBlurHandler={onBlurHandler} ref={inputRef}/>
            <Grid container
                  rowSpacing={0.5}
                  columns={numGuessAreaColumns}
                  sx={{
                      width: numGuessAreaColumns * guessBoxSizes.width + (numGuessAreaColumns - 1) * guessRowsHGap,
                  }}
                  paddingTop={2}
                  paddingBottom={2}
            >
                {
                    allBoxes.map((elementAttributes, idx) =>
                        <Grid item xs={1}
                              key={idx}
                              sx={{
                                  m: 0,
                                  p: 0
                        }}>
                            <LetterBox boxAttributes={elementAttributes}/>
                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default GuessArea;