import { useContext, useState } from "react"
import ProductContext from "../../contexts/product/ProductContext"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  InputLabel,
  Input,
  Button
} from "@mui/material"

const NewProduct = () => {
  const navegate = useNavigate();
  const prodCtx = useContext(ProductContext);
  const { addProduct } = prodCtx;

  const [newProduct, setNewProdct] = useState({
    slug: "",
    productname: "",
    type: "",
    cc: "",
    price: "",
    currency: "CLP",
    description: "",
    image: ""
  })

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setNewProdct({
      ...newProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    setErrorMsg("");
    e.preventDefault();
    const isRegistered = await addProduct(newProduct);
    if (isRegistered.status == 500) {
      setErrorMsg("Ha ocurrido un error al registrar el producto");
    } else {
      navegate("/admin-productos");
    }
  }

  return (
    <>
      <Container>
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold"
          }}
        >
          Agregar producto
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={(e) => {handleSubmit(e)}}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "70px",
            marginBottom: "70px"
          }}
        >
          <InputLabel htmlFor="slug">Nombre referencial</InputLabel>
          <Input
            id="slug"
            name="slug"
            type="text"
            multiline
            onChange={(e) => {handleChange(e)}}
            placeholder="Cerverza_Gluden_Draak_Classic_330cc"
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <InputLabel htmlFor="productname">Producto</InputLabel>
          <Input
            id="productname"
            name="productname"
            type="text"
            onChange={(e) => {handleChange(e)}}
            placeholder="Cerveza Gulden Draak Classic"
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <InputLabel htmlFor="description">Descripción del producto</InputLabel>
          <Input
            id="description"
            name="description"
            type="text"
            multiline
            minRows={2}
            onChange={(e) => {handleChange(e)}}
            placeholder="Gulden Draak Classic es una cerveza oscura, triple, de alta fermentación. Con cremosa espuma, aroma de alcohol, malta quemada y café. Con un sabor complejo de notas de caramelo, malta tostada y café. Regusto agridulce y muy largo. 10,5° Alc."
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <InputLabel htmlFor="type">Tipo producto</InputLabel>
          <Input
            id="type"
            name="type"
            type="text"
            onChange={(e) => {handleChange(e)}}
            placeholder="Cerveza, Vaso"
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <InputLabel htmlFor="cc">Cantidad / capacidad (cc)</InputLabel>
          <Input
            id="cc"
            name="cc"
            type="number"
            onChange={(e) => {handleChange(e)}}
            placeholder="330, 750, 1000"
            inputProps={{ min: 100 }}
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <InputLabel htmlFor="price">Precio</InputLabel>
          <Input
            id="price"
            name="price"
            type="number"
            onChange={(e) => {handleChange(e)}}
            placeholder="330, 750, 1000"
            inputProps={{ min: 100 }}
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <InputLabel htmlFor="image">URL imagen producto</InputLabel>
          <Input
            id="image"
            name="image"
            type="text"
            multiline
            onChange={(e) => {handleChange(e)}}
            placeholder="https://imagenes.com/image"
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#115293"
              }
            }}
          >
            Registrar
          </Button>
          <Typography
            variant="body1"
            color="error"
            sx={{
              display: "flex",
              justifyContent: "center", 
              marginTop: "20px",
              fontWeight: "bold"
            }}
          >
            {errorMsg}
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default NewProduct
