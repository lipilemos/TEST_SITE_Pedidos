import React from 'react'
import PedidoDetails from '../../components/PedidoDetails';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  const handleNovo = async (e)=>{
    e.preventDefault();    
    navigate("/pedido") 
    }

  return (
    <>    
    <h1>Pedidos</h1>
    <hr></hr>
    <h3>Lista de pedidos</h3>
    <PedidoDetails/>
    <input type="submit" value="Novo" onClick={(e) => handleNovo(e)} />

    </>
  )
}

export default Home