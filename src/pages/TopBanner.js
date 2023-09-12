import Typography from "@mui/material/Typography";
import {Fragment} from "react";
import {AppBar, Box} from "@mui/material";

const TopBanner = (props) => {
    const {theme} = props;
    return (
        <Fragment>
            <Box sx={{
                height: 200,
                display: 'flex',
                alignContents: 'center',
                backgroundColor: theme.palette.primary.main,
            }}>
                <AppBar>
                    <Typography variant='h4' textAlign='center' color={theme.palette.primary.contrastText}>
                        Wordle by Joe Coon
                    </Typography>
                </AppBar>
            </Box>
        </Fragment>
    )
}

export default TopBanner;
