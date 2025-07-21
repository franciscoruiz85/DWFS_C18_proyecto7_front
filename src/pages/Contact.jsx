import React from 'react'
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography
} from '@mui/material'

const Contact = () => {
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
          Contacto
        </Typography>
      </Grid>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginBottom: '20px' }}
      >
        Sitio para proyecto del bootcamp DWFS de la UDD.
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginBottom: '20px' }}
      >
        No poseemos datos de contacto por el momento.
      </Typography>
    </Container>
  )
}

export default Contact
