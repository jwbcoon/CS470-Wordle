import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import { Grid} from "@mui/material";

import {
    keyboardBoxSizes,
    keyboardRowsHGap} from "../utils/sizes";

import boxStyleVariants from '../utils/keyboardAndGuessAreaBoxTypes';

const KeyboardLetterBox = (props) => {

    const {keyAttributes} = props;

    // console.log(`keyboardBoxSizes ${JSON.stringify(keyAttributes)}`);

    return (
        <Box sx={{
            ...keyboardBoxSizes,
            border: 1,
            ...keyAttributes
        }}>
            {keyAttributes.letter}
        </Box>
    )
}

const Keyboard = (props) => {

    const {keyboard, onClickCallback} = props;
    const {demoNumKeys} = props;

    return (
        <Fragment>
            <Grid  container columns={keyboard.length}  // hard-coded value -- this is the number of demo keys
                   sx={{
                       width: demoNumKeys * keyboardBoxSizes.width + (demoNumKeys - 1) * keyboardRowsHGap + 200,
                   }}
            >
                {
                    keyboard.map((keyAttributes, idx) =>
                        <Grid item
                              key={idx}
                              xs={1}
                              sx={{mb: 1}}
                              onClick={() => onClickCallback(keyAttributes)}
                        >
                            <KeyboardLetterBox keyAttributes={keyAttributes}/>
                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default Keyboard;