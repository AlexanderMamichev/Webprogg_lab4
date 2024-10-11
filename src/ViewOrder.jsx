import { Prev } from "react-bootstrap/esm/PageItem";
import { useOutletContext } from "react-router-dom";

function ViewOrder() {
  const context = useOutletContext(); 
  const { shoppingCart } = context; // Förutsatt att shoppingCart skickas via kontexten

  if (!shoppingCart || shoppingCart.length === 0) {
    return <p>Kundvagnen är tom.</p>;
  }

  return (
    <div className="mb-4">
      <h2>Din kundvagn</h2>
      <ul>
        {shoppingCart.map((salad) => (
          <li key={salad.uuid}>
            {/* Rendera ingredienser */}
            {Object.keys(salad.ingredients).join(', ')} {/* Visa ingredienser */}
            <br />
            {'Pris: ' + salad.getPrice() + ' kr'} {/* Kolla om denna metod är korrekt */}
            <br />
            {'ID: ' + salad.uuid} {/* Se till att rätt UUID används */}
            {/* Rendera extras om det finns */}
            {Array.isArray(salad.extras) && salad.extras.length > 0 && (
              <span> (Extras: {salad.extras.join(', ')})</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
  }
  
  export default ViewOrder;