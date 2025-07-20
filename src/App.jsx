import { useContext, useEffect } from 'react'
import ProductContext from './contexts/product/ProductContext'
import { Link } from 'react-router-dom'
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@mui/material'

function App() {
  const ctx = useContext(ProductContext);
  const { bestProducts, getBestProducts } = ctx;
  
  useEffect(() => {
    getBestProducts();
  }, []);

  return (
    <>
      <Container>
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Los más vendidos
          </Typography>
        </Grid>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          { bestProducts.length === 0 ? (
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  marginTop: '40px',
                  fontWeight: 'bold'
                }}
              >
                No hay productos disponibles
              </Typography>
            ) : (
              bestProducts.map(item => {
                return(
                  <Grid key={ item._id }>
                    <Card sx={{
                      minWidth: 300,
                      maxWidth: 345
                    }}>
                      <CardActionArea
                        component={ Link }
                        to={ `/producto/${item.slug}` }
                        style={{
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                        state={{
                          product: item
                        }}
                      >
                        <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                          }}
                        >
                          <Grid
                            sx={{
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <img id="imgproductos" src={item.image} />
                          </Grid>
                          <Typography
                            gutterBottom
                            variant="h5"
                          >
                            { item.productname }
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="h7"
                          >
                            { item.type }
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
              })
            ) 
          }
        </Grid>
      </Container>
    </>
  )
}

export default App
