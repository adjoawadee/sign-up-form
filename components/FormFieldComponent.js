export default function FormFieldComponent(props) {
    const {id, type, label, placeholder, value, name, onChange, required, error, errorMessageTestId} = props;
    return(
        <div className="mb-4">
            <label 
                htmlFor={name}
                className="block text-gray-700 font-bold mb-2"
            >{label}</label>
            <input
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                id={id}
                type={type}
                label={label}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
            {error && <p data-testid={errorMessageTestId} className="text-red-500">{error}</p>}
        </div>
)}