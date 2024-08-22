import { useDispatch } from "react-redux";
import { logoutApp } from "../modules/auth/redux/authSlice";

import Button from '@mui/material/Button';

export default function Home() {

  const dispatch = useDispatch();
   
  const logOut = () => {
    dispatch(logoutApp())
  }

  return (
    <>
     <Button variant="contained" onClick={logOut}>LogOut</Button>
    </>
  );
}
