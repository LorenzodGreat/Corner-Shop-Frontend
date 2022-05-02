import { Link, useNavigate, Outlet,useParams } from "react-router-dom";

function ProtectAdmin() {
    const navigate = useNavigate();
    const par = useParams();

    if (localStorage.getItem('auth_role') == 1) {
      <Outlet/>
    }
    else {
        navigate('/');
    }
}

export default ProtectAdmin;