import React, { useReducer } from "react";
import axios from "axios";
function Form() {
    const [value, dispatch] = useReducer(reducer, {
        email: "",
        loading: false,
        success: false,
        errors: [],
    });
    function handleChange(e) {
        dispatch({ type: "UPDATE", payload: { data: e.target.value } });
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch({ type: "LOADING" });
        console.log(`Email: ${value.email} submitted`);
        axios
            .post("http://localhost:4040/api/user", {
                data: { email: value.email },
            })
            .then((res) => {
                console.log({ res });
                dispatch({ type: "SUCCESS" });
            })
            .catch((err) => {
                console.log({ err });
                if (err.response !== undefined)
                    dispatch({
                        type: "ERROR",
                        payload: { data: err.response.data.errors.body[0] },
                    });
            });
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
