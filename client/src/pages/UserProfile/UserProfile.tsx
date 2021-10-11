import React, { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserProfile: FC = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const getUserInfo = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        "http://localhost:3001/auth/getUserInfo",
        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const register = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.post(
        "http://localhost:3001/auth/signin",
        {},
        { headers: { authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isAuthenticated && JSON.stringify(user)}
      <div>
        <ul>
          <li>
            <button onClick={getUserInfo}>Get User Info</button>
            <button onClick={register}>Register user on DB</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
