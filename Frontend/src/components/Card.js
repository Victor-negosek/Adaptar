import React from "react";
import { ButtonBase, Typography } from "@material-ui/core";

export default function UserListCard(props) {
  const { image, name, description, children, onClick } = props;

  return (
    <ButtonBase onClick={onClick}>
      <div
        style={{
          display: "flex",
          padding: "16px 8px",
          margin: "0 8px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          textAlign: "left",
          width: "100%",
        }}
      >
        <img src={image} alt="Placeholder image" height="64px" width="64px" />
        <div style={{ padding: "0 8px", width: "100%", margin: "auto 0" }}>
          <Typography style={{ fontSize: "16px", fontWeight: "500" }}>
            {name}
          </Typography>
          <div style={{ fontSize: "14px" }}>{description}</div>
        </div>
        {children}
      </div>
    </ButtonBase>
  );
}
