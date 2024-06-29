import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

function SignUpVendeur() {
  const [data, setData]=useState({role:"vendeur"});
  const [image, setImage]=useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    setData({
      ...data, [e.target.name]:e.target.value
    }) 
    console.log(data)
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
      const formData=new FormData()
      formData.append("ref", data.ref)
      formData.append("nom", data.nom)
      formData.append("username", data.username)
      formData.append("email", data.email)
      formData.append("adresse", data.adresse)
      formData.append("domaine", data.domaine)
      formData.append("password", data.password)
      formData.append("role", data.role)
      for (let i=0; i<image.length; i++){
          formData.append("files", image[i])
      }
      AuthService.signup_v(formData).then((res)=>{
        console.log('Vendeur inscrit avec succès:', res.FormData)
        navigate('/');
        }).catch((error)=>{
          console.log(error)
          setErrorMessage("Un utilisateur avec cet email ou nom d'utilisateur existe déjà.");

      })
  };
  const handleImage=(e)=>{
    setImage(e.target.files)

  }
  return (
    <div className="container mt-5"> 
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card" style={{
                    width: "500px",
                    height: "550px",
                  }}>
            <div className="card-body">
              <h2 className="card-title text-center mb-4" style={{ color: '#c59fc5' }}>Inscription</h2>
              <form onSubmit={onSubmitHandle}>
                <div className="form-group">
                  <input type="text" className="form-control" name="nom" placeholder="Nom" onChange={onChangeHandle} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="username" placeholder="Username" onChange={onChangeHandle} />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" name="email" placeholder="Email" onChange={onChangeHandle} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="adresse" placeholder="Adresse" onChange={onChangeHandle} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" name="domaine" placeholder="Domaine" onChange={onChangeHandle} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" name="password" placeholder="Password" onChange={onChangeHandle} />
                </div>
                <div className="form-group">
                  <input type="file" className="form-control" name='image' onChange={handleImage} />
                </div>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#ad8fba', borderColor: '#ad8fba' }}>S'inscrire</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpVendeur;
