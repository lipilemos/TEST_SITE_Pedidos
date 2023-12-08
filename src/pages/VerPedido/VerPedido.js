import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getPedidoById } from '../../slices/pedidosSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message'
import './VerPedido.css'
const VerPedido = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch();
    const { pedido, loading, error, message } = useSelector((state) => state.pedido);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [pago, setPago] = useState("");
    const [valorTotal, setValorTotal] = useState("");
    const [listaItens, setListaItens] = useState([]);

    useEffect(() => {
        dispatch(getPedidoById(id));
    }, [id]);

    useEffect(() => {
        if (pedido) {
            setNome(pedido.nomeCliente);
            setEmail(pedido.emailCliente);
            setPago(pedido.pago);
            setValorTotal(pedido.valorTotal);
            setListaItens(pedido.itensPedido);
        }
    }, [pedido]);

    const handleSubmit = async (e) => {
        e.preventDefault()

    navigate("/pedido/"+id)    

    }
    return (
        <div>
            <h1>Pedido</h1>
            <hr></hr>
            {pedido && (
                <div className='edit_pedido'>
                    <h2>Ver pedido: {pedido.id}</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                <span>Nome: </span>
                                <input
                                    type="text"
                                    name="text"
                                    disabled
                                    value={nome}
                                />
                            </label>
                        </div>
                        <div className='edit_pedido'>
                            <label>
                                <span>Email: </span>
                                <input
                                    type="text"
                                    name="email"
                                    disabled
                                    value={email}
                                />
                            </label>
                        </div>
                        <div className='edit_pedido'>
                            <label>
                                <span>Pago:</span>
                                <input
                                    type="checkbox"
                                    name="pago"
                                    disabled
                                    checked={pago}
                                />
                            </label>
                        </div>
                        {/* Lista de Itens do Pedido */}
                        <h4>Itens do Pedido</h4>
                        <div className='edit_pedido table'>
                            <table >
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Valor</th>
                                        <th>Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaItens && listaItens.map((item) => (
                                        <tr key={item.id}>
                                            <th>
                                                <input
                                                    type="text"
                                                    name="nomeProduto"
                                                    disabled                                                    
                                                    value={item.produto.nomeProduto}
                                                /></th>
                                            <th>
                                                <input
                                                    type="number"
                                                    name="valor"        
                                                    disabled
                                                    value={item.produto.valor}
                                                /> </th>
                                            <th>
                                                <input
                                                    type="number"
                                                    name="quantidade"
                                                    disabled
                                                    placeholder="6"
                                                    value={item.quantidade} />
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='edit_pedido'>
                            <label>
                                <span>Valor Total: </span>
                                <input
                                    type="number"
                                    name="valueTotal"
                                    value={valorTotal}
                                    disabled
                                />
                            </label>
                        </div>
                        {!loading && <input type="submit" value="Editar" />}
                        {loading && <input type="submit" disabled value="Aguarde..." />}
                        {error && <Message msg={error} type="error" />}
                        {message && <Message msg={message} type="success" />}
                    </form>
                </div>
            )}
        </div>
    )
}

export default VerPedido