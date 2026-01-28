import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser, resetAuthState } from "../../Redux/Authentication/AuthSlice";
import { gsap } from "gsap";
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Shield, Zap, Key, LogIn, ArrowRight, Globe, Star, Rocket, Check } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const particlesRef = useRef(null);

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.authentication
  );

  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  /* =====================
     PARTICLE ANIMATION
  ====================== */
  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = [];
    const ctx = particlesRef.current.getContext("2d");
    particlesRef.current.width = particlesRef.current.parentElement.offsetWidth;
    particlesRef.current.height = particlesRef.current.parentElement.offsetHeight;

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * particlesRef.current.width,
        y: Math.random() * particlesRef.current.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
        opacity: Math.random() * 0.2 + 0.1,
        color: Math.random() > 0.5 ? '#3b82f6' : '#8b5cf6',
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, particlesRef.current.width, particlesRef.current.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = particlesRef.current.width;
        if (p.x > particlesRef.current.width) p.x = 0;
        if (p.y < 0) p.y = particlesRef.current.height;
        if (p.y > particlesRef.current.height) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `${p.color}${Math.floor(p.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  /* =====================
     GSAP ANIMATIONS
  ====================== */
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 80, scale: 0.95, rotationY: -10 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        onComplete: () => {
          gsap.to(".floating-icon", {
            y: 8,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.2
          });
        }
      }
    );

    // Animate input icons on mount
    gsap.from(".input-icon", {
      scale: 0,
      rotation: -180,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.3,
      ease: "back.out(1.7)"
    });
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
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setEmailError("");
      setPasswordError("");
      setLoginError("");
      setIsAnimating(true);
      await dispatch(loginUser(values));
      setIsAnimating(false);
    },
  });

  /* =====================
     HANDLE API RESPONSE
  ====================== */
  useEffect(() => {
    if (isSuccess) {
      // Success animation
      gsap.to(".success-confetti", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1
      });

      gsap.to(cardRef.current, {
        scale: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          toast.success("Login successful! Welcome back! 🎉");
          formik.resetForm();
          dispatch(resetAuthState());
          navigate("/dashboard");
        }
      });
    }

    if (isError) {
      // Error animation
      gsap.to(cardRef.current, {
        x: [0, -10, 10, -10, 10, 0],
        duration: 0.5,
        ease: "power1.inOut"
      });

      if (message === "EMAIL_NOT_FOUND") {
        setEmailError("This email is not registered");
      } else if (message === "PASSWORD_INCORRECT") {
        setPasswordError("Incorrect password. Please try again");
      } else {
        setLoginError(message || "Login failed. Please try again.");
      }

      dispatch(resetAuthState());
    }
  }, [isSuccess, isError, message, dispatch, navigate, formik]);

  // Clear specific errors when user starts typing
  useEffect(() => {
    if (formik.values.email && emailError) {
      setEmailError("");
    }
  }, [formik.values.email, emailError]);

  useEffect(() => {
    if (formik.values.password && passwordError) {
      setPasswordError("");
    }
  }, [formik.values.password, passwordError]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#111827] to-[#1e1b4b] overflow-hidden px-4 relative">
      {/* Animated Background Elements */}
      <canvas ref={particlesRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Icons */}
      <div className="floating-icon absolute top-1/4 left-1/4 text-blue-400/20">
        <Key size={36} />
      </div>
      <div className="floating-icon absolute top-1/3 right-1/4 text-purple-400/20">
        <Shield size={32} />
      </div>
      <div className="floating-icon absolute bottom-1/3 left-1/3 text-cyan-400/20">
        <Globe size={28} />
      </div>

      {/* Success Confetti */}
      <div className="success-confetti absolute inset-0 opacity-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <Star size={14} className="text-yellow-400" />
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <div
          ref={cardRef}
          className="rounded-3xl bg-gradient-to-br from-gray-900/90 to-gray-900/50 backdrop-blur-2xl shadow-2xl border border-white/10 p-8 text-white relative overflow-hidden"
        >
          {/* Glow Effects */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl mb-4">
                <LogIn size={32} className="text-blue-400" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-400 mt-2">
                Sign in to access your account
              </p>
            </div>


            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {/* EMAIL FIELD */}
              <div>
                <div className="relative group">
                  <div className="input-icon">
                    <Mail className="absolute left-4 top-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Email Address"
                    className="w-full pl-12 pr-12 py-4 rounded-xl bg-gray-900/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all group-hover:border-gray-600"
                  />
                  {!formik.errors.email && formik.values.email && !emailError && (
                    <Check className="absolute right-4 top-4 text-green-400" size={18} />
                  )}
                </div>

                {/* Email Error Messages */}
                <div className="mt-2 space-y-1">
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-400 text-sm ml-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      {formik.errors.email}
                    </p>
                  )}

                  {emailError && (
                    <p className="text-red-400 text-sm ml-1 flex items-center gap-2 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      {emailError}
                    </p>
                  )}
                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <div className="relative group">
                  {/* Left Lock Icon */}
                  <div className="input-icon">
                    <Lock
                      className="absolute left-4 top-5 text-gray-400 group-focus-within:text-blue-400 transition-colors"
                      size={20}
                    />
                  </div>

                  {/* Input */}
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password"
                    className={`w-full pl-12 ${
                        !formik.errors.password &&
                        formik.values.password &&
                        !passwordError
                        ? "pr-20"
                        : "pr-12"
                      } py-4 rounded-xl bg-gray-900/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all group-hover:border-gray-600`}
                  />

                  {/* SUCCESS ICON (Key) → Eye ke left me */}
                  {formik.touched.password &&
                    !formik.errors.password &&
                    formik.values.password &&
                    !passwordError && (
                      <div className="absolute right-12 top-5">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                          <Key size={12} className="text-green-400" />
                        </div>
                      </div>
                    )}

                  {/* EYE ICON → Bilkul last */}
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-5 cursor-pointer text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>

                {/* Password Error Messages */}
                <div className="mt-2 space-y-1">
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-400 text-sm ml-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      {formik.errors.password}
                    </p>
                  )}

                  {passwordError && (
                    <p className="text-red-400 text-sm ml-1 flex items-center gap-2 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="mt-2 text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                  >
                    Forgot password? <ArrowRight size={14} />
                  </Link>
                </div>
              </div>


              {/* General Login Error */}
              {loginError && !emailError && !passwordError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Zap size={16} className="text-red-400" />
                    </div>
                    <p className="text-red-400 text-sm">{loginError}</p>
                  </div>
                </div>
              )}

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={isLoading || isAnimating}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />

                {isLoading || isAnimating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Sign In
                  </>
                )}
              </button>

            </form>

            {/* Bottom Links */}
            <div className="mt-2 pt-2 border-t border-gray-800">
              <div className="text-center">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors inline-flex items-center gap-1 group"
                  >
                    <Rocket size={16} className="group-hover:rotate-12 transition-transform" />
                    Create Account
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
          <Shield size={14} className="text-green-400" />
          <span>Your data is protected with 256-bit encryption</span>
        </div>
      </div>
    </div>
  );
};

export default Login;