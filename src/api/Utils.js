export const prepareHeaders = (headers) => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
};