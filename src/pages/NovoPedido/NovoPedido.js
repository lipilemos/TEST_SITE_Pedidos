import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getPedidoById, insertPedido, resetPedido } from '../../slices/pedidosSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message'
import './NovoPedido.css'

const NovoPedido = () => {
    const dispatch = useDispatch();
    const {  loading, error, success, message } = useSelector((state) => state.pedido);
const navigate = useNavigate()
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [pago, setPago] = useState(false);
    const [listaItens, setListaItens] = useState([]);
    const [nomeProduto, setNomeProduto] = useState("");
    const [valorProduto, setValorProduto] = useState("");
    const [quantidadeProduto, setQuantidadeProduto] = useState("");

    const adicionarProduto = () => {
        if (nomeProduto && valorProduto && quantidadeProduto) {
            const novoItem = {
                produto: {
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

    const limparCamposProduto = () => {
        setNomeProduto("");
        setValorProduto("");
        setQuantidadeProduto("");
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(listaItens.length === 0){
            alert("Por favor, insira pelo menos um produto.");
            return ;
        }
        const novoPedido={
            nomeCliente: nome,
            emailCliente: email, 
            pago, 
            dataCriacao: new Date(),
            itensPedido: listaItens
        }
        await dispatch(insertPedido(novoPedido))
        setTimeout(() => {
            dispatch(resetPedido());
            setTimeout(() => {
                navigate("/") 
              }, 2000);
          }, 2000);
    }
    return (
        <div>
            <h1>Pedido</h1>
            <hr></hr>
            <div className='edit_pedido'>
                <h2>Novo pedido</h2>
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
                            {listaItens.map((item, index) => (
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
                    {!loading && <input type="submit" value="Salvar"/>}
                    {loading && <input type="submit" disabled value="Aguarde..." />}
                    {error && <Message msg={error} type="error" />}
                    {message && <Message msg={message} type="success" />}
                </form>
            </div>
        </div>
    )
}

export default NovoPedido