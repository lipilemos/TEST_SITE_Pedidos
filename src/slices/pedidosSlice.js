import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pedidosService from "../services/pedidosService";

const initialState = {
  pedidos: [],
  pedido: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};
export const insertPedido = createAsyncThunk(
  "pedido/insert",
  async (form, thunkAPI) => {      
    //para usar token na requisição
    //const token = thunkAPI.getState().auth.user.token;  
    const data = await pedidosService.insertPedido(form);
    // Check for errors
    if (data.errors) 
      return thunkAPI.rejectWithValue(data.errors[0]);

    return data;
  }
);
export const getPedidoById = createAsyncThunk(
  "pedido/getbyid",
  async (id, thunkAPI) => {    
    const data = await pedidosService.getPedidoById(id);
    // Check for errors
    if (data.errors) 
      return thunkAPI.rejectWithValue(data.errors[0]);    

    return data;
  }
);
export const getAllPedidos = createAsyncThunk(
  "pedido/getall",
  async (_, thunkAPI) => {
  //const token = thunkAPI.getState().auth.user.token;
  const data = await pedidosService.getAllPedidos();

  // Check for errors
  if (data.errors) 
    return thunkAPI.rejectWithValue(data.errors[0]);
  
  return data;
});
export const deletePedido = createAsyncThunk(
  "pedido/delete",
  async (id, thunkAPI) => {
    const data = await pedidosService.deletePedido(id);
    // Check for errors
    if (data.errors) 
      return thunkAPI.rejectWithValue(data.errors[0]);
    
    return data;
  }
);
export const updatePedido = createAsyncThunk(
  "pedido/update",
  async (form, thunkAPI) => {
    const data = await pedidosService.updatePedido(form);
    // Check for errors
    if (data.errors) 
      return thunkAPI.rejectWithValue(data.errors[0]);
    
    return data;
  }
);

export const pedidosSlice = createSlice({
  name: "pedido",
  initialState,
  reducers: {
    resetPedido: (state) => {
      state.message = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(insertPedido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertPedido.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.pedido = action.payload;
        state.message = "Pedido incluso com sucesso!";
      })
      .addCase(insertPedido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.pedido = null;
      })      
      .addCase(getPedidoById.pending, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(getPedidoById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.pedido = action.payload;
      })
      .addCase(getAllPedidos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPedidos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.pedidos = action.payload;
      })      
      .addCase(deletePedido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePedido.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.pedidos.filter((pedido) => {
          return pedido._id !== action.payload.id;
        });   
      })
      .addCase(deletePedido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.pedido = null;
      })
      .addCase(updatePedido.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePedido.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.pedido = action.payload
        state.message = "Atualizado com sucesso";
      })
      .addCase(updatePedido.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.pedido = null;
      })
      
  },
});

export const { resetPedido } = pedidosSlice.actions;
export default pedidosSlice.reducer;
