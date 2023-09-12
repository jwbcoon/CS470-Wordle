import {green, grey, orange} from '@mui/material/colors';
import {createTheme} from "@mui/material";



const theme = createTheme({
    palette: {
        primary: {
            main: '#4e7598',
            light: '#265f8a',
            dark: '#0e3251',
            contrastText: '#fee8cb'
        },
        secondary: {
            main: '#f1a776',
            light: '#f9c9ab',
            dark: '#d534ba',
            contrastText: '#f9abe8'
        }
    }
});

const boxStyleVariants = {
    exactMatch: {
        backgroundColor: green[400],
        color: grey[50],
        borderColor: green[400]
    },

    partialMatch: {
        backgroundColor: orange[200],
        color: grey[50],
        borderColor: orange[200]

    },

    noMatch: {
        backgroundColor: grey[500],
        color: grey[50],
        borderColor: grey[500]
    },

    blankBox: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.light,
        borderColor: grey[400]
    },

    notEvaluated: {
        backgroundColor: grey[50],
        color: grey[900],
        borderColor: grey[400]
    },

    keyboardUnusedKey: {
        backgroundColor: '#bfc1c2',
        color: grey[900],
        borderColor: grey['A100'],
    }
};

export {
    boxStyleVariants, theme
};