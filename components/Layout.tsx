import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, red, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: teal[500],
    },
    secondary: {
      main: green["A200"],
    },
    error: {
      main: red[500],
    },
  },
});

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Container
      maxWidth="lg"
      sx={{ my: 4, ".Mui-selected": { fontWeight: 700 } }}
    >
      {children}
    </Container>
  </ThemeProvider>
);

export default Layout;
