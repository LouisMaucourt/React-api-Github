const Input = ({ placeholder, onChange, value }) => {
    return (
        <input type="text" placeholder={placeholder} value={value} onChange={onChange}></input>
    )
}

export default Input;