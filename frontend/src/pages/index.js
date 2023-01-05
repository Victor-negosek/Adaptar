import React, { useState } from "react";
import Image from "next/image";
import {
  Backdrop,
  Button,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { useAuth } from "../hooks/useAuth";
import { makeStyles } from "@material-ui/core/styles";
import Keyb from "../components/Keyb";
import "react-simple-keyboard/build/css/index.css";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Home() {
  const classes = useStyles();
  const { signIn } = useAuth();
  const [isLoginIn, setIsLoginIn] = useState(false);
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(userName, password) {
    setKeyboardVisibility(false);
    if (userName == "" || password == "") {
      alert("Please Fill all the fields");
    } else {
      setIsLoginIn(true);
      await signIn(userName, password);
      setIsLoginIn(false);
    }
  }

  const [keyboardVisibility, setKeyboardVisibility] = useState(false);

  const [inputs, setInputs] = useState({});
  const [inputName, setInputName] = useState("default");

  function handleFocus(Name) {
    setInputName(Name);
    setKeyboardVisibility(true);
  }

  const onChangeInput = (event) => {
    const inputVal = event.target.value;
    setInputs({
      ...inputs,
      [inputName]: inputVal,
    });
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={isLoginIn}>
        <CircularProgress color="primary" />
      </Backdrop>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          padding: "0 0 15px 0",
        }}
      >
        <div
          style={{
            position: "relative",
            marginTop: "20px",
          }}
        >
          <Image
            src="/adaptar_logo.png"
            alt="adaptar project logo."
            width="300"
            height="250"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100vw",
            height: "40vh",
            maxHeight: "300px",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: "36px",
              maxWidth: "260px",
              textAlign: "center",
            }}
          >
            WELCOME TO ADAPTAR
          </div>
          <TextField
            id="userName"
            value={userName}
            onFocus={() => handleFocus("userName")}
            placeholder={"Email"}
            onChange={onChangeInput}
            style={{ width: "80%" }}
            variant="outlined"
          />
          <TextField
            id="password"
            value={password}
            onFocus={() => handleFocus("password")}
            placeholder={"Password"}
            onChange={onChangeInput}
            style={{ width: "80%" }}
            variant="outlined"
            type="password"
          />
          <Button
            color="primary"
            variant="contained"
            style={{ width: "80%" }}
            size="large"
            onClick={() => handleSubmit(userName, password)}
          >
            Login
          </Button>
        </div>
        {keyboardVisibility && (
          <Keyb
            input={inputs}
            setInput={setInputs}
            inputName={inputName}
            setUsername={setUsername}
            setPassword={setPassword}
            userName={userName}
            setKeyboardVisibility={setKeyboardVisibility}
          />
        )}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontWeight: 500,
              fontSize: "14px",
            }}
          >
            DEVELOPED BY
          </div>
          <div
            style={{
              position: "relative",
              marginBottom: "15px",
            }}
          >
            <Image
              src="/fraunhofer_logo.png"
              alt="Fraunhofer IPT logo."
              width="258"
              height="72"
            />
          </div>
        </div>
      </div>
    </>
  );
}
