import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  registerUser,
  fetchCompanySuggestions,
  resetAuthState,
} from "../../Redux/Authentication/AuthSlice";
import { gsap } from "gsap";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Building2,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Target,
  Users,
  Shield,
  Zap,
  Globe,
  ChevronRight,
  ChevronLeft,
  Star,
  Rocket,
} from "lucide-react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const progressBarRef = useRef(null);
  const particlesRef = useRef(null);

  const { isLoading, isSuccess, isError, message, companySuggestions } =
    useSelector((state) => state.authentication);

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [companyExists, setCompanyExists] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Particle animation
  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = [];
    const ctx = particlesRef.current.getContext("2d");
    particlesRef.current.width = particlesRef.current.parentElement.offsetWidth;
    particlesRef.current.height = particlesRef.current.parentElement.offsetHeight;

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * particlesRef.current.width,
        y: Math.random() * particlesRef.current.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.3 + 0.1,
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
        ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 80, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1, 
        ease: "back.out(1.7)",
        onComplete: () => {
          gsap.to(".floating-icon", {
            y: 10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.2
          });
        }
      }
    );

    // Animate progress bar
    gsap.to(progressBarRef.current, {
      width: step === 1 ? "50%" : "100%",
      duration: 0.8,
      ease: "power3.out"
    });
  }, [step]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      role: "admin",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Minimum 2 characters")
        .max(50, "Maximum 50 characters")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(/[A-Z]/, "Must contain uppercase letter")
        .matches(/[a-z]/, "Must contain lowercase letter")
        .matches(/\d/, "Must contain number")
        .matches(/[@$!%*?&]/, "Must contain special character")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
      companyName: Yup.string()
        .min(2, "Minimum 2 characters")
        .required("Company required"),
    }),
    onSubmit: async (values) => {
      setIsAnimating(true);
      await dispatch(registerUser(values));
      setIsAnimating(false);
    },
  });

  // Success
  useEffect(() => {
    if (isSuccess) {
      gsap.to(".success-confetti", {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1
      });
      
      setTimeout(() => {
        toast.success("Registration Successful! Welcome aboard! 🚀");
        dispatch(resetAuthState());
        navigate("/login");
      }, 1500);
    }
  }, [isSuccess, dispatch, navigate]);

  // Error
  useEffect(() => {
    if (isError) {
      toast.error(message || "Something went wrong");
      dispatch(resetAuthState());
    }
  }, [isError, message, dispatch]);

  // Company Suggestion
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (formik.values.companyName.length > 2) {
        dispatch(fetchCompanySuggestions(formik.values.companyName));
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [formik.values.companyName, dispatch]);

  useEffect(() => {
    const exists = companySuggestions?.some(
      (c) =>
        c.name.toLowerCase() ===
        formik.values.companyName.toLowerCase()
    );
    setCompanyExists(exists);
    formik.setFieldValue("role", exists ? "member" : "admin");
  }, [companySuggestions, formik.values.companyName]);

  const handleNext = async () => {
    const errors = await formik.validateForm();
    const step1Fields = ['name', 'email', 'password', 'confirmPassword'];
    
    const hasErrors = step1Fields.some(field => errors[field]);
    
    if (!hasErrors) {
      gsap.to(cardRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setStep(2);
          gsap.fromTo(cardRef.current,
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.3 }
          );
        }
      });
    } else {
      formik.setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
      });
    }
  };

  const handleBack = () => {
    gsap.to(cardRef.current, {
      x: 20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setStep(1);
        gsap.fromTo(cardRef.current,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 }
        );
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0f] via-[#111827] to-[#1e1b4b] overflow-hidden px-4 relative">
      {/* Animated Background Elements */}
      <canvas ref={particlesRef} className="absolute inset-0 w-full h-full" />
      
      {/* Floating Icons */}
      <div className="floating-icon absolute top-1/4 left-1/4 text-blue-400/20">
        <Globe size={40} />
      </div>
      <div className="floating-icon absolute top-1/3 right-1/4 text-purple-400/20">
        <Shield size={36} />
      </div>
      <div className="floating-icon absolute bottom-1/3 left-1/3 text-cyan-400/20">
        <Users size={32} />
      </div>

      {/* Success Confetti */}
      <div className="success-confetti absolute inset-0 opacity-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <Star size={16} className="text-yellow-400" />
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-400' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-400 bg-blue-400/10' : 'border-gray-600'}`}>
                {step >= 1 ? <Check size={20} /> : <User size={20} />}
              </div>
              <span className="ml-3 font-medium">Personal Info</span>
            </div>
            
            <div className="flex-1 mx-6 relative">
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: step === 1 ? '50%' : '100%' }}
                />
              </div>
            </div>
            
            <div className={`flex items-center ${step >= 2 ? 'text-purple-400' : 'text-gray-500'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-purple-400 bg-purple-400/10' : 'border-gray-600'}`}>
                {step >= 2 ? <Check size={20} /> : <Building2 size={20} />}
              </div>
              <span className="ml-3 font-medium">Company</span>
            </div>
          </div>
          
          <div className="text-center">
            <span className="text-sm text-gray-400">
              Step {step} of 2 • {step === 1 ? 'Personal Details' : 'Company Setup'}
            </span>
          </div>
        </div>

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
                <Rocket size={32} className="text-blue-400" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Join Our Platform
              </h2>
              <p className="text-gray-400 mt-2">
                {step === 1 ? "Let's start with your personal information" : "Now, tell us about your company"}
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  <div className="space-y-4">
                    <InputField
                      icon={<User className="text-blue-400" />}
                      placeholder="Full Name"
                      name="name"
                      formik={formik}
                    />

                    <InputField
                      icon={<Mail className="text-purple-400" />}
                      placeholder="Email Address"
                      name="email"
                      type="email"
                      formik={formik}
                    />

                    <PasswordField
                      name="password"
                      placeholder="Create Password"
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      formik={formik}
                    />

                    <PasswordField
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      formik={formik}
                    />
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300 mb-2">Password must contain:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { rule: /[A-Z]/, text: "Uppercase letter", met: /[A-Z]/.test(formik.values.password) },
                        { rule: /[a-z]/, text: "Lowercase letter", met: /[a-z]/.test(formik.values.password) },
                        { rule: /\d/, text: "Number", met: /\d/.test(formik.values.password) },
                        { rule: /[@$!%*?&]/, text: "Special character", met: /[@$!%*?&]/.test(formik.values.password) },
                        { rule: /.{8,}/, text: "8+ characters", met: formik.values.password.length >= 8 },
                        { rule: /.{12,}/, text: "12+ characters (strong)", met: formik.values.password.length >= 12 }
                      ].map((req, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${req.met ? 'bg-green-500' : 'bg-gray-600'}`} />
                          <span className={req.met ? 'text-green-400' : 'text-gray-400'}>{req.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl"
                  >
                    <span>Continue to Company Details</span>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-6">
                    {/* Company Input with Suggestions */}
                    <div>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-4 text-cyan-400" size={20} />
                        <input
                          type="text"
                          name="companyName"
                          value={formik.values.companyName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Enter Company Name"
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-900/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        />
                      </div>
                      
                      {formik.touched.companyName && formik.errors.companyName && (
                        <p className="text-red-400 text-sm mt-2 ml-1">
                          {formik.errors.companyName}
                        </p>
                      )}

                      {/* Suggestions */}
                      {companySuggestions?.length > 0 && (
                        <div className="mt-4 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-xl">
                          <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
                            <p className="text-sm text-gray-300">Select existing company</p>
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {companySuggestions.map((c) => (
                              <div
                                key={c._id}
                                onClick={() => {
                                  formik.setFieldValue("companyName", c.name);
                                  gsap.to(`.company-${c._id}`, {
                                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                                    duration: 0.3
                                  });
                                }}
                                className={`company-${c._id} px-4 py-3 hover:bg-blue-500/10 cursor-pointer border-b border-gray-800 last:border-b-0 transition-colors flex items-center gap-3`}
                              >
                                <Building2 size={16} className="text-gray-400" />
                                <span>{c.name}</span>
                                <span className="ml-auto text-xs text-gray-500">Click to select</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Role Selection */}
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                          Select Your Role
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div
                            onClick={() => !companyExists && formik.setFieldValue("role", "admin")}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formik.values.role === "admin" ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-500'} ${companyExists ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${formik.values.role === "admin" ? 'bg-blue-500/20' : 'bg-gray-800'}`}>
                                <Shield className="text-blue-400" size={20} />
                              </div>
                              <div>
                                <p className="font-medium">Administrator</p>
                                <p className="text-xs text-gray-400 mt-1">Create new company</p>
                              </div>
                            </div>
                          </div>

                          <div
                            onClick={() => companyExists && formik.setFieldValue("role", "member")}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formik.values.role === "member" ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700 hover:border-gray-500'} ${!companyExists ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${formik.values.role === "member" ? 'bg-purple-500/20' : 'bg-gray-800'}`}>
                                <Users className="text-purple-400" size={20} />
                              </div>
                              <div>
                                <p className="font-medium">Team Member</p>
                                <p className="text-xs text-gray-400 mt-1">Join existing team</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Role Description */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-900/50 rounded-xl p-4 border border-gray-700">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <Zap size={20} className="text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-200">
                            {formik.values.role === "admin" ? "Administrator Access" : "Team Member Access"}
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            {formik.values.role === "admin" 
                              ? "As an administrator, you'll have full control over company settings, user management, and billing."
                              : "As a team member, you'll be able to collaborate with your team using company resources."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all duration-300 font-medium flex items-center justify-center gap-3 group"
                    >
                      <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading || isAnimating}
                      className="flex-1 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading || isAnimating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <Rocket size={20} />
                          Complete Registration
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Bottom Links */}
            <div className="mt-8 pt-6 border-t border-gray-800 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  LogIn
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ icon, placeholder, name, formik, type = "text" }) => (
  <div>
    <div className="relative group">
      <span className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-400 transition-colors">
        {icon}
      </span>
      <input
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-900/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all group-hover:border-gray-600"
      />
      {formik.touched[name] && !formik.errors[name] && formik.values[name] && (
        <Check className="absolute right-4 top-4 text-green-400" size={18} />
      )}
    </div>
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-400 text-sm mt-2 ml-1 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
        {formik.errors[name]}
      </p>
    )}
  </div>
);

const PasswordField = ({
  name,
  placeholder,
  showPassword,
  setShowPassword,
  formik,
}) => (
  <div>
    <div className="relative group">
      <Lock className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" size={20} />
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-4 rounded-xl bg-gray-900/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all group-hover:border-gray-600"
      />
      {formik.touched[name] && !formik.errors[name] && formik.values[name] && (
        <Check className="absolute right-10 top-4 text-green-400" size={18} />
      )}
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-4 cursor-pointer text-gray-400 hover:text-white transition-colors"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </span>
    </div>
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-400 text-sm mt-2 ml-1 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
        {formik.errors[name]}
      </p>
    )}
  </div>
);

export default Register;