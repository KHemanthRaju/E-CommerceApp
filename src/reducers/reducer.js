export const userReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...prevState,
        isLoggedIn: true,
        user: payload.foundUser,
        token: payload.encodedToken,
        orderHistory: [],
      };
    case "SIGNUP_SUCCESS":
      return {
        ...prevState,
        isLoggedIn: false,
        orderHistory: [],
      };
    case "LOGOUT_SUCCESS":
      return { ...prevState, isLoggedIn: false, user: {}, token: "" };
    case "ADD_ADDRESS":
      return { ...prevState, address: [...prevState.address, payload] };
    case "SELECT_ADDRESS":
      return {
        ...prevState,
        address: prevState.address.map((adds) =>
          adds.id === payload
            ? { ...adds, active: true }
            : { ...adds, active: false }
        ),
      };
    case "REMOVE_ADDRESS":
      return {
        ...prevState,
        address: prevState.address.filter(({ id }) => id !== payload),
      };
    case "ADD_ORDER":
      console.log(payload);
      return {
        ...prevState,
        orderHistory: [...prevState.orderHistory, payload],
      };
    default:
      return prevState;
  }
};
