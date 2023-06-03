import "../Account.css";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useEffect } from "react";

export function Profile() {
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { firstName, lastName, email } = userDetails.user || {};
  //   console.log(userDetails.user.firstName);
  //   console.log(localStorage.getItem("userData"));

  useEffect(() => {
    const userDetailsFromStorage = JSON.parse(localStorage.getItem("userData"));
    if (userDetailsFromStorage !== null) {
      setUserDetails(userDetailsFromStorage);
    }
  }, [setUserDetails]);

  return (
    <div className="profile-container">
      <h2>
        <span className="label">Name :</span> {firstName} {lastName}
      </h2>
      <h2>
        <span className="label">Email :</span> {email}
      </h2>
    </div>
  );
}
