import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    program: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
    newsletter: false,
    privacy: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {};
    if (!formData.parentName) newErrors.parentName = "Parent name is required";
    if (!formData.childName) newErrors.childName = "Child name is required";
    if (!formData.childAge) newErrors.childAge = "Child age is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.inquiryType)
      newErrors.inquiryType = "Inquiry type is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.privacy)
      newErrors.privacy = "You must agree to privacy policy";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      // Prepare form data for Web3Forms
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, value);
      });

      // Add your Web3Forms access key
      fd.append("access_key", import.meta.env.VITE_WEB3FORM_ACCESS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          parentName: "",
          childName: "",
          childAge: "",
          program: "",
          email: "",
          phone: "",
          inquiryType: "",
          message: "",
          newsletter: false,
          privacy: false,
        });
      } else {
        console.error("Web3Forms error:", data);
        alert("Something went wrong: " + data.message);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit form. Please try again later.");
    }
  };

  return (
    <main>
      <section className="py-16 bg-gray-50 px-4 max-w-[1200px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-900">Get in Touch</h2>
            <p className="text-gray-700">
              We'd love to hear from you! Whether you have questions about our
              programs, want to schedule a visit, or are ready to enroll your
              child, we're here to help.
            </p>

            <div className="space-y-6 mt-6">
              <ContactItem
                icon={<Mail className="w-6 h-6 text-blue-500" />}
                title="Email"
                link="mailto:info@stemexplorers.com"
                text="info@stemexplorers.com"
              />
              <ContactItem
                icon={<Phone className="w-6 h-6 text-blue-500" />}
                title="Phone"
                link="tel:+15551234STEM"
                text="(555) 123-STEM"
              />
              <ContactItem
                icon={<MapPin className="w-6 h-6 text-blue-500" />}
                title="Address"
                text="📍 Levels 1 and 2, 17 O’Connell Street Sydney, NSW, 2000"
              />
              <ContactItem
                icon={<Clock className="w-6 h-6 text-blue-500" />}
                title="Hours"
                text={`Mon-Fri: 3 PM - 7 PM\nSat: 9 AM - 5 PM\nSun: 10 AM - 4 PM`}
              />

              <div className="mt-6">
                <h3 className="text-blue-900 font-semibold mb-2">Follow Us</h3>
                <div className="flex flex-wrap gap-3">
                  <SocialLink
                    icon={<Facebook className="w-5 h-5" />}
                    label="Facebook"
                    href="https://www.facebook.com/"
                  />
                  <SocialLink
                    icon={<Instagram className="w-5 h-5" />}
                    label="Instagram"
                    href="https://www.instagram.com/"
                  />
                  <SocialLink
                    icon={<Twitter className="w-5 h-5" />}
                    label="Twitter"
                    href="https://x.com/home"
                  />
                  <SocialLink
                    icon={<Youtube className="w-5 h-5" />}
                    label="YouTube"
                    href="https://www.youtube.com/"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Send Us a Message
            </h2>
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg space-y-4"
              >
                <FormInput
                  label="Parent/Guardian Name *"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  error={errors.parentName}
                />
                <FormInput
                  label="Child's Name *"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  error={errors.childName}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormSelect
                    label="Child's Age *"
                    name="childAge"
                    value={formData.childAge}
                    onChange={handleChange}
                    options={["8", "9", "10", "11", "12", "13", "14"]}
                    error={errors.childAge}
                  />
                  <FormSelect
                    label="Program Interest"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    options={[
                      "Robotics & Coding",
                      "Chemistry Lab",
                      "Engineering Design",
                      "Math Magic & Logic",
                      "Multiple Programs",
                      "Not sure yet",
                    ]}
                  />
                </div>

                <FormInput
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <FormInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />

                <FormSelect
                  label="Type of Inquiry *"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  options={[
                    "Program Enrollment",
                    "General Information",
                    "Schedule a Visit",
                    "Feedback",
                    "Other",
                  ]}
                  error={errors.inquiryType}
                />

                <FormTextarea
                  label="Message *"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  placeholder="Tell us about your child's interests, any questions you have, or how we can help..."
                />

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-blue-500"
                  />
                  <label htmlFor="newsletter" className="text-gray-700 text-sm">
                    Subscribe to our newsletter for STEM tips and program
                    updates
                  </label>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-blue-500"
                  />
                  <label htmlFor="privacy" className="text-gray-700 text-sm">
                    I agree to the{" "}
                    <a
                      href="#"
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to being contacted *
                  </label>
                </div>
                {errors.privacy && (
                  <p className="text-red-500 text-sm">{errors.privacy}</p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-tr from-blue-400 to-cyan-400 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition duration-300"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="bg-green-600 text-white p-6 rounded-2xl text-center space-y-2">
                <h3 className="text-xl font-semibold">
                  Thank you for your message!
                </h3>
                <p>
                  We've received your inquiry and will get back to you within 24
                  hours. We're excited to help your child start their STEM
                  journey!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;

// Reusable components
const ContactItem = ({ icon, title, text, link }) => (
  <div className="flex items-start gap-4">
    <div>{icon}</div>
    <div>
      <h3 className="text-blue-900 font-semibold mb-1">{title}</h3>
      {link ? (
        <a href={link} className="text-blue-400 font-medium">
          {text}
        </a>
      ) : (
        <p className="text-gray-700 whitespace-pre-line">{text}</p>
      )}
    </div>
  </div>
);

const SocialLink = ({ icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gradient-to-tr hover:from-blue-400 hover:to-cyan-400 hover:text-white transition"
  >
    {icon} <span className="text-sm">{label}</span>
  </a>
);

const FormInput = ({ label, name, type = "text", value, onChange, error }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`p-3 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FormSelect = ({ label, name, value, onChange, options = [], error }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`p-3 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none`}
    >
      <option value="">Select {label}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.toLowerCase()}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const FormTextarea = ({ label, name, value, onChange, placeholder, error }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={5}
      className={`p-3 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none resize-vertical`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
