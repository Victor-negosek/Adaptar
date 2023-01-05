import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function DialogTamplete(props) {
  const { step } = props;

  return (
    <>
      <DialogTitle id="alert-dialog-slide-title">{step.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {step.description}
        </DialogContentText>
        <img style={{ maxWidth: "100%" }} src={step.image} />
      </DialogContent>
    </>
  );
}
