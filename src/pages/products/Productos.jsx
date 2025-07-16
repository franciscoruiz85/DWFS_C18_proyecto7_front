import { useContext, useEffect } from 'react'
import ProductContext from '../../contexts/product/ProductContext'
import { Link } from 'react-router-dom'
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@mui/material'

const Products = () => {
  const ctx = useContext(ProductContext);
  const { products, getProducts } = ctx;

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        { products.length === 0 ? (
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
            products.map(item => {
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
  )
}

export default Products
