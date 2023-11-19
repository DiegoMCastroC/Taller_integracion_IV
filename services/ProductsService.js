export async function getProducts() {
  try {
    const response = await fetch('https://flask-ta4.onrender.com/productos');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error al obtener los productos", error);
  }
}

export async function getProduct(_id) {
  if (!_id) {
    console.error('Product ID is undefined');
    return;
  }

  const response = await fetch(`https://flask-ta4.onrender.com/productos/${_id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const product = await response.json();
  return product;
}