export default function Input({ isTextarea, label, ...props }) {
    return (
        <p>
            <label>{label}</label>
            {isTextarea ? (
                <textarea {...props}></textarea>
            ) : (
                <input {...props} />
            )}
        </p>
    );
}
