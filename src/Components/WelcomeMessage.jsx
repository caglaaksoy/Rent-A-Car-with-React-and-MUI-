import React from "react";
import { useSelector } from "react-redux";

function WelcomeMessage() {
  // Redux store'dan kullanıcı adını al
  const username = useSelector((state) => state.user.username);

  return (
    <div>
      {username ? <h1>Hoş geldin, {username}!</h1> : <h1>Hoş geldin!</h1>}
    </div>
  );
}

export default WelcomeMessage;
