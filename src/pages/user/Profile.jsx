import { useState, useContext, useEffect } from "react"
import UserContext from "../../contexts/user/UserContext"
import {
  Container,
  Typography,
  Box,
  InputLabel,
  Input,
  Button
} from "@mui/material"

export default function Profile() {
  const ctx = useContext(UserContext);
  const { updateUser } = ctx;

  const { username, address, phone } = ctx.currentUser;

  const [userForm, setUserForm] = useState({
    username: "",
    address: "",
    phone: ""
  });

  useEffect(() => {
    const updateData = () => {
      return setUserForm({
        ...userForm,
        username,
        address,
        phone
      })
    };

    updateData();
  }, []);

  const handleChange = async (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(userForm);
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
          Perfil
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
            value={userForm.username}
            onChange={(e) => {handleChange(e)}}
            placeholder="Juan Perez"
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <InputLabel htmlFor="address">Dirección</InputLabel>
          <Input
            id="address"
            name="address"
            type="text"
            value={userForm.address}
            onChange={(e) => {handleChange(e)}}
            placeholder="Av. Siempre viva 1999"
            sx={{
              marginBottom: "20px"
            }}
          >
          </Input>
          <InputLabel htmlFor="phone">Teléfono</InputLabel>
          <Input
            id="phone"
            name="phone"
            type="text"
            value={userForm.phone}
            onChange={(e) => {handleChange(e)}}
            placeholder="255555555"
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
            Actualizar
          </Button>
        </Box>
      </Container>
    </>
  )
}
