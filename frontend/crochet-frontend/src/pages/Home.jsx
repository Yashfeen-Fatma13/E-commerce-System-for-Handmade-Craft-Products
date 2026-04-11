import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function Home() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);

  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);

    await axios.post("http://localhost:5000/api/products", formData);

    alert("Product Uploaded ✅");

    setName("");
    setPrice("");
    setDescription("");
    setImage(null);

    fetchProducts();
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Product 🧶</h2>

      <form onSubmit={handleSubmit}>
        <input value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <br /><br />

        <input value={price} placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
        <br /><br />

        <input value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <br /><br />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br /><br />

        <button type="submit">Upload</button>
      </form>

      <hr />

      <h2>Products 🛍️</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((item) => (
          <div key={item._id} style={{ border: "1px solid gray", padding: "10px", width: "200px", textAlign: "center" }}>
            <img src={item.image} width="150" height="150" />
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart 🛒</button>
          </div>
        ))}
      </div>

      <hr />

      <h2>Cart 🛒 ({cart.length})</h2>
      <h3>Total: ₹{total}</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {cart.map((item, index) => (
          <div key={index} style={{ border: "1px solid green", padding: "10px", width: "150px", textAlign: "center" }}>
            <img src={item.image} width="100" height="100" />
            <h5>{item.name}</h5>
            <p>₹{item.price}</p>
            <button onClick={() => removeFromCart(index)}>Remove ❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;