import { useState, useEffect } from "react";
import Header from "../../../components/layout/Header";
import { useRouter } from "next/router";
import Card from "../../../components/Card";
import api from "../../../services/api";

export default function WorkFlowList(props) {
  const router = useRouter();
  const { product_name } = router.query;

  const [workflows, setWorkflows] = useState({});
  const [render, setRender] = useState(1);

  function getWorkflows() {
    return api.get(`/workflow/list/${product_name}`);
  }

  useEffect(() => {
    if (!router.isReady) return;

    Promise.all([getWorkflows()])
      .then((values) => {
        setWorkflows(values[0].data);
        setRender(0);
      })
      .catch(function (error) {
        alert("Error to Display Workflow " + error);
      });
  }, [router.isReady]);

  return (
    <main>
      <div style={{ height: "100vh", padding: "0 0 15px 0" }}>
        <Header title="WORKFLOWS" url="/machine/" />
        {render === 0 && (
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            {workflows.map((workflow) => (
              <Card
                key={workflow.id}
                name={workflow.name}
                image={workflow.image}
                description={workflow.description}
                onClick={() =>
                  router.push(
                    "/workflow/" + product_name + "/" + workflow.id,
                    undefined,
                    {
                      shallow: true,
                    }
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
