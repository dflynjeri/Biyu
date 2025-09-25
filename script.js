const products = [
  {id:1,name:"Pro Drone X1",price:799,img:"https://source.unsplash.com/200x150/?drone"},
  {id:2,name:"4K Action Camera",price:299,img:"https://source.unsplash.com/200x150/?camera"},
  {id:3,name:"VR Headset",price:199,img:"https://source.unsplash.com/200x150/?vr"},
  {id:4,name:"Wireless Mic",price:149,img:"https://source.unsplash.com/200x150/?microphone"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(){
  const list=document.getElementById("productList");
  if(!list)return;
  list.innerHTML=products.map(p=>`
    <div class="card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>`).join("");
}

function addToCart(id){
  const product=products.find(p=>p.id===id);
  cart.push(product);
  localStorage.setItem("cart",JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function renderCart(){
  const items=document.getElementById("cartItems");
  const totalPrice=document.getElementById("totalPrice");
  if(!items)return;
  let total=0;
  items.innerHTML=cart.map((c,i)=>{
    total+=c.price;
    return `<div class="cart-item">
              <span>${c.name} - $${c.price}</span>
              <button onclick="removeFromCart(${i})">Remove</button>
            </div>`;
  }).join("");
  totalPrice.innerText=total;
  updateCartCount();
}

function removeFromCart(i){
  cart.splice(i,1);
  localStorage.setItem("cart",JSON.stringify(cart));
  renderCart();
}

function checkout(){
  alert("✅ Purchase complete!");
  cart=[];
  localStorage.removeItem("cart");
  renderCart();
}

function updateCartCount(){
  document.getElementById("cartCount").innerText=cart.length;
}

function toggleDarkMode(){
  document.body.classList.toggle("dark-mode");
}

function searchProducts(){
  const query=document.getElementById("searchBox").value.toLowerCase();
  const list=document.getElementById("productList");
  list.innerHTML=products.filter(p=>p.name.toLowerCase().includes(query)).map(p=>`
    <div class="card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>`).join("");
}

renderProducts();
renderCart();
updateCartCount();
