import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <a onClick={() => { navigate('/'); }}>Shop</a>
      <a onClick={() => { navigate('/cart'); }}>Shopping Cart</a>
    </div>
  );
}
export default Navbar;
