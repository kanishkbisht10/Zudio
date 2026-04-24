function ProductCard({name, price, image, addToCart}) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        <p className="product-price">₹{price}</p>
        <button className="btn-primary" onClick={addToCart} style={{marginTop: "auto"}}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
