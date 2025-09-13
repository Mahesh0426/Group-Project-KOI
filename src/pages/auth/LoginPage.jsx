import { Mail, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import CustomInput from "../../components/custom-input/CustomInput";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import LoadingSpinner from "../../components/helper/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../redux/auth/userAction";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, handleOnChange, setFormData } = useForm({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    dispatch(loginUserAction(formData));
    setFormData({ email: "", password: "" });
  };
  // Logic For redirecting after login
  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.id) {
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "learner":
          navigate("/");
          break;
      }
    }
  }, [user?.id, user?.role, navigate]);

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
            onClick={() => navigate("/signup")}
            className="self-start px-6 py-3 bg-white text-blue-500 font-semibold rounded-xl hover:shadow-lg transition duration-300"
          >
            Create an Account
          </button>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Login to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <CustomInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              value={formData.email}
              onChange={handleOnChange}
              error={errors.email}
              autoComplete="current-email"
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
              autoComplete="current-password"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-tr from-blue-400 to-cyan-400 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition duration-300"
            >
              {isLoading ? <LoadingSpinner /> : "Login"}
            </button>
          </form>
          <p className="mt-3 text-center text-sm text-gray-500">
            Don't have an account?
            <a
              href="/signup"
              className="ml-2 font-semibold text-cyan-600 hover:text-cyan-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
