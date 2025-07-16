import { Container, Alert, Typography } from '@mui/material'

const cancel = () => {
  return (
    <Container>
      <Alert
        severity="error"
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
          Pago no pudo ser procesado, por favor intentelo nuevamente.
        </Typography>
      </Alert>
    </Container>
  )
}

export default cancel