'use strict';
/**
 * Reflection question 1
 * your answer goes here
 * 
 * ANSWER!
 * In JavaScript, it's common to omit properties that would be false because their absence can be interpreted as false, and it helps optimize performance and improve code readability.
 * ANSWER! 
 */

import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';
const uuid = uuidv4(); // use this in the constructor 

console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * !ANSWER! 
 * 
 * The outputs will differ if there are enumerable properties inherited from the object's prototype. 
 * For example, if you extend the inventory to include additional properties /for loop/ will also print those inherited properties, but Object.keys() will not.
 * 
 * SO key differences are -> Object.keys() only lists the object’s own properties (HÄR: properties defined directly on the object, not inherited through the prototype(inventory) chain).
 * /for loop/ will list both the object's own properties and any enumerable properties that are inherited from its prototype.
 * 
 * JavaScript objects have both enumerable and non-enumerable properties. Methods like forEach() are defined on Array.prototype and these properties are non-enumerable. 
 * This means even though they exist on the object (inherited from the prototype) they won't be listed by either Object.keys() or /for loop/ because these methods are not marked as enumerable.
 * 
 * !ANSWER!
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  return Object.keys(inv)
  .filter(key => inv[key][prop])  // Filtrerar ingredienser baserat på dess specifika egenskap. Exempelvis kommer denna raden att släppa genom de ingredienser som har prop satt till true. 
  .map(key => `<option value="${key}" key="${key}">${key}, ${inv[key].price} kr</option>`);   //mappar varje string til HTML <option> element med VALUE, key = namn på ingredient och priset.  
}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {

  static instanceCounter = 1; // Static egenskap som delas av alla instanser och kommer att uppdateras varje gång det skapas en Salad instans


  constructor(existingSalad = null){ //Initialisera ett tomt objekt för att lagra ingredienser. 

    this.id = 'salad_' + Salad.instanceCounter++; //Tilldelar ett unikt ID till varje instans.  
    this.uuid = uuidv4(); // Genererar ett unikt uuID. 
    this.extras = []; 

    if(existingSalad && existingSalad instanceof Salad) {
    this.ingredients = {...existingSalad.ingredients}; 
    this.uuid = existingSalad.uuid; // Sparar den redan befintliga UUID för parsing. 
    }else{
    this.ingredients={}; 
    }
    
  }
    
  add(name, properties) {                 // Metod för att lägga till ingredienser till saladen. 
    this.ingredients[name] = properties; // lägger till ingredient till properties. 
    return this;                        //Returnerar Salad objektet för att möjliggöra method chaining.  
   }
   addExtra(extra) {
    this.extras.push(extra);
    return this;
  }

  remove(name) {
    delete this.ingredients[name];   // Tar bort ingredienser från properties. 
    return this;   // Returnerar Salad objektet för att kunna göra method chaining.  
   }

   static parse(json) {
    let parsedData; 
    // parse JSON string
    try {
        parsedData = JSON.parse(json); 
    } catch (error) {
        throw new Error("Invalid JSON string"); 
    }

    // Function to create a Salad from an object
    function createSaladFromObject(obj) {
        const salad = new Salad(); 
        salad.uuid = obj.uuid; // Keep the old UUID. 
        for (const [name, properties] of Object.entries(obj.ingredients || {})) { // Ensure we are accessing the ingredients property
            salad.add(name, properties); // Add ingredient with properties
            console.log(`Adding ingredient: ${name}, Price: ${properties.price}`); // Debugging log
        }
        return salad;
    }

    // Check if the parsed data is an array or a single object
    if (Array.isArray(parsedData)) {
        return parsedData.map(createSaladFromObject); 
    } else if (typeof parsedData === 'object' && parsedData !== null) {
        return createSaladFromObject(parsedData); 
    } else {
        throw new Error("Invalid data format"); 
    }
}

}

let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function() {
  console.log(this.ingredients); // Log ingredients to verify their structure
  
  return Object.values(this.ingredients)
    .reduce((total, ingredient) => {
      const price = ingredient.price; 
      console.log(`Adding price: ${price}`); // Log each price being added
      return total + price;
    }, 0);
};

Salad.prototype.count = function(property) {
  return Object.values(this.ingredients)
  .filter(ingredient => ingredient[property])
  .length;
};
 

console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));       // Salad.prototype === Object.getPrototypeOf(Salad):This returns false. The Object.getPrototypeOf() method returns the prototype of the constructor function itself, which is Function.prototype, not Salad.prototype. Salad.prototype is the prototype of instances created by the Salad class, not the class itself.
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));
/*
!ANSWER!

Classes in JavaScript are just functions, and they have a prototype object that holds shared methods for instances.
Instances, like myCaesarSalad don’t have a prototype property but are linked to the Salad.prototype through the prototype chain.
Prototype chain refers to how JavaScript looks up properties along the chain of linked objects.

Object.getPrototypeOf() is used to access the next object in the prototype chain, which is how you can traverse it.

!ANSWER!
*/
console.log('\n--- Assignment 4 ---------------------------------------')



const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')

class GourmetSalad extends Salad {
  
  add(name, properties, size = 1) {
    // Om ingrediensen redan finns i salladen, hämta den befintliga storleken
    let newSize = size;
    if (this.ingredients[name]) {
      const currentSize = this.ingredients[name].size;
      newSize += currentSize;  // Uppdatera storleken om ingrediensen redan finns
    }

    // Skapa en ny kopia av properties och lägg till storleken
    const propertiesWithSize = { ...properties, size: newSize };

    // Anropa superklassens add-metod med de uppdaterade properties
    return super.add(name, propertiesWithSize);
  }

  getPrice() {
    // Beräkna totalpriset baserat på pris * storlek för varje ingrediens
    return Object.values(this.ingredients)
      .reduce((total, ingredient) => {
        return total + (ingredient.price * ingredient.size);  // Korrekt referens till ingredient.price
      }, 0);
  }
}



let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------')

console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

export default Salad; 

/**
 * Reflection question 4
 * !ANSWER!
 * Static properties are stored within super class immidietly and not in the following instances. This means that 
 * static property instanceCounter is accosieated with Class Salad. 
 * !ANSWER!
 */
/**
 * Reflection question 5
 * !ANSWER!
 * Yes it is possible. It is achivied by using Object.defineProperty to define property with specific attributes like making it 
 * non writable. 
 * !ANSWER!
 */
/**
 * Reflection question 6
 * !ANSWER!
 * Yes it is possible. To create a private property we can use private fields in classes. Private fields are prefixed with "#". 
 * They are only accessable within the class they are defined in. 
 * 
 * !ANSWER!
 */

