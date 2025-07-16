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
        Discord:
        <Typography
          component={Link}
          to={'https://discord.gg/WMPB3VZ'}
          target="_blank"
          sx={{ paddingLeft: 1 }}
        >
          https://discord.gg/WMPB3VZ
        </Typography>
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginBottom: '20px' }}
      >
        E-mail: info@openbrewerydb.org
      </Typography>
    </Container>
  )
}

export default Contact
