import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/user/UserContext"
import { formatCLP } from "../../utils/formatCLP"
import {
  Container,
  Grid,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material"

export default function Checkout() {
  const userCtx = useContext(UserContext);
  const { cart, sessionURL, getCheckout, editCart } = userCtx;
  const [ total, setTotal ] = useState(0);
  const quantityOptions = [1 , 2, 3, 4, 5];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getCheckout();
  }
  
  useEffect(() => {
    if (sessionURL) window.location.href = sessionURL;
  }, [sessionURL]);

  useEffect(() => {
    const reduceTotalFromOrder = () => {
      return cart.reduce((acc, cv) => {
        const updatedAmount = cv.price * cv.quantity;
        return updatedAmount + acc;
      }, 0);
    }

    const getOrderDetail = () => {
      const total = reduceTotalFromOrder();
      setTotal(total);
    }

    getOrderDetail();
  }, [cart]);

  const handleChange = (e, currentPriceID) => {
    const updatedCart = cart.map((elt) => {
      return elt.priceID === currentPriceID ?
        {
          ...elt,
          quantity: parseInt(e.target.value)
        }
        : elt;
    });

    editCart(updatedCart);
  }

  const handleRemove = (e, currentPriceID) => {
    e.preventDefault();
    const updatedCart = cart.filter((elt) => {
      return elt.priceID !== currentPriceID;
    });

    editCart(updatedCart);
  };

  return (
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
          Carrito
        </Typography>
      </Grid>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(e) => {handleSubmit(e)}}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10px",
          marginBottom: "50px"
        }}
      >
        {cart.map((row) => {
          return (
            <>
              <Grid
                id="gridproducto"
                key={row.priceID}
                container
                spacing={5}
                gap={20}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px"
                }}
              >
                <Grid
                  size={{ md: 3 }}
                  sx={{
                    display:"flex",
                    justifyContent:"center"
                  }}
                >
                  <img id="imgprodcheck" src={row.image} />
                </Grid>
                <Grid size={{ md: 3 }} >
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: "20px" }}
                  >
                    {row.productname}
                  </Typography>
                  <Typography
                    variant="h6"
                  >
                    {formatCLP(row.price)}
                  </Typography>
                </Grid>
                <Grid size={{ md: 2 }}>
                  <InputLabel id="quantity">Cantidad</InputLabel>
                  <Select
                    labelId="quantity"
                    id="quantity"
                    label="quantity"
                    value={row.quantity}
                    key={row.priceID}
                    onChange={(e) => {
                      handleChange(e, row.priceID)
                    }}
                    fullWidth
                  >
                    { quantityOptions.map((option) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                  <Button
                    type="submit"
                    disabled={row.quantity === 0}
                    sx={{
                      textDecoration: "none",
                      marginTop: "10px"
                    }}
                    onClick={(evt) => {
                      handleRemove(evt, row.priceID)
                    }}
                  >
                    Eliminar
                  </Button>
                </Grid>
                <Grid size={{ md: 2 }} >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ marginBottom: "10px" }}
                  >
                    {formatCLP(row.price * row.quantity)}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )
        })}
        <Grid
          id="total"
          container
          spacing={1}
          sx={{
            backgroundColor: "#FDEFD7",
            justifyContent: "space-between",
            padding: "20px 50px"
          }}
        >
          <Grid>
            <Typography
              variant="h5"
              sx={{fontWeight: "bold"}}
            >
              TOTAL
            </Typography>
          </Grid>
          <Grid>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold"
              }}
            >
              {formatCLP(total)}
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={total === 0}
          sx={{
            marginTop: "20px",
            padding:"20px"
          }}
        >
          Finalizar compra 
        </Button>
      </Box>
    </Container>
  )
}
