const FormInput = ({ type = 'text', formId, title, value, onChange, placeholder = "Enter Text Here", containerClasses = "sm:col-span-2", labelClasses, inputClasses }) => {


  const handleChange = (event) => {
    const { value } = event.target;
    onChange(formId, value);
  }

  return (
    <div 
      className={containerClasses}
    >
      <label htmlFor={formId} className={labelClasses}>
        {title}
      </label>
      {formId == 'status' ? (
        <select
          type={type}
          id={formId}
          value={value}
          onChange={handleChange}
          className={inputClasses}
          placeholder={placeholder}
        >
          <option value="Open">Open</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      ) : (<input
        type={type}
        id={formId}
        value={value}
        onChange={handleChange}
        className={inputClasses}
        placeholder={placeholder}
      />)}
    </div>
  )
}

export default FormInput;