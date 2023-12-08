import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Pedido from './pages/Pedido/Pedido';
import PedidoDetails from './components/PedidoDetails';
import VerPedido from './pages/VerPedido/VerPedido';
import NovoPedido from './pages/NovoPedido/NovoPedido';

function App() {
  return (
    <div className="App">
      <BrowserRouter>    
        <Routes>
            <Route path='/' element={<Home/> }/>
            <Route path='/pedido/:id' element={<Pedido/>}/> 
            <Route path='/viewpedido/:id' element={<VerPedido/>}/>    
            <Route path='/pedido' element={<NovoPedido/>}/> 
        </Routes>
      </BrowserRouter>       
    </div>
  );
}

export default App;
