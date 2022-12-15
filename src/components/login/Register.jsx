import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaRegister } from "../../services/data";
import { fileUpLoad } from "../../services/fileUpload";
import { useDispatch } from "react-redux";
import { actionRegisterAsync } from "../../redux/actions/userActions";
const Register = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });
  const onUpLoadImage = async (image) => {
    const url = await fileUpLoad(image);
    if (url) {
      return url;
    } else {
      console.log("Ocurrió un error al cargar la imagen");
    }
  };
  const onSubmit = async (data) => {
    const photoUrl = await onUpLoadImage(data.image[0]);
    console.log(data);
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: photoUrl,
      phoneNumber: data.phone,
    };
    dispatch(actionRegisterAsync(newUser));
  };

  return (
    <div className="register">
      <h1>Crear una nueva cuenta</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3" controlId="formBasicEmail">
          <div label="Name" className="">
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            <div className="text-muted">{errors.name?.message}</div>
          </div>
        </div>
        <div className="mb-3" controlId="formBasicEmail">
          <div label="Email address" className="mb-3">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <div className="text-muted">
              {errors.email?.message}
            </div>
          </div>
        </div>
        <div className="mb-3" controlId="formBasicEmail">
          <div label=" Phone number" className="mb-3">
            <input
              type="number"
              placeholder="Celular"
              {...register("phone")}
            />
            <div className="text-muted">
              {errors.phone?.message}
            </div>
          </div>
        </div>

        <div className="mb-3" controlId="formBasicPassword">
          <div label="Password" className="mb-3">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <div className="text-muted">
              {errors.password?.message}
            </div>
          </div>
        </div>
        <div className="mb-3" controlId="formBasicPassword">
          <div label="Confirm Password" className="mb-3">
            <div
              type="password"
              placeholder="Password"
              {...register("repeatPassword")}
            />
            <div className="text-muted">
              {errors.repeatPassword?.message}
            </div>
          </div>
        </div>
        <div className="mb-3" controlId="formBasicEmail">
          <div label="Avatar" className="mb-3">
            <div type="file" size="sm" {...register("image")} />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
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
