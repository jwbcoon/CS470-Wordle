import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';

const MessageCenter = (props) => {
    const {message, theme} = props;

    return (
        <Fragment>
            <Typography variant='h5' textAlign='center' color={theme.palette.primary.contrastText}>
                {message}
            </Typography>
        </Fragment>
    )
}

export default MessageCenter;