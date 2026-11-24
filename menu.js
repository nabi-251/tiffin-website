let cart = [];

const buttons = document.querySelectorAll(".add-btn");

buttons.forEach(function(button) {
    button.addEventListener("click", function() {

        const name = this.dataset.name;
        const price = Number(this.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        displayCart();
    });
});

function displayCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let total = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    cart.forEach(function(item) {

        total += item.price * item.quantity;

        const row = document.createElement("div");
        row.className = "cart-row";

        row.innerHTML = `
            <span>${item.name} - ₹${item.price}</span>

            <div class="quantity-controls">
                <button data-action="decrease" data-name="${item.name}">−</button>

                <span>${item.quantity}</span>

                <button data-action="increase" data-name="${item.name}">+</button>

                <button data-action="remove" data-name="${item.name}">Remove</button>
            </div>
        `;

        cartItems.appendChild(row);
    });

    cartTotal.textContent = total;
}

document.getElementById("cart-items").addEventListener("click", function(event) {

    const button = event.target.closest("button");

    if (!button) return;

    const name = button.dataset.name;
    const action = button.dataset.action;

    const item = cart.find(item => item.name === name);

    if (!item) return;

    if (action === "increase") {
        item.quantity++;
    }

    if (action === "decrease") {
        item.quantity--;

        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== name);
        }
    }

    if (action === "remove") {
        cart = cart.filter(item => item.name !== name);
    }

    displayCart();
});

document.getElementById("clear-cart").addEventListener("click", function() {
    cart = [];
    displayCart();
});
// CUSTOMER ORDER FORM

document.getElementById("order-form").addEventListener("submit", function(event) {

    event.preventDefault();

    if (cart.length === 0) {
        alert("Please add food items to your cart!");
        return;
    }

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const time = document.getElementById("pickup-time").value;

    const total = cart.reduce(function(sum, item) {
        return sum + (item.price * item.quantity);
    }, 0);

    document.getElementById("order-message").innerHTML =
        "Thank you, " + name +
        "! Your demo order has been placed successfully. " +
        "Total: ₹" + total +
        ". Pickup Time: " + time;

    alert("Order placed successfully!");

    cart = [];
    displayCart();

    document.getElementById("order-form").reset();

});
