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

const Login = () => {
  const navegate = useNavigate();
  const ctx = useContext(UserContext)
  const { loginUser } = ctx

  const [logUser, setLogUser] = useState({
    email: "",
    password: ""
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setLogUser({
      ...logUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = await loginUser(logUser);
    if (login) {
      setErrorMsg(login)
    } else {
      navegate("/");
    }
    return;
  };

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
          Iniciar Sesión
        </Typography>
        <Typography
          variant="6"
          sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          Aún no tienes tu cuenta?
          <Link
            to="/registro"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              marginLeft: "10px"
            }}
          >Regístrate</Link>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Iniciar Sesión
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

export default Login