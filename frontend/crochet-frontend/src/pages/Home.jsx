import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

function Home() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);

  const { addToCart } = useContext(CartContext);

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Upload Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", image);

      await axios.post(
        "http://localhost:5000/api/products",
        formData
      );

      alert("Product Uploaded ✅");

      setName("");
      setPrice("");
      setDescription("");
      setImage(null);

      fetchProducts();

    } catch (error) {
      console.log(error);
      alert("Upload Failed ❌");
    }
  };

  return (
    <div style={{ padding: "30px" }}>

      {/* Upload Form */}

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          marginBottom: "40px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >

        <h2
          style={{
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          Add Product 🧶
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            value={name}
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />

          <input
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{
              marginBottom: "20px",
            }}
          />

          <br />

          <button
            type="submit"
            style={{
              background: "#ff69b4",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "10px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Upload Product 🎀
          </button>

        </form>

      </div>

      {/* Products */}

      <h2
        style={{
          marginBottom: "25px",
          color: "#111827",
        }}
      >
        Products 🛍️
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >

        {products.map((item) => (

          <div
            key={item._id}
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(255,105,180,0.15)",
              transition: "0.3s",
            }}
          >

            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "15px",
                marginBottom: "15px",
              }}
            />

            <h3
              style={{
                marginBottom: "10px",
                color: "#111827",
              }}
            >
              {item.name}
            </h3>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "10px",
              }}
            >
              {item.description}
            </p>

            <h2
              style={{
                color: "#16a34a",
                marginBottom: "15px",
              }}
            >
              ₹{item.price}
            </h2>

            <button
              onClick={() => addToCart(item)}
              style={{
                background: "linear-gradient(to right, #ff69b4, #ff85c1)",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                width: "100%",
                fontSize: "15px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Add To Cart 🛒
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
};

export default Home;