const FormToggle = ({ formId, title, options, isOption1=true, onChange, containerClasses="col-span-2 sm:col-span-1", labelClasses, inputClassesOptions}) => {

  const handleChange = (event) => {
    const { value } = event.target;
    onChange(formId, value =='true'? false : true);
  }
  return (
    <div className={containerClasses}>
      <label className={labelClasses}>
        {title}
      </label>
      <button
        type="button"
        id={formId}
        value={isOption1}
        onClick={handleChange}
        className={isOption1 ? inputClassesOptions[0] : inputClassesOptions[1]}
      >
        {isOption1 ? options[0] : options[1]}
      </button>
    </div>
  )
}

export default FormToggle