import { useState, useEffect } from "react";
import Header from "../../../../components/layout/Header";
import { useRouter } from "next/router";
import { Icon } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Basic from "../../../../components/layout/Basic";
import Step from "../../../../components/layout/Step";
import api from "../../../../services/api";

export default function WorkFlowIndex() {
  const router = useRouter();
  const { workflow_name } = router.query;
  const { product_name } = router.query;
  const [workflow, setWorkflow] = useState({});
  const [render, setRender] = useState(1);

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
        <Header
          title={workflow_name}
          leftIcon={
            <Icon
              component={ArrowBackIosIcon}
              color="action"
              onClick={() =>
                router.push("/workflow/" + product_name, undefined, {
                  shallow: true,
                })
              }
            />
          }
        />
        {render === 0 && (
          <Basic image={workflow.image} description={workflow.description} />
        )}
      </div>
      <Step workflow_name={workflow_name} product_name={product_name} />
    </main>
  );
}
