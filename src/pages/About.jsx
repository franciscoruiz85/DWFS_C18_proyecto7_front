import React from 'react'
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography
} from '@mui/material'

const About = () => {
  return (
    <Container>
      <Grid
        container
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px'
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          Nosotros
        </Typography>
      </Grid>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginBottom: '20px' }}
      >
        <p>
          Proyecto sin fines de lucro sobre cervecerías.
        </p>
        <p>
          Los datos pueden ser accesados directamente en <Link to='https://www.openbrewerydb.org/' target="_blank">Open Brewery DB</Link>.
        </p>
        <p>
          La información mostrada corresponde a datos entregados y actualizados desinteresadamente por diferentes personas.
        </p>
        <p>
          Si desea hacer algún aporte revise nuestra sección <b>"Contacto"</b>.
        </p>
      </Typography>
    </Container>
  )
}

export default About
