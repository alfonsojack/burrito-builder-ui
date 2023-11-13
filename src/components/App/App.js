import { useEffect } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";
import { useState } from 'react'

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
    .then((data) => {
      setOrders(data.orders);
      console.log(data.orders);
    })
      .catch((err) => console.error("Error fetching:", err));
  }, []);


  const getNewOrder = (newOrder) => {
    getOrders()
    .then((data) => {
      setOrders(data.orders);
      console.log(data.orders);
    })
    console.log(newOrder)
  }


  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm orders={orders} getNewOrder={getNewOrder}/>
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
