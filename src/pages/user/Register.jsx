import { useContext, useState } from "react"
import UserContext from "../../contexts/user/UserContext"
import { Link, useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  InputLabel,
  Input,
  Button
} from "@mui/material"

const Register = () => {
  const navegate = useNavigate();
  const ctx = useContext(UserContext);
  const { registerUser } = ctx;

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      return setErrorMsg("Contraseñas no coinciden");
    }
    const isRegistered = await registerUser(newUser);
    if (!isRegistered) {
      setErrorMsg("Error en el registro o usuario ya existe");
    } else {
      navegate("/inicio-sesion");
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
          Crear cuenta
        </Typography>
        <Typography
          variant="6"
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          Ya tienes tu cuenta?
          <Link
            to="/inicio-sesion"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              marginLeft: "10px"
            }}
          >Inicia Sesión</Link>
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={(e) => {handleSubmit(e)}}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "70px"
          }}
        >
          <InputLabel htmlFor="username">Nombre usuario</InputLabel>
          <Input
            id="username"
            name="username"
            type="text"
            onChange={(e) => {handleChange(e)}}
            placeholder="Juan Perez"
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={(e) => {handleChange(e)}}
            placeholder="correo@email.com"
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <InputLabel htmlFor="password">Contraseña</InputLabel>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={(e) => {handleChange(e)}}
            placeholder="********"
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <InputLabel htmlFor="confirmPassword">Confirmar Contraseña</InputLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={(e) => {handleChange(e)}}
            placeholder="********"
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

export default Register
