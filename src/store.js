import { configureStore } from "@reduxjs/toolkit";
import pedidosReducer from "./slices/pedidosSlice";

export const store = configureStore({
  reducer: {
    pedido: pedidosReducer
  },
});
