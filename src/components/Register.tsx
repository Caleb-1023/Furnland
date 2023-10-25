import React from "react";
import { Styleprops } from "./Style";
import { Formik, Form } from "formik";
import { Input } from "./Fields";
import { API } from "../controller/api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const Register = () => {
  const navigate = useNavigate();
  const initialvalues = {
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
  };
  const validate = Yup.object({
    email: Yup.string().email("Invalid Format").required("Required"),
    password: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits"),
    name: Yup.string().required("Required"),
  });

  const registeruser = async (value: any) => {
    try {
      const response = await API.post("api/auth/register", value);
      console.log(response);
      toast.success(response.data.message);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div style={Styleprops.style2}>
        <div className="container-fluid">
          <div className="row justify-content-center justify-content-lg-end justify-content">
            <div
              className="border col col-md-8 col-lg-5 me-lg-5 m-2"
              style={Styleprops.style3}
            >
              <div className="container">
                <div className="row mt-4 justify-content-center ">
                  <div className="col-10 ">
                    <div className="text-center">
                      <h2>Are you a member?</h2>
                      <p className="">
                        With furnland you can sell furnitures online with ease
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-10 ">
                    <div className="text-center">
                      <button className="btn border w-100">
                        Continue with google
                      </button>
                    </div>
                    <div className="text-center mt-3">
                      <button className="btn border  w-100">
                        Continue with facebook
                      </button>
                      <hr />
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-10">
                    <Formik
                      initialValues={initialvalues}
                      validationSchema={validate}
                      onSubmit={async (value, props) => {
                        props.resetForm();
                        await registeruser(value);

                        console.log("Hello");
                      }}
                    >
                      {(formikprops) => {
                        return (
                          <Form>
                            <Input name="name" type="text" label="Name" />
                            <Input
                              name="email"
                              type="text"
                              label="Email address"
                              required
                            />
                            <Input
                              name="phoneNumber"
                              type="number"
                              label="Phone Number"
                              required
                            />
                            <Input
                              name="password"
                              type="password"
                              label="Password"
                              required
                            />
                            <div className="mt-4 text-center">
                              <button
                                type="submit"
                                style={Styleprops.buttonstyle2}
                                className="text-white btn btn"
                              >
                                Register
                              </button>
                              <ToastContainer/>
                            </div>
                            <div className="mt-4 text-center">
                              <p>
                                Already have an account?
                                <Link to="/login">Login</Link>
                              </p>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
