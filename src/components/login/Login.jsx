import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
// import { schemaLogin } from "../../services/data";
import { actionLoginAsync, loginProviderAsync } from "../../redux/actions/userActions";
import googleLogo from "../../assets/imgs/gogle_logo.png";

const Login = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const {register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {

    dispatch(actionLoginAsync(data))
  }

  const handleLoginGoogle = () => {
    dispatch(loginProviderAsync('google'))
  }
  const handleLoginPhone = () => {
    navigate("/phoneLogin");
  }

  return (
    <div className="login">
      <div className="login__container">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div label="Email address" className="mb-3">
            <input
              type="email"
              autoComplete="off"
              placeholder="name@example.com"
              {...register("email")}
            />
          </div>
          {/* <p>{errors.email?.message}</p> */}
          <div label="Password">
            <input
              type="password"
              autoComplete="off"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          {/* <p>{errors.password?.message}</p> */}

          <button variant="warning" type="submit" className="">
            Iniciar Sesión
          </button>
          <img src={googleLogo} alt="Google" style={{width: 50, marginLeft: 30}} onClick={handleLoginGoogle} />
        </form>
        <Link to="/Register" className="registro__yes" id="register_btn">¿Desea crear una cuenta?</Link>
      </div>
    </div>

  );
};
export default Login;