import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../vendor/jquery-nice-select/css/nice-select.css";
import "../css/style.css";
import image from "../images/login_backgoround.png";

const SignInPage = () => {
  const [email, setEmail] = useState("hello@example.com");
  const [password, setPassword] = useState("Password");
  const [remember, setRemember] = useState(false);

  return (
    <div
      className="container h-100"
      style={{
        backgroundSize: "cover",
      }}
    >
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body p-0">
              <div className="row m-0">
                <div className="col-xl-6 col-md-6">
                  <div>
                    {/* <div className="text-center my-5">
                      <a href="index.html">
                        <img src="images/logo-dark.png" alt="Logo" />
                      </a>
                    </div> */}
                    <img
                      src={image}
                      className="img-fix bitcoin-img sd-shape7"
                      alt="Bitcoin"
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-md-6">
                  <div className="sign-in-your py-4 px-2">
                    <h4 className="fs-20">Sign in to your account</h4>
                    <span>
                      Welcome back! Login with your data that you entered during
                      registration
                    </span>
                    <form action="index.html">
                      <div className="text-left">
                        <div className="mb-3">
                          <label className="mb-1" >
                            <strong>Email</strong>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="mb-1">
                            <strong>Password</strong>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="row d-flex justify-content-between mt-4 mb-2">
                        <div className="mb-3">
                          <div className="form-check custom-checkbox ms-1">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="basic_checkbox_1"
                              checked={remember}
                              onChange={() => setRemember(!remember)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="basic_checkbox_1"
                            >
                              Remember my preference
                            </label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <a href="page-forgot-password.html">
                            Forgot Password?
                          </a>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign Me In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
