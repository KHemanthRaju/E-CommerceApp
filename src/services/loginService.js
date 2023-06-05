import axios from "axios";

async function loginService(email, password) {
  //post request for login
  try {
    const res = await axios.post("/api/auth/login", {
      email: email,
      password: password,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error("Failed to log in. Invalid response from the server.");
    }
  } catch (e) {
    console.log("loginService: Error in Login", e); //
  }
}

export { loginService };
