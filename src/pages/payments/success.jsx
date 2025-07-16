import { useContext, useEffect } from 'react'
import UserContext from "../../contexts/user/UserContext"
import { Container, Alert, Typography } from '@mui/material'

const Success = () => {
  const userCtx = useContext(UserContext);
  const { clearCart } = userCtx;

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Container>
      <Alert
        severity="success"
        sx={{ marginTop:"50px" }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold"
          }}
        >
          Pago realizado correctamente, muchas gracias por preferirnos.
          Vuelva pronto.
        </Typography>
      </Alert>
    </Container>
  )
}

export default Success
