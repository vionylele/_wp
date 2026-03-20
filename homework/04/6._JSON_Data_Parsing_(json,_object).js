const jsonString = '{"product": "Laptop", "price": 1200, "stock": 5}';
const productData = JSON.parse(jsonString);

if (productData.stock > 0) {
  console.log(`${productData.product} is available for $${productData.price}`); // Output: Laptop is available for $1200
}
