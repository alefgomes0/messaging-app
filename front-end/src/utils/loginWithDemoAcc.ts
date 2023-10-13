import axios from "axios"

export const loginWithDemoAcc = async (accEmail: string, accPwd: string) => {
  axios.post("http://localhost:3000/login", {
    email: accEmail,
    password: accPwd
  }, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true
  })
}