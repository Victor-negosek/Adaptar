import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import React, { useRef, useState } from "react";

export default function Keyb(props) {
  const keyboard = useRef();

  const { inputName, setUsername, setPassword, setKeyboardVisibility } = props;
  const [layoutName, setLayoutName] = useState("default");

  const onChangeAll = (inputs) => {
    setUsername(inputs["userName"]);
    setPassword(inputs["password"]);
  };

  const handleClose = () => {
    setKeyboardVisibility(false);
  };

  const handleShift = () => {
    const newLayoutName = layoutName === "default" ? "shift" : "default";
    setLayoutName(newLayoutName);
  };

  const onKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  return (
    <div>
      <div
        style={{
          paddingTop: "8px",
          paddingBottom: "2px",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <button onClick={handleClose}>X</button>
      </div>
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        inputName={inputName}
        layoutName={layoutName}
        onChangeAll={onChangeAll}
        onKeyPress={onKeyPress}
      />
    </div>
  );
}
