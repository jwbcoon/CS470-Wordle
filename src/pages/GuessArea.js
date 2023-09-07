import {Grid} from "@mui/material";
import {Box} from "@mui/material";
import {Fragment} from "react";
import dim from "../util/dimensions";

const GuessBox = (props) => {

    const {bgcolor} = props;

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
        </Box>
    );
}

const GuessArea = (props) => {

    const {allRows} = props;
    const {onClickHandler} = props;
    const {onKeyDownHandler} = props;

    return (
        <Fragment>
            <Grid container columns={5}>
                {
                    allRows.map((box, idx) =>
                        <Grid item xs={1}
                              key={idx}
                              onClick={() => onClickHandler(idx)}
                              onKeyDown={() => onKeyDownHandler(box.code)}
                              sx={{
                                  m: 0,
                                  p: 0
                        }}>
                            <GuessBox bgcolor={box}>{box.char}</GuessBox>
                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default GuessArea;