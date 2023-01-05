import TextField from "@mui/material/TextField";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useRef } from "react";

export default function InputKeyboard(props) {
  const {
    input,
    setInput,
    setValue,
    setKeyboardVisibility,
    keyboardVisibility,
  } = props;

  const layout = "ip";
  const keyboard = useRef();

  const handleClose = () => {
    setKeyboardVisibility(false);
  };

  const onChange = (input) => {
    setInput(input);
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "Center" }}>
        <TextField
          placeholder={"Measurement"}
          id="standard-adornment-amount"
          style={{ width: "90%" }}
          value={input}
          color="primary"
          onChange={onChangeInput}
          onFocus={() => setKeyboardVisibility(true)}
        />
      </div>
      {keyboardVisibility && (
        <div style={{ display: "flex", justifyContent: "Center" }}>
          <div style={{ width: "80%" }}>
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
              layoutName={layout}
              onChange={onChange}
              layout={{
                ip: ["1 2 3", "4 5 6", "7 8 9", ". 0 -", "{bksp}"],
              }}
              display={{
                "{bksp}": "backspace",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
