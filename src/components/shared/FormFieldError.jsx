export default function FormFieldError({ message = '' }) {
    return <p className="text-red-500 text-xs">{message.toString()}</p>;
}
