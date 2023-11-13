export const getOrders = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/orders");

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Can't fetchorders:", error);
    throw error; 
  }
};
