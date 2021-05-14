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
        <div className="card">
            <h1 className="card__h1">Subscribe via Email</h1>
            <form className="card__form">
                <input
                    className="card__form__input"
                    onChange={handleChange}
                    value={value.email}
                    name="email"
                    placeholder="your@email.com"
                />
                <button
                    className="card__form__btn"
                    onClick={handleSubmit}
                >
                    {value.loading?"Loading...":"Submit"}
                </button>
            </form>
            {value.errors.length > 0 && (
                <span className="card__span card__span--red">
                    {value.errors[0]}
                </span>
            )}
            {value.success && (
                <span className="card__span card__span--green">
                    SUCCESSFULLY SUBSCRIBED
                </span>
            )}
        </div>
    );
}

function reducer(prevState, action) {
    switch (action.type) {
        case "LOADING":
            return { ...prevState, loading: true, success: false };
        case "SUCCESS":
            return { ...prevState, success: true, loading: false, errors: [] };
        case "UPDATE":
            return { ...prevState, email: action.payload.data };
        case "ERROR":
            return {
                ...prevState,
                errors: [action.payload.data],
                loading: false,
            };
        default:
            return { ...prevState };
    }
}

export default Form;
