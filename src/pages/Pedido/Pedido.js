import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getPedidoById, resetPedido, updatePedido } from '../../slices/pedidosSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message'
import './Pedido.css'
const Pedido = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pedido, loading, error, success, message } = useSelector((state) => state.pedido);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [pago, setPago] = useState("");
    const [valorTotal, setValorTotal] = useState("");
    const [listaItens, setListaItens] = useState([]);
    const [itensPedido, setItensPedido] = useState([])
    const [nomeProduto, setNomeProduto] = useState("");
    const [valorProduto, setValorProduto] = useState("");
    const [quantidadeProduto, setQuantidadeProduto] = useState("");

    useEffect(() => {
        if(id)
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

        const novoPedido={
            id,
            nomeCliente: nome,
            emailCliente: email, 
            pago,             
            itensPedido: listaItens
        }
        await dispatch(updatePedido(novoPedido))
        setTimeout(() => {
            dispatch(resetPedido());
            setTimeout(() => {
                navigate("/") 
              }, 2000);
          }, 2000);
    }
    const limparCamposProduto = () => {
        setNomeProduto("");
        setValorProduto("");
        setQuantidadeProduto("");
    };
    const adicionarProduto = () => {
        if (nomeProduto && valorProduto && quantidadeProduto) {
            const novoItem = {
                produto: {
                    id: 0,
                    nomeProduto,
                    valor: parseFloat(valorProduto),
                },
                quantidade: parseInt(quantidadeProduto),
            };

            setListaItens([...listaItens, novoItem]);
            limparCamposProduto();
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    const removerItem = (index) => {
        const novosItens = [...listaItens];
        novosItens.splice(index, 1);
        setListaItens(novosItens);
    };
    
    return (
        <div>
            <h1>Pedido</h1>
            <hr></hr>
            {pedido && id ? (
                <div className='edit_pedido'>
                    <h2>Editando pedido: {pedido.id}</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                <span>Nome: </span>
                                <input
                                    type="text"
                                    name="text"
                                    required
                                    placeholder="ex: Felipe"
                                    onChange={(e) => setNome(e.target.value)}
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
                                    required
                                    placeholder="felipe@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    onChange={(e) => setPago(e.target.checked)}
                                    checked={pago}
                                />
                            </label>
                        </div>
                        <div>
                        <h2>Adição de Produtos ao Pedido</h2>
                        <form>
                            <label>
                                Nome do Produto:
                                <input
                                    type="text"
                                    value={nomeProduto}
                                    required
                                    onChange={(e) => setNomeProduto(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Valor do Produto:
                                <input
                                    type="number"
                                    value={valorProduto}
                                    required
                                    onChange={(e) => setValorProduto(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Quantidade:
                                <input
                                    type="number"
                                    required
                                    value={quantidadeProduto}
                                    onChange={(e) => setQuantidadeProduto(e.target.value)}
                                />
                            </label>
                            <br />
                            <button type="button" onClick={adicionarProduto}>
                                Adicionar Produto
                            </button>
                        </form>

                        <h3>Lista de Produtos:</h3>
                        <ul>
                            {listaItens && listaItens.map((item, index) => (
                                <li key={index}>
                                    Nome: {item.produto.nomeProduto}, Valor: R${item.produto.valor}, Quantidade:{" "}
                                    {item.quantidade}
                                    <button type="button" onClick={() => removerItem(index)}>
                                        Remover
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>  

                        <div className='edit_pedido'>
                            <label>
                                <span>Valor Total: </span>
                                <input
                                    type="number"
                                    name="valueTotal"
                                    placeholder="R$0,00"
                                    onChange={(e) => setValorTotal(e.target.value)}
                                    value={valorTotal}
                                    disabled
                                />
                            </label>
                        </div>
                        {!loading && <input type="submit" value="Atualizar" />}
                        {loading && <input type="submit" disabled value="Aguarde..." />}
                        {error && <Message msg={error} type="error" />}
                        {message && <Message msg={message} type="success" />}
                    </form>
                </div>
            ):
            <div className='edit_pedido'>
                    <h2>Novo pedido: {pedido.id}</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                <span>Nome: </span>
                                <input
                                    type="text"
                                    name="text"
                                    required
                                    placeholder="ex: Felipe"
                                    onChange={(e) => setNome(e.target.value)}
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
                                    required
                                    placeholder="felipe@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    required
                                    onChange={(e) => setPago(e.target.checked)}
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
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaItens && listaItens.map((item) => (
                                        <tr key={item.id}>
                                            <th>
                                            <input
                                                type="text"
                                                name="nomeProduto"
                                                value={item.produto.nomeProduto}
                                            /></th>
                                            <th>
                                            <input
                                                type="number"
                                                name="valor"
                                                value={item.produto.valor}
                                            /> </th>
                                            <th>
                                            <input
                                                type="number"
                                                name="quantidade"
                                                value={item.quantidade}
                                            />  </th>
                                            <th>                                            
                                            <input className='itemdeletar' type='submit' id={item.id} value="Remover" onClick={() => removerItem(item.id)} />
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
                        {!loading && <input type="submit" value="Atualizar" onClick={(e)=>handleSubmit(e)}/>}
                        {loading && <input type="submit" disabled value="Aguarde..." />}
                        {error && <Message msg={error} type="error" />}
                        {message && <Message msg={message} type="success" />}
                    </form>
                </div>
            }

        </div>
    )
}

export default Pedido