import React, { useState } from "react";
import LoginScreen from "../login";
import Register from "../register";
 const SignForm =() =>{
  const [check, setCheck] = useState(true);
  const changeHandler = () => {
    console.log("object")
    setCheck(!check);
  };
  return (
    <>
      {check ? (
        <LoginScreen change={changeHandler} />
      ) : (
        <Register change={changeHandler} />
      )}
    </>
  );
}
export default SignForm;