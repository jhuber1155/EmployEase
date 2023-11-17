const FormInput = ({ type = 'text', formId, title, value, onChange, placeholder = "Enter Text Here", containerClasses="sm:col-span-2", labelClasses, inputClasses, required=false }) => {

  const handleChange = (event) => {
    const { value } = event.target;
    onChange(formId, value);
  }

  return (
    <div className={containerClasses}>
      <label htmlFor={formId} className={labelClasses}>
        {title}
      </label>
      <input
        // {required ? "required" : ""}
        type={type}
        id={formId}
        value={value}
        onChange={handleChange}
        className={inputClasses}
        placeholder={placeholder}
      />
    </div>
  )
}

export default FormInput;