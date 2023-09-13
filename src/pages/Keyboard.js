import React, {Fragment} from 'react';
import Box from '@mui/material/Box';

import {
    keyboardBoxSizes,
    keyboardRowsHGap} from "../utils/sizes";

import boxStyleVariants from '../utils/keyboardAndGuessAreaBoxTypes';
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";

const KeyboardLetterBox = (props) => {

    const {keyAttributes, submittedLetters, theme} = props;

    // console.log(`keyboardBoxSizes ${JSON.stringify(keyAttributes)}`);

    return (
        <Box
            sx={{
            ...keyboardBoxSizes,
            border: 1,
            ...keyAttributes
        }}>
            <Typography ml={1} mb={1} p={0}
                        variant={keyAttributes.letter.length > 1 ? 'h7' : 'h5'}
                        sx={{ color: submittedLetters.includes(keyAttributes.letter)
                                ? theme.palette.secondary.dark
                                : keyAttributes.color }}>
                {keyAttributes.letter}
            </Typography>
        </Box>
    )
}

const Keyboard = (props) => {

    const {keyboard, onClickCallback, submittedLetters, theme} = props;
    const numColumns = keyboard[keyboard.reduce((maxIdx, ele, idx, arr) =>
        (ele.length > arr[maxIdx].length) ? idx : maxIdx, 0)]
        .length + 1;

    return (
        <Fragment>
            <Grid container
                  alignItems='center'
                  justifyContent='center'
                  spacing={0.1}
                  columns={numColumns}  // hard-coded value -- this is the number of demo keys
                  sx={{
                      width: numColumns * keyboardBoxSizes.width + (numColumns - 1) * keyboardRowsHGap + 200,
                  }}
            >
                {
                    keyboard.map(row => row.map((keyAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={keyAttributes.letter === '' ? false : 1}
                              sx={{mb: 1, p: 0}}
                              onClick={() => onClickCallback(keyAttributes)}
                        >
                            <KeyboardLetterBox keyAttributes={keyAttributes}
                                               submittedLetters={submittedLetters}
                                               theme={theme}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Fragment>
    )
}

export default Keyboard;