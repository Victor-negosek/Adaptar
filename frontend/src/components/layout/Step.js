import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../services/api";
import DialogTamplete from "./DialogTemplate";
import InputKeyboard from "./InputKeyboard";

export default function Step(props) {
  const { setOpen, open, workflow_name, product_name } = props;
  const [step, setStep] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [limits, setLimits] = useState({});
  const [display, setDisplay] = useState({});
  const [tool, setTool] = useState({});
  const [component, setComponent] = useState({});

  useEffect(() => {
    if (open == false) return;
    else
      api
        .get(`/step/${workflow_name}`)
        .then((response) => {
          setStep(response.data);
        })
        .catch(function (error) {
          alert("Error to Display Workflow " + error);
        });
  }, [open]);

  const handleClose = () => {
    setKeyboardVisibility(false);
    setOpen(false);
    setLoaded(false);
  };

  const displayHandler = (event) => {
    setKeyboardVisibility(false);
    setDisplay(event);
  };

  const handleNext = () => {
    setInput(null);
    setKeyboardVisibility(false);
    if (limits.lower_limit != null && input == null)
      return alert("Please insert the input field");
    if (limits.lower_limit != null && input < limits.lower_limit)
      return getNextStep("low_limit");
    if (limits.lower_limit != null && input > limits.uper_limit)
      return getNextStep("uper_limit");
    else return getNextStep("follow");
  };

  const getNextStep = (event) => {
    setLoaded(false);
    api
      .get(`/step/${step.id}/${event}`)
      .then((response) => {
        if (response.data.id == null)
          return setStep({
            id: null,
            title: "This is the last step",
            description:
              "You are Done with all the step please start again if the problem wasn't solved",
          });
        else setStep(response.data);
      })
      .catch(function (error) {
        alert("Error to Display Workflow " + error);
      });

    if (input != null) return handleCurentValue();
  };

  const handleCurentValue = () => {
    api.post("/parameter/curent-value", {
      id: `${limits.id}`,
      value: input,
    });
  };

  useEffect(() => {
    if (open == false) return;
    else handleRequests();
  }, [step]);

  // Fazer um for aqui
  const handleRequests = () => {
    setDisplay(step);
    const object = {
      parameter: "parameter",
      tool: "tool",
      component: "component",
    };
    for (const property in object) {
      api
        .get(`/${property}/${product_name}/${step.id}`)
        .then((response) => {
          if (property == "parameter") {
            setLimits(response.data);
          }
          if (property == "tool") {
            setTool(response.data);
          }
          if (property == "component") {
            setComponent(response.data);
            setLoaded(true);
          }
        })
        .catch(function (error) {
          alert(`Error to Display ${property}` + error);
        });
    }
  };

  const [keyboardVisibility, setKeyboardVisibility] = useState(false);
  const [input, setInput] = useState("");

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {loaded == false && (
            <div
              style={{
                width: "200px",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                paddingTop: "70px",
              }}
            >
              <CircularProgress />
            </div>
          )}
          {loaded == true && (
            <div>
              <DialogTamplete step={display} />
              {limits.lower_limit != null && display == step && (
                <InputKeyboard
                  setKeyboardVisibility={setKeyboardVisibility}
                  keyboardVisibility={keyboardVisibility}
                  input={input}
                  setInput={setInput}
                />
              )}

              {step.id != null && step.id == display.id && (
                <DialogActions
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  {tool.id != null && (
                    <Button
                      onClick={() => displayHandler(tool)}
                      variant="contained"
                      color="primary"
                      style={{ marginRight: "30px" }}
                    >
                      Tools
                    </Button>
                  )}
                  {component.id != null && (
                    <Button
                      onClick={() => displayHandler(component)}
                      variant="contained"
                      color="primary"
                    >
                      Component
                    </Button>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      width: "100%",
                    }}
                  >
                    <Button onClick={handleNext} color="primary">
                      Next
                    </Button>
                  </div>
                </DialogActions>
              )}
              {step != display && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={() => displayHandler(step)}
                    color="primary"
                    variant="contained"
                  >
                    Back
                  </Button>
                </div>
              )}
              <DialogActions>
                {step.id == null && (
                  <Button onClick={handleClose} color="primary">
                    Done
                  </Button>
                )}
              </DialogActions>
            </div>
          )}
        </Dialog>
      </div>
    </>
  );
}
