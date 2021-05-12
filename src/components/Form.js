import React, { useReducer } from "react";

function Form() {
    const [value, dispatch] = useReducer(reducer, {
        email: "",
        loading: false,
        errors: [],
    });
    function handleChange(e) {
        dispatch({ type: "UPDATE", payload: { data: e.target.value } });
    }
    function handleSubmit() {
        dispatch("CLEARERROR");
        console.log(`Email: ${value.email} submitted`);
    }
    return (
        <div className="form">
            <input
                className=""
                onChange={handleChange}
                value={value.email}
                name="email"
                placeholder="Email"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

function reducer(prevState, action) {
    switch (action.type) {
        case "LOADING":
            return { ...prevState, loading: true };
        case "UPDATE":
            return { ...prevState, email: action.payload.data };
        case "CLEARERROR":
            return { ...prevState, errors: [] };
        default:
            return { ...prevState };
    }
}

export default Form;
