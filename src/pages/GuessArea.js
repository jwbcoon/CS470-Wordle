import {Grid} from "@mui/material";
import {Box} from "@mui/material";
import {Fragment} from "react";
import dim from "../util/dimensions";

const GuessBox = (props) => {

    const {bgcolor} = props;
    const {char} = props;

    return (
        <Box
            sx={{
                width: dim.width,
                height: dim.height,
                bgcolor: bgcolor,
                border: 1,
                m: 0.4,
                p: 0
            }}
        >
            {char}
        </Box>
    );
}

const GuessArea = (props) => {

    const {allBoxes} = props;
    const {onClickHandler} = props;
    const {onKeyDownHandler} = props;

    return (
        <Fragment>
            <input autoFocus={true} onChange={onKeyDownHandler}/>
            <Grid container columns={5}>
                {
                    allBoxes.map((box, idx) =>
                        <Grid item xs={1}
                              key={idx}
                              onClick={() => onClickHandler(idx)}
                              sx={{
                                  m: 0,
                                  p: 0
                        }}>
                            <GuessBox bgcolor={box} char={box.char}/>
                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default GuessArea;