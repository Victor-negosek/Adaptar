import { useState, useEffect } from "react";
import Header from "../../../../components/layout/Header";
import { useRouter } from "next/router";
import Basic from "../../../../components/layout/Basic";
import Step from "../../../../components/layout/Step";
import api from "../../../../services/api";
import { Fab } from "@material-ui/core";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function WorkFlowIndex() {
  const router = useRouter();
  const { workflow_name, product_name } = router.query;
  const [workflow, setWorkflow] = useState({});
  const [render, setRender] = useState(1);
  const [open, setOpen] = useState(false);

  const url = `/workflow/${product_name}`;

  function getWorkflow() {
    return api.get(`/workflow/${workflow_name}`);
  }

  useEffect(() => {
    if (!router.isReady) return;

    Promise.all([getWorkflow()])
      .then((values) => {
        setWorkflow(values[0].data);
        setRender(0);
      })
      .catch(function (error) {
        alert("Error to Display Workflow " + error);
      });
  }, [router.isReady]);

  return (
    <main>
      <div style={{ height: "100vh", padding: "0 0 15px 0" }}>
        <Header title={workflow_name} url={url} />
        {render === 0 && (
          <Basic image={workflow.image} description={workflow.description} />
        )}
      </div>
      <Fab
        color="primary"
        style={{ position: "fixed", bottom: "32px", right: "32px" }}
      >
        <PlayArrowIcon onClick={(e) => setOpen(true)} size="large" />
      </Fab>
      <Step
        open={open}
        setOpen={setOpen}
        workflow_name={workflow_name}
        product_name={product_name}
      />
    </main>
  );
}
