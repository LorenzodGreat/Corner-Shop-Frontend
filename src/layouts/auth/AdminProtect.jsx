import { useLocation, Outlet, Navigate } from "react-router-dom";

const ProtectAdmin = () => {

  const location = useLocation();

  let accessBooleanInfo = localStorage.getItem("auth_role");
  let access = JSON.parse(accessBooleanInfo);
  console.log(access);
  return access === 1 ? (
    <Outlet />
  ) : (
    (<Navigate to="/" />
    )
  );
};

export default ProtectAdmin;


