const UserReducer = (globalState, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...globalState,
        mensaje: "Usuario registrado correctamente."
      };
    case "LOGIN_USER":
      return {
        ...globalState,
        authStatus: true
      };
    case "GET_USER_DATA":
      return {
        ...globalState,
        authStatus: true,
        currentUser: action.payload
      };
    case "GET_USERS":
      return {
        ...globalState,
        users: action.payload
      }
    case "LOGOUT_USER":
      return {
        ...globalState,
        currentUser: {
          username: "",
          email: "",
          country: "",
          address: "",
          phone: "",
          role: 1
        },
        authStatus: false,
        cart: [],
        users: [],
        sessionURL: null,
        globalLoading: false,
        products: [],
        msg: action.payload
      };
    case "GET_CART":
      return {
        ...globalState,
        cart: action.payload
      };
    case "GET_CHECKOUT":
      return {
        ...globalState,
        sessionURL: action.payload
      };
    case "CLEAR_CART":
      return {
        ...globalState,
        currentUser: {
          username: "",
          email: "",
          country: "",
          address: "",
          phone: "",
          role: 1
        },
        authStatus: false,
        cart: [],
        sessionURL: null,
        globalLoading: false
      }
    case "CHANGE_LOADING":
      return {
        ...globalState,
        globalLoading: action.payload
      };
    default:
      return globalState;
  }
};

export default UserReducer;
