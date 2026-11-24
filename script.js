
const cart = {};

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const orderForm = document.getElementById("order-form");
const orderMessage = document.getElementById("order-message");

// Add food to the cart
document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    if (cart[name]) {
      cart[name].quantity++;
    } else {
      cart[name] = { price: price, quantity: 1 };
    }

    renderCart();
  });
});

// Draw the latest cart on the page
function renderCart() {
  cartItems.replaceChildren();

  let total = 0;
  let itemCount = 0;
  const names = Object.keys(cart);

  if (names.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-cart";
    emptyMessage.textContent = "Your cart is empty. Add some tasty food!";
    cartItems.appendChild(emptyMessage);
  }

  names.forEach((name) => {
    const item = cart[name];
    const subtotal = item.price * item.quantity;

    total += subtotal;
    itemCount += item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    const details = document.createElement("div");
    const title = document.createElement("p");
    const price = document.createElement("small");

    title.textContent = name;
    price.textContent = `₹${item.price} each`;
    details.append(title, price);

    const controls = document.createElement("div");
    controls.className = "quantity-controls";

    const minusButton = document.createElement("button");
    minusButton.type = "button";
    minusButton.textContent = "−";
    minusButton.setAttribute("aria-label", `Remove one ${name}`);

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;

    const plusButton = document.createElement("button");
    plusButton.type = "button";
    plusButton.textContent = "+";
    plusButton.setAttribute("aria-label", `Add one ${name}`);

    const subtotalText = document.createElement("strong");
    subtotalText.textContent = `₹${subtotal}`;

    minusButton.addEventListener("click", () => {
      item.quantity--;

      if (item.quantity <= 0) {
        delete cart[name];
      }

      renderCart();
    });

    plusButton.addEventListener("click", () => {
      item.quantity++;
      renderCart();
    });

    controls.append(minusButton, quantity, plusButton);
    row.append(details, controls, subtotalText);
    cartItems.appendChild(row);
  });

  cartCount.textContent = itemCount;
  cartTotal.textContent = `₹${total}`;
}

// Demo order form: no real order is sent
orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (Object.keys(cart).length === 0) {
    orderMessage.textContent = "Please add at least one food item first.";
    document.getElementById("cart").scrollIntoView();
    return;
  }

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const pickup = document.getElementById("pickup-time").value;

  if (!name || !/^[0-9]{10}$/.test(phone) || !pickup) {
    orderMessage.textContent = "Please check all your details.";
    return;
  }

  const summary = Object.entries(cart)
    .map(([food, item]) => `${food} x ${item.quantity}`)
    .join(", ");

  orderMessage.textContent =
    `Demo order prepared for ${name}. ` +
    `Items: ${summary}. Total: ${cartTotal.textContent}. ` +
    `Pickup: ${pickup}. No real order has been sent.`;

  orderMessage.scrollIntoView({ behavior: "smooth", block: "center" });
});