import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const userData = JSON.parse(localStorage.getItem("userData")) || {
  token: "",
  user: "",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: userData?.token,
    user: userData?.user,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const signup = async (email, password, firstName, lastName) => {
    try {
      console.log(email, password, firstName, lastName);
      const response = await axios
        .post(`/api/auth/signup`, {
          email,
          password,
          firstName,
          lastName,
        })
        .then((response) => {
          const userData = {
            token: response.data.encodedToken,
            user: response.data.createdUser,
          };
          setUser(userData);

          localStorage.setItem("userData", JSON.stringify(userData));
          console.log(location);
          navigate(location?.state?.from?.pathname || "/", { replace: true });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const login = (email, password) => {
    axios
      .post(`/api/auth/login`, {
        email,
        password,
      })
      .then((response) => {
        const userData = {
          token: response.data.encodedToken,
          user: response.data.foundUser,
        };

        setUser(userData);

        localStorage.setItem("userData", JSON.stringify(userData));
        console.log(location);
        navigate(location?.state?.from?.pathname || "/", { replace: true });
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 401) {
          toast.error("Wrong credentials. Please Try again");
        } else if (status === 404) {
          toast.error("User not found. Create new account");
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser({ token: "", user: "" });
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
