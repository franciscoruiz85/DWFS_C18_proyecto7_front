import { useReducer } from "react"
import ProductContext from "./ProductContext";
import ProductReducer from "./ProductReducer";
import axiosClient from "../../config/axios";

export const ProductState = (props) => {
  const initialState = {
    products: [],
    currentProduct: {
      _id: null,
      idProd: '',
      slug: '',
      productname: '',
      type: '',
      cc: '',
      price: '',
      description: '',
      image: '',
    }
  };

  const [globalState, dispatch] = useReducer(ProductReducer, initialState);

  const addProduct = async (form) => {
    try {
      const res = await axiosClient.post("/products", form, {
        withCredentials: true
      });
      dispatch({
        type: "ADD_PRODUCT",
        payload: res.data
      })
      return true;
    } catch (error) {
      console.error(error.response.data.msg);
      return false
    }
  }

  const getProducts = async () => {
    try {
        const res = await axiosClient.get("/products");
        dispatch({
            type: "GET_PRODUCTS",
            payload: res.data.Products
        });
    } catch (error) {
        console.error(error);
    }
  }

  const setCurrentProduct = (productData) => {
    dispatch({
      type: "GET_PRODUCT",
      payload: productData
    })
  }

  return (
    <ProductContext.Provider
      value={{
        products: globalState.products,
        addProduct,
        getProducts,
        setCurrentProduct
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductState;
