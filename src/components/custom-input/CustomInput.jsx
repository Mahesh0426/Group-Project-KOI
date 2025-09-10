const CustomInput = ({
  label,
  placeholder,
  name,
  type,
  icon,
  value,
  onChange,
  error,
}) => (
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
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full p-3 pl-10 border-2 rounded-lg border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-200 outline-none transition`}
      />
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
export default CustomInput;
