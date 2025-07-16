const ProductReducer = (globalState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...globalState,
        authStatus: true,
        mensaje: "Producto registrado correctamente."
      }
    case "GET_PRODUCTS":
      return {
        ...globalState,
        products: action.payload
      };
    case "GET_PRODUCT":
      return {
        ...globalState,
        currentProduct: action.payload
      };
    case "UPDATE_PRODUCT":
      break;
    case "DELETE_PRODUCT":
      break;
    default:
      return globalState;
  }
};

export default ProductReducer;
