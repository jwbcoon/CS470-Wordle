import Typography from "@mui/material/Typography";
import {Fragment} from "react";
import {AppBar, Box} from "@mui/material";

const TopBanner = () => {
    return (
        <Fragment>
            <Box sx={{
                height: 200,
                display: 'flex',
                alignContents: 'center',
                backgroundColor: 'primary',
                p: 10
            }}>
                <AppBar>
                    <Typography variant='h4' justifyContent='center'>
                        Wordle by Joe Coon
                    </Typography>
                </AppBar>
            </Box>
        </Fragment>
    )
}

export default TopBanner;
