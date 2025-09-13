import React, { useState } from "react";
import CustomInput from "../../components/custom-input/CustomInput";
import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import { toast } from "react-toastify";
import { createUser } from "../../axios/authaxios";
import LoadingSpinner from "../../components/helper/LoadingSpinner";
import { Mail, User, Lock } from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();
  const { formData, handleOnChange, setFormData } = useForm({
    username: "",
    email: "",
    password: "",
  });
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.username) newErrors.username = "Username is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        startLoading();
        const result = await createUser(formData);
        console.log("Signup response:", result);
        if (result || result.success === true || result.status === "success") {
          toast.success(result?.message || "Signup successful! Please log in.");
          setFormData({ username: "", email: "", password: "" });
          navigate("/login");
        } else {
          const message = result?.message || "Signup failed";
          toast.error(message);
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("An error occurred during signup. Please try again.");
      } finally {
        stopLoading();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side - Info / Illustration */}
        <div className="lg:w-1/2 bg-gradient-to-tr from-blue-400 to-cyan-400 text-white flex flex-col justify-center p-10">
          <h2 className="text-4xl font-bold mb-4">STEM Explorers Club</h2>
          <p className="text-lg mb-6">
            Empowering young minds through robotics, chemistry, engineering, and
            math. Join our STEM journey today!
          </p>
          <button
            onClick={() => navigate("/login")}
            className="self-start px-6 py-3 bg-white text-blue-500 font-semibold rounded-xl hover:shadow-lg transition duration-300"
          >
            already have an account
          </button>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Sign up for STEM Club
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <CustomInput
              label="Full Name"
              name="username"
              type="text"
              placeholder="Enter your full name"
              icon={<User className="w-5 h-5 text-gray-400" />}
              value={formData.username}
              onChange={handleOnChange}
              error={errors.username}
            />

            <CustomInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              value={formData.email}
              onChange={handleOnChange}
              error={errors.email}
            />
            <CustomInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              value={formData.password}
              onChange={handleOnChange}
              error={errors.password}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-tr from-blue-400 to-cyan-400 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition duration-300"
            >
              {isLoading ? <LoadingSpinner /> : "Sign Up"}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have Account?
            <a
              href="/login"
              className="ml-2 font-semibold text-cyan-600 hover:text-cyan-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
