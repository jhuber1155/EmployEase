import DatePicker from "react-datepicker";

const FormInput = ({ type = 'text', formId, title, value, onChange, placeholder = "Enter Text Here" }) => {

  const handleChange = (event) => {
    const { value } = event.target;
    onChange(formId, value);
  }

  return (
    <div className="sm:col-span-2">
      <label htmlFor={formId} className="block text-sm font-semibold leading-6 text-gray-900">
        {title}
      </label>
      <div className="mt-2.5">
        <input
          type={type}
          id={formId}
          value={value}
          onChange={handleChange}
          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default FormInput;