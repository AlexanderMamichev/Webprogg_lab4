import 'bootstrap/dist/css/bootstrap.css';
import ComposeSalad from './ComposeSalad';
import Salad from './lab1.mjs';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ViewOrder from './ViewOrder'; // Import ViewOrder
import { Outlet, useNavigate, useOutletContext, useNavigation } from 'react-router-dom'; 
import Navbar from './Navbar';
import BootstrapSpinner from './Spinner';



function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [foundation, setFoundation] = useState('Pasta');
  const [protein, setProtein] = useState('Kycklling');
  const [dressing, setDressing] = useState('Ranch');
  const [extras, setExtras] = useState({ Bacon: true, Fetaost: true });


  const navigation = useNavigation(); 
  const isLoading = navigation.state === 'loading'; 
  

  const handleAddToCart = (newSalad) => {
    setShoppingCart(prevCart => [...prevCart, newSalad]);
    console.log("Uppdaterad korg" , shoppingCart);  
  };

   


  return (<div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>

    <Navbar />

    {/* Render Spinner while loading, otherwise show child components */}
    {isLoading ? (
      <BootstrapSpinner />  // Show spinner if loading
    ) : (
      <Outlet context={{
        shoppingCart, 
        handleAddToCart,
      }} />
    )}

    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  </div>
);
}

export default App;