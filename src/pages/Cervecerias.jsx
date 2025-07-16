import React, { useState } from 'react'
import useMetaFiltered from '../hooks/useMetaFiltered'
import useFetch from '../hooks/useFetch'
import { Link, useLocation } from 'react-router-dom'
import {
  Container,
  CircularProgress,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Pagination,
  Stack,
  Breadcrumbs
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const Cervecerias = () => {
  /* Recibe los parametros pasados por el state */
  const location = useLocation()
  const country = location.state?.country
  const countryKey = location.state?.countryKey
  const type = location.state?.type
  const typeKey = location.state?.typeKey
  // console.log('state ', location.state)
  // console.log('country ', country)
  // console.log('type ', type)
  // console.log('countryKey ', countryKey)
  // console.log('typeKey ', typeKey)
  const breadcrumbs = [
    <Link
    underline="hover"
    key="1"
    color="inherit"
    to={"/paises"}
    >
      Paises
    </Link>,
    <Link
    underline="hover"
    key="2"
    color="inherit"
    to={`/paises/${country.replace(/\s+/g, '_')}`}
    state={{
      country: {
        key: countryKey,
        name: country
      }
    }}
    >
      { country }
    </Link>,
    <Typography
    key="3"
    sx={{ color: 'text.primary' }}
    >
      { type }
    </Typography>
  ]
  
  /* Buscar la cant de paginas que genera la consulta y trae la data con el hook */
  const meta = useMetaFiltered(countryKey, typeKey);
  // console.log('cant_pages ', meta.cant_pages)
  
  /* Variables, url de consulta y consulta que trae las cervecerías  */
  const vite_url = import.meta.env.VITE_BREWERYURL;
  const [update, setUpdate] = useState(false);
  const [pages, setPages] = useState(1);
  const url = `${vite_url}?by_country=${countryKey}&by_type=${typeKey}&per_page=50&page=${pages}&sort=type,name:asc`;
  // console.log(url)
  const { data, loading } = useFetch(url, update);
  // console.log('breweries ', data)

  if ( loading ) {
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
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <Pagination
          count={ meta.cant_pages }
          boundaryCount={2}
          page={ pages }
          onChange={(event, value) => {
            /* Revisa el cambio de página, lo muestra y recarga la busqueda */
            setPages(value)
            // console.log('pagina ',value)
            setUpdate(!update)
          }}
        />
      </Stack>
      {
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {data.map(item => (
            <Grid key={ item.id } >
              <Card sx={{
                minWidth: 250,
                maxWidth: 345
              }}>
                <CardActionArea
                  component={ Link }
                  to={ `/cervecerias/${country.replace(/\s+/g, '_')}/${type.replace(/\s+/g, '_')}/${item.name.replace(/\s+/g, '_')}` }
                  style={{
                    textDecoration: 'none', 
                    color: 'inherit'
                  }}
                  state={{
                    brewery: item,
                    country: country,
                    countryKey: countryKey,
                    type: type,
                    typeKey: typeKey
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h8"
                      sx={{ fontWeight: 'bold' }}
                    >
                      { item.name }
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body1"
                    >
                      { item.state }
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      }
    </Container>
  )
}

export default Cervecerias
