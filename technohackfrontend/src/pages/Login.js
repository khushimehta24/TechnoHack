import { Button, Grid } from '@mui/material'
import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import logo from '../images/logo2.png'
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

const pages = ['News', 'Nearby safe spots'];

const Login = () => {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [list, setList] = useState({ number: '', password: '' });
  const [first_name, setFirstName] = useState('');
  const [personCreds, setPersonCreds] = useState({})

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setList({ ...list, [name]: value })
  }

  const handleSubmit = (e) => {
    if (list.number && list.password) {
      var myHeaders = new Headers();

      var formdata = new FormData();
      formdata.append("phone_no", list.number);
      formdata.append("password", list.password);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://safestree.herokuapp.com/api/login/", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result.first_name);
          if (result.first_name) {
            setFirstName(result.first_name)
            navigate('/dashboard')
            setPersonCreds({ first_name, ...list })
          }
          else {
            navigate('/login')
            alert('Invalid Credentials')
          }
        })
        .catch(error => console.log('error', error));
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <AppBar position="static" sx={{ position: 'absolute', zIndex: '10', backgroundColor: 'transparent', padding: '25px', boxShadow: 'none' }}>
        <Container maxWidth="xl" sx={{ backgroundColor: 'transparent' }}>
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <img src={logo} style={{ mr: 2, display: { xs: 'none', md: 'flex' } }}></img>
            </Typography>


            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <img src={logo} style={{ mr: 2, display: { xs: 'none', md: 'flex' } }}></img>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Grid container style={{ padding: '15px', width: '100vw', height: '100vh', position: 'relative' }}>
        <Grid item style={{ background: 'linear-gradient(149.06deg, #E02768 5.36%, #C71C7A 85.52%)', width: '100%', height: '100%', borderRadius: '7px' }}>
          <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
            <Grid container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#F1F1F1', width: '50vw', padding: '2%', borderRadius: '3.5px', marginTop: '5%' }}>
              <Grid item style={{ fontWeight: 'bold', marginBottom: '3%', fontSize: '1.5em', color: '#E02768' }}>Login</Grid>
              <Grid item style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container spacing={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%' }}>
                  <Grid item style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', rowGap: '1.5rem' }}>
                    <Grid container spacing={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', flexDirection: 'column' }}>
                      <Grid item style={{ width: '100%' }}>
                        <TextField required label="Phone Number" id='number' name='number' value={list.number} autoFocus style={{ width: '100%' }} onChange={handleChange} />
                      </Grid>
                      <Grid item style={{ width: '100%' }}>
                        <TextField type='password' required label="Password" id='password' name='password' value={list.password} autoFocus style={{ width: '100%' }} onChange={handleChange} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <p style={{ textAlign: 'center', fontSize: '0.89rem', color: '#1F2128' }}>Don't have an account? <span style={{ cursor: 'pointer', color: '#E02768', fontWeight: 'bold' }} onClick={() => navigate('/signup')}>Sign Up</span></p>
              </Grid>
              <Grid item style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Link to={'/contactlist'} style={{ width: '50%', marginTop: '2%', background: 'linear-gradient(149.06deg, #E02768 5.36%, #C71C7A 85.52%)', color: 'white', fontWeight: '600', width: '100%', fontSize: '1.1em', display: 'flex', justifyContent: 'center', alignItems: 'center' }} state={personCreds} onClick={handleSubmit}>Sign In</Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Login