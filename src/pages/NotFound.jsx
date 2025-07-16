import { Container, Alert, Typography } from '@mui/material'

const NotFound = () => {
  return (
    <Container>
      <Alert
        severity="warning"
        sx={{ marginTop:"50px" }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          404 página no encontrada.
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold" }}
        >
          Vuelva al home para seguir navegando en HOPY HOUR.
        </Typography>
      </Alert>
    </Container>
  )
}

export default NotFound
