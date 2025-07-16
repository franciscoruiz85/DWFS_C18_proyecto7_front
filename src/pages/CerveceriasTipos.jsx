import {
  Container,
  Grid,
  CircularProgress,
  Typography
} from "@mui/material"
import useTipos from '../hooks/useTipos'


const CerveceriasTipos = () => {
  const { tipos, loading } = useTipos();
  
  if (loading) {
    return (
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold"
        }}
      >
        Tipos de Cervecerias
      </Typography>
      {tipos.map((item) => (
        <div 
          key={ item.key }
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px"
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold' }}
          >
            { item.name }:
          </Typography>
          <Typography variant="body1">
            { item.description }
          </Typography>
        </div>
      ))}
    </Container>
  )
}

export default CerveceriasTipos
