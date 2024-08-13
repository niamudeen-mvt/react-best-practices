
export default function Input({ type = 'text', value, handleOnChange }) {
  return <input
    type={type}
    className="border border-black py-2 px-8 rounded-md text-sm"
    value={value}
    onChange={handleOnChange}
    placeholder="Search products..."
  />
}
