import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="16bit-game-store.us.auth0.com"
    clientId="iLuXZmxvUskbRShj2amEbKowGWdpP6ka"
    redirectUri={window.location.origin}
    audience="http://16bit-game-store/"
    scope="openid profile email"
  >
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);
