import { Mail, Lock, User } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!isLogin && !formData.name) newErrors.name = "Name is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(isLogin ? "Login Data" : "Signup Data", formData);
      alert(`Success! ${isLogin ? "Logged in" : "Signed up"}`);
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
            onClick={() => setIsLogin(!isLogin)}
            className="self-start px-6 py-3 bg-white text-blue-500 font-semibold rounded-xl hover:shadow-lg transition duration-300"
          >
            {isLogin ? "Create an Account" : "Already have an account?"}
          </button>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            {isLogin ? "Login to your account" : "Sign up for STEM Club"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <InputField
                label="Full Name"
                name="name"
                type="text"
                icon={<User className="w-5 h-5 text-gray-400" />}
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
            )}

            <InputField
              label="Email Address"
              name="email"
              type="email"
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              icon={<Lock className="w-5 h-5 text-gray-400" />}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-tr from-blue-400 to-cyan-400 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition duration-300"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className="my-6 flex items-center justify-center gap-3 text-gray-400">
            OR
          </div>

          <p className="text-gray-500 text-sm mt-6 text-center">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-500 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
const InputField = ({ label, name, type, icon, value, onChange, error }) => (
  <div className="flex flex-col">
    <label className="font-semibold text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
        {icon}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full p-3 pl-10 border-2 rounded-lg border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition`}
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SocialButton = ({ icon, label }) => (
  <button className="flex items-center justify-center gap-2 flex-1 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-100 transition">
    {icon} <span className="text-gray-700 font-medium">{label}</span>
  </button>
);
