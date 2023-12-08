import { api, requestConfig } from "../utils/config";

const insertPedido = async (data) => {
  const config = requestConfig("POST", data);
  try {
    const res = await fetch(api + "/Pedidos", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};
const getPedidoById = async (id) => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/Pedidos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    //para inserir no localStorage
    //   if(res)
    //   localStorage.setItem("Pedido", JSON.stringify(res));
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getAllPedidos = async () => {
  const config = requestConfig("GET", null);

  try {
    const res = await fetch(api + "/Pedidos", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};
const deletePedido = async (id) => {
  const config = requestConfig("DELETE", null);

  try {
    const res = await fetch(api + "/Pedidos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updatePedido = async (data) => {
  const config = requestConfig("PUT", data);

  try {
    const res = await fetch(api + "/Pedidos/" + data.id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};
const pedidosService = {
  insertPedido,
  getAllPedidos,
  getPedidoById,
  updatePedido,
  deletePedido
};

export default pedidosService;
