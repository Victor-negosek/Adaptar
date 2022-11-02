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
    if (userName == "" || password == "") {
      alert("Please Fill all the fields");
    } else {
      setIsLoginIn(true);
      await signIn(userName, password);
      setIsLoginIn(false);
    }
  }

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
            label="Email"
            name="email"
            variant="outlined"
            style={{ width: "80%" }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            type="password"
            style={{ width: "80%" }}
            onChange={(e) => setPassword(e.target.value)}
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
