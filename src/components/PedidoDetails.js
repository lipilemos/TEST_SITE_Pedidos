import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deletePedido, getAllPedidos } from '../slices/pedidosSlice';
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import './PedidoDetails.css'

const PedidoDetails = () => {

  const dispatch = useDispatch();
  const { pedidos, loading, error, success, message } = useSelector((state) => state.pedido);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [id, setId] = useState(null);

  const openModal = (id) => {
    setModalIsOpen(true);
    setId(id)
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setId(null)
  };

  useEffect(() => {
    dispatch(getAllPedidos());
  }, []);

  const handleDelete = async (e) => {    
    e.preventDefault();
    await dispatch(deletePedido(id))
    await dispatch(getAllPedidos());
    console.log("Item deletado!");
    closeModal();
  };
  const customStyles = {
    content: {
      width: "30%", // Defina o tamanho desejado aqui
      height: "30%", // Defina o tamanho desejado aqui
      margin: "auto",
    },
  };
return (
  <div className='contains'>
    {pedidos && pedidos.length > 0 ? (
      pedidos.map((pedido) => (
        <>
          <div className='separator' key={pedido.id}>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Pago</th>
                  <th>ValorTotal</th>
                </tr>
              </thead>
              <tbody>
                <tr key={pedido.id}>
                  <td>{pedido.nomeCliente}</td>
                  <td>{pedido.emailCliente}</td>
                  <td>{pedido.pago.toString()}</td>
                  <td>{pedido.valorTotal.toString()}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {pedido.itensPedido.map((item) => (
                  <tr key={item.id}>
                    <td>{item.produto.nomeProduto}</td>
                    <td>{item.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='botoes'>
              <Link to={`/pedido/${pedido.id}`}>
                <input className='editar' type="submit" value="Editar" />
              </Link>
              <input className='deletar' type="submit" value="Deletar" onClick={() => openModal(pedido.id)} />
              <Link to={`/viewpedido/${pedido.id}`}>
                <input className='ver' type="submit" value="Ver" />
              </Link>
            </div>
          </div>
          <hr></hr>
        </>
      ))
    ) : (
      <p>Não possui nenhum pedido</p>
    )}
    <Modal  style={customStyles}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Confirmar exclusão"
    >
      <h2>Confirmar exclusão</h2>
      <p>Tem certeza que deseja deletar este item?</p>
      <button onClick={(e)=>handleDelete(e)}>Sim</button>
      <button onClick={closeModal}>Cancelar</button>
    </Modal>
  </div>
);
}

export default PedidoDetails