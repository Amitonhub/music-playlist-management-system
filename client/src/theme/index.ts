import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1DB954",
        },
        background: {
            default: "#121212",
            paper: "#181818",
        },
    },
    typography: {
        fontFamily: '"Segoe UI"',
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: '"Segoe UI"',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputLabel-root": {
                        color: "#fff !important",
                    },
                    "& .MuiFilledInput-root": {
                        color: "#fff",
                        backgroundColor: "#181818",
                        "&::before": {
                            borderBottom: "1px solid #fff",
                        },
                        "& input::placeholder": {
                            color: "#fff",
                            opacity: 1,
                        },
                    },
                },
            },
        },
    },
});

export default theme;
