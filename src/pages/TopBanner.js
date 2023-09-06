import Typography from "@mui/material/Typography";
import {Fragment} from "react";
import {Box} from "@mui/material";

const TopBanner = () => {
    return (
        <Fragment>
            <Box sx={{
                height: 200,
                display: 'flex',
                alignContents: 'center'
            }}>
            <Typography variant='h4'>
                Top banner
            </Typography>
            </Box>
        </Fragment>
    )
}

export default TopBanner;
