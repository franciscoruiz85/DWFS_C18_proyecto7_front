import { Link, useLocation } from "react-router-dom"
import {
  Container,
  Grid,
  Typography,
  Stack,
  Breadcrumbs
} from "@mui/material"
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const Cerveceria = () => {
  const location = useLocation()
  const brewery = location.state?.brewery
  const country = location.state?.country
  const countryKey = location.state?.countryKey
  const type = location.state?.type
  const typeKey = location.state?.typeKey
  // console.log(location.state)

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      to={ "/paises" }
    >
      Paises
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      to={ `/paises/${country.replace(/\s+/g, '_')}` }
      state={{
        country: {
          key: countryKey,
          name: country
        }
      }}
    >
      { country }
    </Link>,
    <Link
      underline="hover"
      key="3"
      color="inherit"
      to={ `/cervecerias/${country.replace(/\s+/g, '_')}/${type.replace(/\s+/g, '_')}` }
      state={{
          country: country,
          countryKey: countryKey,
          type: type,
          typeKey: typeKey
      }}
    >
      { type }
    </Link>,
    <Typography
      key="4"
      sx={{ color: 'text.primary' }}
    >
      { brewery.name }
    </Typography>
  ]

  return (
    <Container>
      <Stack
        spacing={2}
        sx={{ marginBottom: 2 }}
      >
        <Breadcrumbs
          className="Breadcrumbs"
          separator={
            <NavigateNextIcon
            fontSize="small"
          />}
          aria-label="breadcrumb"
        >
          { breadcrumbs }
        </Breadcrumbs>
      </Stack>
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
          Cervecería { brewery.name }
        </Typography>
      </Grid>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginBottom: '20px' }}
      >
        Pais: { country }
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginBottom: '20px' }}
      >
        Provincia: { brewery.state }
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginBottom: '20px' }}
      >
        Ciudad: { brewery.city }
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginBottom: '20px' }}
      >
        Tipo: { type }
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginBottom: '20px' }}
      >
        Ubicación: { brewery.street === null ? 'Sin ubicación' :brewery.street }
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ marginBottom: '20px' }}
      >
        Sitio web:
        <Typography
          variant="h6"
          gutterBottom
          component={Link}
          to={ brewery.website_url }
          target="_blank"
          sx={{ paddingLeft: 1 }}
        >
          { brewery.name }
        </Typography>
      </Typography>
    </Container>
  )
}

export default Cerveceria
