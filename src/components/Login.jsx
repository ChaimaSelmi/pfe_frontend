import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import { useAuth } from "./AuthProvider";
import Swal from "sweetalert2";


const Login = () => {
  const [data, setData] = useState();
  const { redirectToDashboard, setIsLoggedIn, isLoggedIn } = useAuth();
  const [resetMessage, setResetMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      redirectToDashboard();
    }
  }, [isLoggedIn]); 

  const OnChangeHandle = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const OnSubmitHandle = (e) => {
    e.preventDefault();
    console.log("login",data)
    AuthService.signin(data)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.tokens.accessToken);
        localStorage.setItem("refreshToken", res.data.tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setIsLoggedIn(true);
        redirectToDashboard();
      })
      .catch((error) => {
          console.log("Mot de passe incorrect.");
          setErrorMessage("Mot de passe ou nom d'utilisateur incorrect !! Veuillez vérifier.");
        });
  };


  
  return (
    <div>
      <section
        className="login_part section_padding "
        style={{ padding: "20px 0" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="login_part_text text-center">
                <div className="login_part_text_iner">
                  <h2>If You Don't Have An Account:</h2>
                  <Link to="/signup_v">
                    <a href="#" className="btn_3">
                      Create an Account Vendeur
                    </a>
                  </Link>
                  <Link to="/signup_c">
                    <a href="#" className="btn_3">
                      {" "}
                      Create an Account Client{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="login_part_form">
                <div className="login_part_form_iner">
                  <h3>
                    Welcome Back ! <br />
                    Please Sign in now
                  </h3>
                  <form
                    className="row contact_form"
                    action="#"
                    method="post"
                    noValidate="novalidate"
                  >
                    <div className="col-md-12 form-group p_star">
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        onChange={OnChangeHandle}
                      />
                    </div>
                    <div className="col-md-12 form-group p_star">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        onChange={OnChangeHandle}
                      />
                    </div>
                    <div className="col-md-12 form-group">
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                      <button
                        type="submit"
                        value="submit"
                        className="btn_3"
                        onClick={OnSubmitHandle}
                      >
                        log in
                      </button>
                      <Link className="lost_pass" to="/reset-password">forget password?</Link>
                     
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
