import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importera UUID om du behöver generera unika ID:n
import Salad from './lab1.mjs'; // Se till att den här importen är korrekt
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useOutletContext } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';


function ComposeSalad() {
  const {handleAddToCart}  = useOutletContext();
  const inventory  = useLoaderData(); // Provide a fallback for inventory
  console.log(inventory);

  const foundationList = inventory ? Object.keys(inventory).filter(name => inventory[name].foundation) : [];
  const proteinList = inventory ? Object.keys(inventory).filter(name => inventory[name].protein) : [];
  const dressingList = inventory ? Object.keys(inventory).filter(name => inventory[name].dressing) : [];
  


  // State hooks for selected options
  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [dressing, setDressing] = useState('');
  const [extras, setExtras] = useState({});
  const [touched, setTouched] = useState(false);

  // Event handlers
  const handleFoundationChange = (e) => {
    setTouched(true);
    setFoundation(e.target.value);
  };

  const handleProteinChange = (e) => {
    setTouched(true);
    setProtein(e.target.value);
  };

  const handleExtraChange = (name) => {
    setExtras(prevExtras => ({
      ...prevExtras,
      [name]: !prevExtras[name],
    }));
  };

  const handleDressingChange = (e) => {
    setTouched(true);
    setDressing(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
  
    if (!form.checkValidity()) {
      setTouched(true);
      return;
    }

   // Create a new salad
  const newSalad = new Salad();
  newSalad
    .add('foundation', foundation, inventory[foundation].price) // Pass price
    .add('protein', protein, inventory[protein].price) // Pass price
    .add('dressing', dressing, inventory[dressing].price); // Pass price

  // Add selected extras with their prices
  Object.keys(extras).filter(extra => extras[extra]).forEach(extra => {
    newSalad.addExtra(extra, inventory[extra]); // Ensure this also has price data
  });

  newSalad.uuid = uuidv4(); // Generate unique ID for the salad

  // Add the salad to the shopping cart
  handleAddToCart(newSalad); 

  // Reset form after submission
  setFoundation('');
  setProtein('');
  setDressing('');
  setExtras({});
  setTouched(false);
};

  return (
    <form onSubmit={handleSubmit} noValidate className={touched ? "was-validated" : ""}>
      <div className="container col-10">
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Välj innehållet i din sallad</h2>
          
          {/* Foundation Select */}
          <fieldset className="col-md-12 mb-3">
            <label htmlFor="foundation" className="form-label">Välj bas</label>
            <select required value={foundation} onChange={handleFoundationChange} className="form-select" id="foundation">
              <option value="">Gör ditt val</option>
              {foundationList.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <div className="invalid-feedback">Gör ett val!</div>
            <div className="valid-feedback">Bra!</div>
          </fieldset>

          {/* Protein Select */}
          <fieldset className="col-md-12 mb-3">
            <label htmlFor="protein" className="form-label">Välj protein </label>
            <select required value={protein} onChange={handleProteinChange} className="form-select" id="protein">
              <option value="">Gör ditt val</option>
              {proteinList.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <div className="invalid-feedback">Gör ett val</div>
            <div className="valid-feedback">Bra!</div>
          </fieldset>

          {/* Extras Checkboxes */}
          <fieldset className="col-md-12 mb-3">
            <label className="form-label">Välj extras</label>
            <div className="row row-cols-4">
              {Object.keys(inventory).filter(name => inventory[name].extra).map(name => (
                <div className="col mb-2" key={name}>
                  <div className="form-check">
                    <input 
                      type="checkbox" 
                      className="form-check-input" 
                      id={name} 
                      checked={extras[name] || false} 
                      onChange={() => handleExtraChange(name)} 
                    />
                    <label htmlFor={name} className="form-check-label">{name}</label>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          {/* Dressing Select */}
          <fieldset className="col-md-12 mb-3">
            <label htmlFor="dressing" className="form-label">Välj dressing</label>
            <select required value={dressing} onChange={handleDressingChange} className="form-select" id="dressing">
              <option value="">Gör ditt val</option>
              {dressingList.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
            <div className="invalid-feedback">Välj något</div>
            <div className="valid-feedback">Bra</div>
          </fieldset>

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">Lägg till i kundvagn</button>
        </div>
      </div>
    </form>
  );
}

export default ComposeSalad;