import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Fab } from "@material-ui/core";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import axios from "axios";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../services/api";

export default function Step(props) {
  const { workflow_name, product_name } = props;
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [limits, setLimits] = useState({
    lower_limit: null,
    uper_limit: null,
    id: null,
  });
  const [display, setDisplay] = useState({});
  const [tool, setTool] = useState({});
  const [component, setComponent] = useState({});

  const handleOpen = () => {
    api
      .get(`/step/${workflow_name}`)
      .then((response) => {
        setStep(response.data);
        setOpen(true);
      })
      .catch(function (error) {
        alert("Error to Display Workflow " + error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    setLoaded(false);
  };

  const toolDisplay = () => {
    setDisplay(tool);
  };

  const componentDisplay = () => {
    setDisplay(component);
  };

  const stepDisplay = () => {
    setDisplay(step);
  };

  const handleNext = () => {
    if (limits.lower_limit != null && value == null)
      return alert("Please insert the input field");
    if ((limits.lower_limit = !null && value < limits.lower_limit))
      return getNextStep("low_limit");
    if ((limits.lower_limit = !null && value > limits.uper_limit))
      return getNextStep("uper_limit");
    else return getNextStep("follow");
  };

  const getNextStep = (event) => {
    setLoaded(false);
    api
      .get(`/step/${workflow_name}/${step.id}/${event}`)
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

    if (value != null) return handleCurentValue();
  };

  const handleCurentValue = () => {
    let curent = value;
    api
      .post("/parameter/curent-value", {
        id: `${limits.id}`,
        value: curent,
      })
      .then(setValue(null));
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (open == false) return;
    else handleRequests();
  }, [step]);

  const handleRequests = () => {
    setDisplay(step);
    api
      .get(`/parameter/${product_name}/${step.id}`)
      .then((response) => {
        setLimits(response.data);
      })
      .catch(function (error) {
        alert("Error to Display Parameter " + error);
      });
    api
      .get(`/tool/${product_name}/${step.id}`)
      .then((response) => {
        setTool(response.data);
      })
      .catch(function (error) {
        alert("Error to Display Tools " + error);
      });
    api
      .get(`/component/${product_name}/${step.id}`)
      .then((response) => {
        setComponent(response.data);
        setLoaded(true);
      })
      .catch(function (error) {
        alert("Error to Display Tools " + error);
      });
  };

  return (
    <>
      <Fab
        color="primary"
        style={{ position: "fixed", bottom: "32px", right: "32px" }}
      >
        <PlayArrowIcon onClick={handleOpen} size="large" />
      </Fab>
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
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "70px",
                }}
              >
                <CircularProgress />
              </div>
            </div>
          )}
          {loaded == true && (
            <div>
              <DialogTitle id="alert-dialog-slide-title">
                {display.title}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  {display.description}
                </DialogContentText>
                <img style={{ maxWidth: "100%" }} src={display.image} />
                {limits.lower_limit != null && (
                  <FormControl
                    fullWidth
                    sx={{ m: 1 }}
                    variant="standard"
                    style={{ marginTop: "15px" }}
                  >
                    <InputLabel
                      style={{ fontSize: "18px", fontWeight: "500" }}
                      htmlFor="standard-adornment-amount"
                    >
                      Measurement
                    </InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      name="value"
                      value={value}
                      color="primary"
                      onChange={(event) => handleChange(event)}
                    />
                  </FormControl>
                )}
              </DialogContent>
              {step.id != null &&
                tool.id != display.id &&
                component.id != display.id && (
                  <DialogActions
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div
                      style={{
                        justifyContent: "space-between",
                      }}
                    >
                      {tool.id != null && (
                        <Button
                          onClick={toolDisplay}
                          variant="contained"
                          color="primary"
                          style={{ marginRight: "30px" }}
                        >
                          Tools
                        </Button>
                      )}
                      {component.id != null && (
                        <Button
                          onClick={componentDisplay}
                          variant="contained"
                          color="primary"
                        >
                          Component
                        </Button>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        width: "100%",
                      }}
                    >
                      <Button onClick={handleClose} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleNext} color="primary">
                        Next
                      </Button>
                    </div>
                  </DialogActions>
                )}
              {step.id != null &&
                (tool.id == display.id || component.id == display.id) && (
                  <DialogActions
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Button
                        onClick={stepDisplay}
                        variant="contained"
                        color="primary"
                      >
                        Back
                      </Button>
                    </div>
                  </DialogActions>
                )}
              {step.id == null && (
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Done
                  </Button>
                </DialogActions>
              )}
            </div>
          )}
        </Dialog>
      </div>
    </>
  );
}
