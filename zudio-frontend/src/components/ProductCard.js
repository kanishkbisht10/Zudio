function ProductCard({name, price, image, addToCart}) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "15px",
      width: "200px",
      textAlign: "center",
      borderRadius: "8px"
    }}>
      <img 
        src={image} 
        alt={name}
        style={{width: "100%", height: "200px", objectFit: "cover"}}
      />
      <h3>{name}</h3>
      <p>₹{price}</p>
      <button onClick = {addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
