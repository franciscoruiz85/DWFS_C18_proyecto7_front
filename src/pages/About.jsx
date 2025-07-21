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
          Proyecto de aplicativo web para el bootcamp DWFS de la UDD.
        </p>
        <p>
          Está inspirado en el gusto por la cerveza y artículos relacionados a esta.
        </p>
        <p>
          La información mostrada no es real solamente es con fines educativos.
        </p>
      </Typography>
    </Container>
  )
}

export default About
