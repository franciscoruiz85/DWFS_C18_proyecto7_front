import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

const Footer = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: -1,
        backgroundColor: "#FDEFD7",
        color: "#000"
      }}>
      <Typography
        noWrap
        component="div" 
        sx={{
          display: { xs: "flex", sm: "none" },
          width: 'auto',
          justifyContent: 'center',
          paddingTop: '1rem',
          fontSize: '1.2rem'
        }}
      >
        &copy; 2025
      </Typography>
      <Typography
        noWrap
        component="div" 
        sx={{
          display: { xs: "flex", sm: "none" },
          width: 'auto',
          justifyContent: 'center',
          paddingBottom: '1rem',
          fontSize: '1.2rem'
        }}
      >
        Tienda especializada de Cervezas
      </Typography>
      <Typography
        noWrap
        component="div" 
        sx={{
          display: { xs: "none", sm: "flex" },
          width: 'auto',
          justifyContent: 'center',
          padding: '1rem',
          fontSize: '1.2rem'
        }}
      >
        &copy; 2025 Tienda especializada de Cervezas
      </Typography>
    </AppBar>
  )
}

export default Footer