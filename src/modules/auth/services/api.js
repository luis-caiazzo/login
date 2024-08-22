import axios from "axios";
const path = import.meta.env.VITE_API_URL;
const storage_token_key = "epa151617";

function setToken(data) {
  sessionStorage.setItem(storage_token_key, data);
}

async function login(body) {
  const header = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  return axios
    .post(`${path}/controller.php`, body, {
      headers: header
    })
    .then((response) => {
      const { status, data } = response;
      
      if (status === 200 && !!data?.access_token)
        setToken(data?.access_token);
       
      return response?.data;
    })
    .catch((err) => {
      const { data } = err?.response;
      return data;
    });
}



export { login };
