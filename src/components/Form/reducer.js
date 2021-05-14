export default function reducer(prevState, action) {
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