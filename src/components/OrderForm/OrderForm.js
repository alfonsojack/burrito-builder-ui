import { useState } from "react";

function OrderForm(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  console.log("OrderForm rendered");
  const [alert, setAlert] = useState(null)


  const submitOrder = async (order) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }

      console.log('success', response)
      return response.json();
    } catch (error) {
      console.error("OOPS CANt submit", error)
    }
  
  }

  const handleIngredientClick = (ingredient, e) => {
    e.preventDefault();
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients, ingredient];
      return updatedIngredients;
    });
  };


  function handleSubmit(e) {
    e.preventDefault();
    setAlert('')
    if (!name || ingredients.length === 0) {
      setAlert("PROVIDE A NAME AND INGREDIENT OR YOU CAN NOT SUBMIT!!!!!!")
    } else {

    const order = {name, ingredients}
    submitOrder(order)
      .then((newOrder) => 
      props.getNewOrder(newOrder))
    }
  clearInputs();
    }
  

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={(e) => handleIngredientClick(ingredient, e)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      {alert && (
        <p>{alert}</p>
      )}
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
