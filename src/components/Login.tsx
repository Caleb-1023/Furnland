import { Styleprops } from "./Style";
import { Formik, Form } from "formik";
import { Input } from "./Fields";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {API} from ".././controller/api"
export const Login = () => {
  const navigate = useNavigate();
  const initialvalues = {
    email: "",
    password: "",
  };
  const validate = Yup.object({
    email: Yup.string().email("Invalid Format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const values = async (submit: { email: string; password: string }) => {
    try {
      const response = await API.post(
        "api/auth/signin",
        {
          email: submit.email,
          password: submit.password,
        }
      );
      //const token=localStorage.setItem("token",response?.data?.accessToken)
      console.log(response);
      console.log(response.data.accessToken);
      navigate("/");
      window.location.reload()
      // if (userr) {
      // userr.setuser({
        // email:response.data.email,
        // token: response.data.accessToken,
      //  });
      //  }
      window.localStorage.setItem("Data",JSON.stringify({email:response.data.email,token:response.data.accessToken,role:response.data.roles[0].name,id:response.data.profile.id}))
      // setUser(response.data.accessToken)
    } catch (error:any) {
      alert(error.response.data.message)
      console.log(error);
      // }

      // console.log(user)
    }
   
   
   
  };
  return (
    <>
      <div style={Styleprops.style2}>
        <div className="container-fluid pb-5">
          <div className="row justify-content-center justify-content-lg-end justify-content">
            <div
              className="border col col-md-8 col-lg-5 me-lg-5 m-2"
              style={Styleprops.style3}
            >
              <div className="container">
                <div className="row mt-4 justify-content-center ">
                  <div className="col-10 ">
                    <div className="text-center">
                      <h2>Are you a member</h2>
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
                      <button className="btn border w-100">
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
                        await values(value);
                        
                        console.log("Hello");
                      }}
                    >
                      {(formikprops) => {
                        return (
                          <Form>
                            <Input
                              name="email"
                              type="text"
                              label="Email address"
                            />
                            <Input
                              name="password"
                              type="password"
                              label="Password"
                            />
                            <div className="row justify-content-between">
                              <div className="col-4">Remember me</div>
                              <div className="col-6">
                                <div className="text-end">
                                  <Link to="/">Forgotten password</Link>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 text-center">
                              <button
                                type="submit"
                                style={Styleprops.buttonstyle2}
                                className="text-white btn btn"
                              >
                                Sign in
                              </button>
                            </div>
                            <div className="mt-4 text-center">
                              <p>
                                Don't have an account?
                                <Link to="/register">Register</Link>
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
