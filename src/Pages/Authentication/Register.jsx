import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser, resetAuthState  } from "../../Redux/Authentication/AuthSlice";
import { gsap } from "gsap";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.authentication
  );

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

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
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2).required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setEmailError("");
      dispatch(registerUser(values));
    },
  });

  /* =====================
     HANDLE API RESPONSE
  ====================== */
  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      toast.success("Registration Successfully 🎉");
       dispatch(resetAuthState());  
      navigate("/login");
    }

    if (isError && message === "User already exists") {
      setEmailError("Email already registered");
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
          Create Account 🚀
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-8">
          Join us and start your journey
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">

          {/* NAME */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Full Name"
                className="w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
            {(formik.touched.email && formik.errors.email) || emailError ? (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.email || emailError}
              </p>
            ) : null}
          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
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
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold tracking-wide hover:opacity-90 transition-all disabled:opacity-60"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold cursor-pointer hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
