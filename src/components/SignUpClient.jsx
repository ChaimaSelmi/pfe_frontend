import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function SignUpClient() {
  const [data, setData] = useState({ role: "client" });
  const [image, setImage] = useState([]);

  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ref", data.ref);
    formData.append("nom", data.nom);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("adresse", data.adresse);
    formData.append("password", data.password);
    formData.append("role", data.role);
    for (let i = 0; i < image.length; i++) {
      formData.append("files", image[i]);
    }
    AuthService.signup_c(formData)
      .then((res) => {
        console.log("Client inscrit avec succès:", res.FormData);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleImage = (e) => {
    setImage(e.target.files);
  };

  return (
    <div className="container mt-5">
      {" "}
      {/* Ajouter une marge en haut */}
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h2
                className="card-title text-center mb-4"
                style={{ color: "#c59fc5" }}
              >
                Inscription
              </h2>
              <form onSubmit={onSubmitHandle}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="nom"
                    placeholder="Nom"
                    onChange={onChangeHandle}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    onChange={onChangeHandle}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    onChange={onChangeHandle}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="adresse"
                    placeholder="Adresse"
                    onChange={onChangeHandle}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    onChange={onChangeHandle}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleImage}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{ backgroundColor: "#ad8fba", borderColor: "#ad8fba" }}
                >
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpClient;
