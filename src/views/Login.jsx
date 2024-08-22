import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
  } from "@mui/icons-material";

  import { LoadingButton } from "@mui/lab";
  import { Box, Paper, FormControl, TextField, IconButton, InputAdornment, Typography, Grid, Link, AppBar, Toolbar } from "@mui/material";
  import PersonIcon from '@mui/icons-material/Person';
  import LockIcon from '@mui/icons-material/Lock';

  import { authenticate } from "../modules/auth/redux/authSlice";

  export default function Login() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [displayPassword, setDisplayPassword] = useState(false);

    const { control, handleSubmit } = useForm({
      mode: "onSubmit",
      reValidateMode: "onChange",
      defaultValues: { user: "", pass: "" },
    });

    const onSubmit = (data, e) => {
      e.preventDefault();
      e.stopPropagation();
  
      dispatch(authenticate({ user: data.user, pass: data.pass })).then(result => {
        const { msj, code } = result.payload;
        
        console.log("LC_log", result, msj, code);
        // if( code !== 200)
        //   setMsj(message);
        // else
        //   setShowInputCode(true)
      });
    };

    return (
      <Grid container justifyContent="center" alignItems="center" height="100vh">
        <Grid item xs={5} >
          <Box>
            <AppBar position="relative" color="primary">
              <Toolbar>
                <Typography variant="h6">
                  Iniciar Sesión
                </Typography>
              </Toolbar>
            </AppBar>
            
              <Paper elevation={12} >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth>
                    <Box sx={{ p:2, display: 'flex', alignItems: 'flex-end' }}>
                      <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <Controller
                        name="user"
                        control={control}
                        rules={{
                          required: "Este campo es requerido",
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField 
                          {...field}
                          id="input-with-sx" 
                          label="Usuario" 
                          variant="standard"
                          helperText={error && error?.message}
                          error={!!error} 
                          fullWidth/>
                        )}
                        />
                    </Box>
                    <Box sx={{ p:2, display: 'flex', alignItems: 'flex-end' }}>
                      <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                      <Controller
                        name="pass"
                        control={control}
                        rules={{
                          required: "Este campo es requerido",
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField 
                          {...field} 
                          id="input-with-sx" 
                          label="Contraseña" 
                          variant="standard" 
                          helperText={error && error?.message}
                          error={!!error}
                          type={displayPassword ? "text" : "password"}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <Box mr={1}>
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        setDisplayPassword((prev) => !prev)
                                      }
                                      edge="end"
                                    >
                                      {displayPassword ? (
                                        <VisibilityOffIcon />
                                      ) : (
                                        <VisibilityIcon />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                </Box>
                              ),
                            }}
                          />
                        )}
                      />
                    </Box>
                    <Grid container gap={2} justifyContent="flex-end">
                      <Grid item>
                        <Box sx={{ p:2 }}>
                          <LoadingButton
                          size="medium"
                          variant="contained"
                          type="submit"
                          loading={auth.isFetching}
                          fullWidth
                          color="success"
                          //onClick={()=>login()}
                          // onClick={() => {
                          //   window.location.replace("/main");
                          // }}
                        >
                          Iniciar Sesión
                        </LoadingButton>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={0} justifyContent="center">
                      <Grid item>
                        <Box sx={{ pt:4, pb:4 }}>
                          <Typography variant="body2" align="center">
                            <Link href="/forgot-password" color="primary">
                              Olvide mi Contraseña
                            </Link>
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </FormControl>
                </form>
              </Paper>
          </Box>
        </Grid>
      </Grid>
    );
  }