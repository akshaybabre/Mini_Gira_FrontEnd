import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser, resetAuthState } from "../../Redux/Authentication/AuthSlice";
import { gsap } from "gsap";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.authentication
  );

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  /* =====================
     GSAP ANIMATION
  ====================== */
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" }
    );
  }, []);

  /* =====================
     FORM HANDLING
  ====================== */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setEmailError("");
      setPasswordError("");
      setLoginError("");
      dispatch(loginUser(values));
    },
  });

  /* =====================
     HANDLE API RESPONSE
  ====================== */
  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      dispatch(resetAuthState());
      navigate("/dashboard");
      toast.success("Login successful 🎉");
    }

    if (isError) {
      if (message === "EMAIL_NOT_FOUND") {
        setEmailError("Email not registered");
      }

      if (message === "PASSWORD_INCORRECT") {
        setPasswordError("Incorrect password");
      }

      dispatch(resetAuthState());
    }
  }, [isSuccess, isError, message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400 px-4">
      <div
        ref={cardRef}
        className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl p-8 border border-white/40"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-8">
          Login to continue
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Email Address"
                className="w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            {(formik.touched.email && formik.errors.email) && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.email}
              </p>
            )}

            {emailError && (
              <p className="text-xs text-red-500 mt-1">
                {emailError}
              </p>
            )}

          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {(formik.touched.password && formik.errors.password) && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.password}
              </p>
            )}

            {passwordError && (
              <p className="text-xs text-red-500 mt-1">
                {passwordError}
              </p>
            )}

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold tracking-wide hover:opacity-90 transition-all disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold cursor-pointer hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
