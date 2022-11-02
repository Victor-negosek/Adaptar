import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/layout/Header";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import api from "../../services/api";

export default function ProductIndex() {
  const router = useRouter();

  const [products, setProducts] = useState({});
  const [render, setRender] = useState(1);

  useEffect(() => {
    api
      .get(`/product/`)
      .then((response) => {
        setProducts(response.data);
        setRender(0);
      })
      .catch(function (error) {
        console.log(error);
        alert("Error to Display Products");
      });
  }, []);

  return (
    <main>
      <div style={{ height: "100vh", padding: "0 0 15px 0" }}>
        <Header title="PRODUCTS" />
        {render === 0 && (
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            {products.map((product) => (
              <Card
                key={product.id}
                name={product.name}
                image={product.image}
                description={product.description}
                onClick={() =>
                  router.push("/workflow/" + product.name, undefined, {
                    shallow: true,
                  })
                }
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
