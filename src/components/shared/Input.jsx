export default function Input({
    name,
    type = 'text',
    value,
    handleOnChange,
    label,
    placeholder,
}) {
    return (
        <div className="space-y-2 text-xs">
            {label && <label className="capitalize">{label}</label>}
            <input
                type={type}
                name={name}
                className="custom_input"
                value={value}
                onChange={handleOnChange}
                placeholder={placeholder}
                autoComplete="off"
            />
        </div>
    );
}
