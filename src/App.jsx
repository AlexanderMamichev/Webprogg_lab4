import 'bootstrap/dist/css/bootstrap.css';
import Salad from './lab1.mjs';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet, useNavigation } from 'react-router-dom'; 
import Navbar from './Navbar';
import BootstrapSpinner from './Spinner';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs



function App() {
// Initialize shopping cart from local storage
const initializeCart = () => {
  const storedCart = window.localStorage.getItem('shoppingCart');
  return storedCart ? Salad.parse(storedCart) : []; // Parse the saved salads or return an empty array
};


  const [shoppingCart, setShoppingCart] = useState([]);
  const [foundation, setFoundation] = useState('Pasta');
  const [protein, setProtein] = useState('Kycklling');
  const [dressing, setDressing] = useState('Ranch');
  const [extras, setExtras] = useState({ Bacon: true, Fetaost: true });


  const navigation = useNavigation(); 
  const isLoading = navigation.state === 'loading'; 
  
  const handleAddToCart = (newSalad) => {
    // Ensure the new salad gets a unique UUID
    newSalad.uuid = uuidv4(); // Assign a new UUID for uniqueness
    
    // Update the shopping cart and local storage
    const updatedCart = [...shoppingCart, newSalad];
    setShoppingCart(updatedCart);
    window.localStorage.setItem('shoppingCart', JSON.stringify(updatedCart)); // Save to local storage
    console.log("Uppdaterad korg", updatedCart);  
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