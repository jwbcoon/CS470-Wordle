import {Grid} from "@mui/material";
import {Box} from "@mui/material";
import {Fragment} from "react";
import dim from "../util/dimensions";

const GuessBox = (props) => {

    const {backgroundColor} = props;
    const {char} = props;

    return (
        <Box
            sx={{
                width: dim.width,
                height: dim.height,
                backgroundColor: backgroundColor,
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

    const {allRows} = props;
    const {onClickHandler} = props;

    return (
        <Fragment>
            <Grid container columns={5}>
                {
                    allRows.map((box, idx) =>
                        <Grid item xs={1}
                              key={idx}
                              onClick={() => onClickHandler(idx)}
                              sx={{
                                  m: 0,
                                  p: 0
                        }}>
                            <GuessBox backgroundColor={box} char={box.char}/>
                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default GuessArea;