import { useReducer } from "react"
import ProductContext from "./ProductContext";
import ProductReducer from "./ProductReducer";
import axiosClient from "../../config/axios";

export const ProductState = (props) => {
  const initialState = {
    currentProduct: {
      _id: null,
      idProd: "",
      slug: "",
      productname: "",
      type: "",
      cc: "",
      price: "",
      description: "",
      image: ""
    },
    products: [],
    bestProducts: []
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
      const res = await axiosClient.get("/products", {
        withCredentials: true
      });
      dispatch({
          type: "GET_PRODUCTS",
          payload: res.data.Products
      });
    } catch (error) {
      console.error(error);
    }
  }

  const getBestProducts = async () => {
    try {
      const res = await axiosClient.get("/products/best-products", {
        withCredentials: true
      });
      dispatch({
          type: "GET_BESTPRODUCTS",
          payload: res.data.Products
      });
    } catch (error) {
      console.error(error);
    }
  }

  const getProduct = async (product_id) => {
    try {
      const res = await axiosClient.get(`/products/${product_id}`, {
        withCredentials: true
      })
      dispatch({
        type: "GET_PRODUCT",
        payload: res.data
      })
    } catch (error) {
      console.log(error);
    }
  }

  const updateProduct = async (form) => {
    try {
      await axiosClient.put("/products/update", form, {
        withCredentials: true
      })
      dispatch({
        type:"UPDATE_PRODUCT"
      })

      await getProducts();
      return true
    } catch (error) {
      console.error(error.response.data.msg);
      return false
    }
  }

  const deleteProduct = async (data) => {
    try {
      const res = await axiosClient.delete("/products/", {
        data: { id: data },
        withCredentials: true
      });

      await getProducts();

      return res.data.msg
    } catch (error) {
      console.log(error);
      return
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
        currentProduct: globalState.currentProduct,
        products: globalState.products,
        bestProducts: globalState.bestProducts,
        addProduct,
        getProducts,
        getBestProducts,
        getProduct,
        updateProduct,
        deleteProduct,
        setCurrentProduct
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export default ProductState;
