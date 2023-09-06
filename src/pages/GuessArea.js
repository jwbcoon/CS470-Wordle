import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import {Box} from "@mui/material";
import {Fragment} from "react";

import dim from "../../../../Downloads/wordle/wordle/src/utils/dimensions";

const GuessBox = (props) => {

    const {backgroundColor} = props.cellContent;

    return (
        <Box
            sx={{
                width: dim.width,
                height: dim.height,
                backgroundColor: backgroundColor,
                border: 1,
                m: 0.4,
                padding: 0
            }}
        >

        </Box>
    )
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
                              sx={
                            {margin: 0, padding: 0}
                        }>
                            <GuessBox cellContent={box} />
                        </Grid>
                    )
                }
            </Grid>
        </Fragment>
    )
}

export default GuessArea;