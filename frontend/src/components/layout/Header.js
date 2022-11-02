import Button from "@material-ui/core/Button";
import { useAuth } from "../../hooks/useAuth";

export default function Header(props) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const { leftIcon, rightIcon, title } = props;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "48px",
        minHeight: "48px",
        width: "100%",
        padding: "0 15px",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.15)",
      }}
    >
      <div style={{ height: "24px", width: "24px" }}>{leftIcon}</div>
      <div
        style={{
          fontSize: "18px",
          fontWeight: "500",
        }}
      >
        {title}
      </div>
      <div style={{ width: "60px", marginRight: "30px" }}>
        <Button variant="outlined" color="Secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
