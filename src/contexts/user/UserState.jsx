import { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import axiosClient from "../../config/axios";

export const UserState = (props) => {
  const initialState = {
    users: [],
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
  };

  const [globalState, dispatch] = useReducer(UserReducer, initialState);

  const registerUser = async (form) => {
    try {
      const res = await axiosClient.post("/users/create", form);
      dispatch({
        type: "REGISTER_USER",
        payload: res.data
      });
      return true;
    } catch (error) {
      console.error(error.response.data.msg);
      return false
    }
  }

  const loginUser = async (form) => {
    try {
      await axiosClient.post("/users/login", form, {
        withCredentials: true
      });
      dispatch({
        type: "LOGIN_USER"
      });
      return;
    } catch (error) {
      return error.response.data.msg;
    }
  }

  const verifyUser = async () => {
    try {
      const res = await axiosClient.get("/users/verify-user", {
        withCredentials: true
      })
      dispatch({
        type: "GET_USER_DATA",
        payload: res.data.user
      });
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const getUsers = async () => {
    try {
      const res = await axiosClient.get("/users/", {
        withCredentials: true
      })
      dispatch({
        type: "GET_USERS",
        payload: res.data.users
      });
    } catch (error) {
      console.log(error)
      return;
    }
  } 

  const updateUser = async (formData) => {
    await axiosClient.put('/users/update', formData, {
      withCredentials: true
    })
  }

  const adminUser = async (data) => {
    try {
      const res = await axiosClient.put("users/admin-user", data, {
        withCredentials:true
      })

      await getUsers();

      return res.data.msg
    } catch (error) {
      console.log(error)
      return
    }
  }
  
  const deleteUser = async (data) => {
    try {
      const res = await axiosClient.put("users/delete-user", data, {
        withCredentials:true
      })

      await getUsers();

      return res.data.msg
    } catch (error) {
      console.log(error)
      return
    }
  }

  const logoutUser = async (navigate) => {
    try {
      await axiosClient.post("/users/logout", {}, {
        withCredentials: true
      });
      dispatch({
        type: "LOGOUT_USER",
        payload: "Sesión cerrada correctamente"
      });
      navigate("inicio-sesion");
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  const editCart = async (data) => {
    try {
      const res = await axiosClient.put("carts/edit-cart", { products: data }, {
        withCredentials: true
      })

      await getCart();

      return res.data.msg
    } catch (error) {
      console.log(error)
      return
    }
  }

  const getCart = async () => {
    try {
      const res = await axiosClient.get("/carts/get-cart", {
        withCredentials: true
      })
      dispatch({
        type: "GET_CART",
        payload: res.data.cart.products
      })
    } catch (error) {
      console.log(error)
      return
    }
  }

  const getCheckout = async () => {
    try {
      const res = await axiosClient.get('/carts/checkout', {
        withCredentials: true
      })
      dispatch({
        type: "GET_CHECKOUT",
        payload: res.data.session_url
      })
    } catch (error) {
      console.log(error)
      return
    }
  }

  const clearCart = async () => {
    try {
      await axiosClient.get("carts/clear-cart", {
        withCredentials: true
      })
  
      await getCart();
    } catch (error) {
      console.log(error)
      return
    }
  }

  const setLoading = (status) => {
    dispatch({
      type: "CHANGE_LOADING",
      dispatch: status
    })
  }

  return (
    <UserContext.Provider
      value={{
        users: globalState.users,
        currentUser: globalState.currentUser,
        cart: globalState.cart,
        authStatus: globalState.authStatus,
        sessionURL: globalState.sessionURL,
        globalLoading: globalState.globalLoading,
        registerUser,
        loginUser,
        verifyUser,
        updateUser,
        getUsers,
        adminUser,
        deleteUser,
        logoutUser,
        editCart,
        getCart,
        getCheckout,
        clearCart,
        setLoading
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;
