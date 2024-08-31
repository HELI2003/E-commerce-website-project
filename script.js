// Initialize cart
let cart = [];

// Function to show toast notification
function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast show";

    // Hide the toast after 3 seconds
    setTimeout(function() {
        toast.className = toast.className.replace(" show", "");
    }, 3000);
}

// Add event listener to "Add to Cart" buttons
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));

        // Add to cart
        cart.push({ name, price });
        updateCart();
        showToast(`Added ${name} to cart!`);
    });
});

// Function to update cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    cartItemsDiv.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            ${item.name} - ₹${item.price} 
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItem);
    });

    // Update total
    cartTotalSpan.textContent = total;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Show checkout modal
document.getElementById('checkout-btn').addEventListener('click', function() {
    document.getElementById('checkout-modal').style.display = 'block';
});

// Close checkout modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('checkout-modal').style.display = 'none';
});

// Handle checkout form submission
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Simulate a payment process
    setTimeout(() => {
        alert('Payment successful!');
        cart = [];
        updateCart();
        document.getElementById('checkout-modal').style.display = 'none';
    }, 1000);
});
