import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import { schemaRegister } from "../../services/data";
import { fileUpLoad } from "../../services/fileUpload";
import { useDispatch } from "react-redux";
import { actionRegisterAsync } from "../../redux/actions/userActions";
import axios from "axios";
const Register = () => {
  const dispatch = useDispatch();
  const apiTienda = "https://abarrotado-production.up.railway.app/api/v1/"
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onUpLoadImage = async (image) => {
    const url = await fileUpLoad(image);
    if (url) {
      return url;
    } else {
      console.log("Ocurrió un error al cargar la imagen");
    }
  };
  const onSubmit = async (data) => {
    const photoUrl = await onUpLoadImage(data.image?.[0]);
    console.log(data);
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: photoUrl,
      phoneNumber: data.phone,
    };
    const newUserBack = {
      nombre: data.name,
      email: data.email,
      password: data.password,
      cel: data.phone,
    };
    axios.post(`${apiTienda}/usuario`, newUserBack)
    dispatch(actionRegisterAsync(newUser));
  };

  return (
    <div className="register">
      <h1>Crear una nueva cuenta</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="" controlId="formBasicEmail">
          <div label="Name" className="">
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            {/* <div className="">{errors.name?.message}</div> */}
          </div>
        </div>
        <div className="" controlId="formBasicEmail">
          <div label="Email address" className="">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {/* <div className="">
              {errors.email?.message}
            </div> */}
          </div>
        </div>
        <div className="" controlId="formBasicEmail">
          <div label=" Phone number" className="">
            <input
              type="number"
              placeholder="Celular"
              {...register("phone")}
            />
            {/* <div className="">
              {errors.phone?.message}
            </div> */}
          </div>
        </div>

        <div className="" controlId="formBasicPassword">
          <div label="Password" className="">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {/* <div className="">
              {errors.password?.message}
            </div> */}
          </div>
        </div>
        <div className="register__confirmPassword" controlId="formBasicPassword">
          <div label="Confirm Passwor" className="">
            <input
              type="password"
              placeholder="repeatPassword"
              {...register("repeatPassword")}
            />
            {/* <div className="">
              {errors.repeatPassword?.message}
            </div> */}
          </div>
        </div>

        <button variant="warning" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;