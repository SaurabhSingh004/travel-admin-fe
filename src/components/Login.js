import { motion } from "framer-motion";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Spinner } from "./Spinner";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state?.auth);
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  return (
    <div
      className="flex justify-content-center align-items-center "
      style={{ minHeight: "100vh" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-4 shadow-3"
        style={{ width: "25rem" }}
      >
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit} className="fluid">
          <div className="field">
            <label className=" mr-3 " htmlFor="username">
              Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <InputText
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter username"
              required
              className=" w-14rem "
            />
          </div>

          <div className="field">
            <label className=" mr-3 " htmlFor="password">
              Password&nbsp;
            </label>
            <Password
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              toggleMask
              feedback={false}
              required
              className=" w-15rem "
            />
          </div>

          {error && <small className="error block">{error}</small>}

          <div className=" flex justify-content-center">
            <Button
              type="submit"
              label="Login"
              icon="pi pi-check"
              className="button-rounded mt-3"
            />
          </div>
        </form>

        {loading && (
          <div className="flex justify-content-center mt-3">
            <Spinner />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;
