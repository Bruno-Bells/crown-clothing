import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/home.component";
import Navbar from './routes/navigation/navbar.component';
import Shop from './routes/shop/shop.component';
import AuthUser from './authentication/auth-page/auth-page.component';

const App = () => {
  return(
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} /> 
        <Route path='shop' element={<Shop />} />
        <Route path='auth-page' element={<AuthUser />} />
      </Route>
      
    </Routes>
    ) 
    
}

export default App;