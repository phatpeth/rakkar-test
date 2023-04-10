import { Container } from "@mui/material";

const Layout = ({ children }) => (
  <Container maxWidth="lg" sx={{ my: 4 }}>
    {children}
  </Container>
);

export default Layout;
