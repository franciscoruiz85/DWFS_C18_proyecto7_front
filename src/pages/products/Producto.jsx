import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCLP } from "../../utils/formatCLP"
import UserContext from "../../contexts/user/UserContext"
import ProductContext from "../../contexts/product/ProductContext"
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

const Producto = () => {
  const navegate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const product = location.state?.product;
  
  const userCtx = useContext(UserContext);
  const { authStatus, cart, editCart } = userCtx;
  
  const { setCurrentProduct } = useContext(ProductContext);
  
  useEffect(() => {
    if (!product) {
      navegate('/productos')
      return
    }
    
    setCurrentProduct(product);
  }, [])

  const handleChange = (e) => {
    setQuantity(Number(e.target.value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (quantity === 0) return

    const item = {
      priceID: product.priceID,
      productname: product.productname,
      quantity,
      price: product.price,
      image: product.image,
      slug: product.slug
    };

    const existingItemIndex = cart.findIndex(
      (el) => el.priceID === item.priceID
    )

    let updatedCart;

    if (existingItemIndex !== -1) {
      updatedCart = cart.map((el, i) =>
        i === existingItemIndex ? { ...el, quantity: item.quantity } : el
      );
    } else {
      updatedCart = [ ...cart, item ];
    }

    await editCart(updatedCart);
  }

  if (!product) return null;
  const { productname, description, type, cc, image, price } = product;
  const quantityOptions = [1 , 2, 3, 4, 5];

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
          {productname}
        </Typography>
      </Grid>
      <Grid
        id="gridproducto"
        container
        spacing={2}
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img id="imgproducto" src={image} />
        </Grid>
        <Grid
          size={{ md: 6 }}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginBottom: "20px" }}
          >
            Tipo: {type}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginBottom: "20px" }}
          >
            Contenido: {cc} cc.
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginBottom: "20px" }}
          >
            Descripción: {description}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ marginBottom: "10px" }}
          >
            Precio: {formatCLP(price)}
          </Typography>
          { authStatus && (
            <Box
              component="form"
              autoComplete="off"
              onSubmit={(e) => {handleSubmit(e)}}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px"
              }}
            >
              <InputLabel id="quantity">Cantidad</InputLabel>
              <Select
                labelId="quantity"
                id="quantity"
                label="quantity"
                value={quantity}
                onChange={handleChange}
              >
                { quantityOptions.map((option) => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </Select>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={quantity === 0}
                sx={{
                  marginTop: "20px"
                }}
              >
                { cart.length ? "Modificar carrito" : "Agregar al carrito" }
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Producto;
