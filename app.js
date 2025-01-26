document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.getElementById("signInForm");
    const createAccountForm = document.getElementById("createAccountForm");
    const createAccountLink = document.getElementById("createAccountLink");

    // Function to save user data to localStorage
    const saveAccount = (username, email, password) => {
        localStorage.setItem("userAccount", JSON.stringify({ username, email, password }));
    };

    // Function to retrieve user data from localStorage
    const getAccount = () => {
        return JSON.parse(localStorage.getItem("userAccount"));
    };

    // Redirect to a given page
    const redirectToPage = (url, username) => {
        if (username) {
            localStorage.setItem("loggedInUser", username);
        }
        window.location.href = url;
    };

    // Handle sign-in form submission
    if (signInForm) {
        signInForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            const savedAccount = getAccount();

            if (!savedAccount) {
                alert("Account doesn't exist. Please create an account.");
                return;
            }

            if (email === savedAccount.email && password === savedAccount.password) {
                alert(`Welcome back, ${savedAccount.username}!`);
                redirectToPage("dashboard.html", savedAccount.username);
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }

    // Handle account creation form submission
    // Handle account creation form submission
if (createAccountForm) {
    createAccountForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("newUsername")?.value.trim();
        const email = document.getElementById("newEmail")?.value.trim();
        const password = document.getElementById("newPassword")?.value;

        if (!username || !email || !password) {
            alert("All fields are required to create an account.");
            return;
        }

        // Save account to localStorage
        saveAccount(username, email, password);
        alert("Account created successfully! Redirecting to the dashboard...");

        // Standard redirect
        window.location.href = "dashboard.html?username=" + encodeURIComponent(username);
    });
}


    // Redirect to account creation page
    if (createAccountLink) {
        createAccountLink.addEventListener("click", () => {
            redirectToPage("s.html");
        });
    }

    // Update dashboard username if on dashboard.html
    if (window.location.pathname.includes("dashboard.html")) {
        const savedUser = localStorage.getItem("loggedInUser");
        if (savedUser) {
            const usernameElement = document.querySelector(".profile h8");
            if (usernameElement) {
                usernameElement.textContent = savedUser;
            }
        }
    }

    const menuItems = document.querySelectorAll(".menu ul li");
    const sections = document.querySelectorAll(".content-section");
    const productList = document.getElementById("productList");
    const aboutInfoSection = document.getElementById("aboutInfo");

    // Function to switch sections
    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            menuItems.forEach((i) => i.classList.remove("active"));
            sections.forEach((section) => section.classList.remove("active"));

            item.classList.add("active");
            const targetSection = document.getElementById(item.getAttribute("data-target"));
            if (targetSection) {
                targetSection.classList.add("active");
            }

            // Handle specific section actions
            if (item.getAttribute("data-target") === "today-tasks") {
                loadProducts();
            } else if (item.getAttribute("data-target") === "aboutInfo") {
                loadAboutInfo();
            }
        });
    });

    // Load products into the "Available Products" section
    const loadProducts = () => {
        productList.innerHTML = ""; // Clear the product list

        const products = [
            { name: "Product 1", image: "s.jpg", description: "A high-quality product to meet your needs." },
            { name: "Product 2", image: "https://via.placeholder.com/150x100?text=Product+2", description: "A versatile product perfect for everyday use." },
            { name: "Product 3", image: "https://via.placeholder.com/150x100?text=Product+3", description: "A durable and reliable product for long-term use." },
            { name: "Product 4", image: "https://via.placeholder.com/150x100?text=Product+4", description: "An innovative product designed for modern consumers." },
            { name: "Product 5", image: "https://via.placeholder.com/150x100?text=Product+5", description: "A compact product with exceptional performance." },
            { name: "Product 6", image: "https://via.placeholder.com/150x100?text=Product+6", description: "A stylish and modern product for your needs." },
            { name: "Product 7", image: "https://via.placeholder.com/150x100?text=Product+7", description: "An eco-friendly product that saves energy." },
            { name: "Product 8", image: "https://via.placeholder.com/150x100?text=Product+8", description: "A premium product built with high-grade materials." },
            { name: "Product 9", image: "https://via.placeholder.com/150x100?text=Product+9", description: "An affordable product offering great value." },
            { name: "Product 10", image: "https://via.placeholder.com/150x100?text=Product+10", description: "A reliable product trusted by professionals." }
        ];

products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.className = "product";
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h4 class="product-name">${product.name}</h4>
        <div class="product-buttons">
            <button class="add-to-cart" onclick="addToCart(${index})">Add to Cart</button>
            <button class="buy-now" onclick="buyNow(${index})">Buy Now</button>
        </div>
        <p class="product-description">${product.description}</p>
    `;
    productList.appendChild(productCard);
});

    };

    // Load About Us info
    const loadAboutInfo = () => {
        aboutInfoSection.innerHTML = `
            <p>Contact Number: +1 234 567 8901</p>
            <p>Email: support@example.com</p>
            <p>Instagram: <a href="https://instagram.com/example" target="_blank">@example</a></p>
        `;
    };

    // Default load of products when the page loads
    loadProducts();
});

// Add to Cart functionality
function addToCart(index) {
    const products = [
        { name: "Product 1" },
        { name: "Product 2" },
        { name: "Product 3" },
        { name: "Product 4" },
        { name: "Product 5" },
        { name: "Product 6" },
        { name: "Product 7" },
        { name: "Product 8" },
        { name: "Product 9" },
        { name: "Product 10" }
    ];
    const product = products[index];
    const message = `Hi, I want to purchase: ${product.name}`;
    const whatsappURL = `https://wa.me/918921750844?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
}

// Buy Now functionality
function buyNow(index) {
    const products = [
        { name: "Product 1" },
        { name: "Product 2" },
        { name: "Product 3" },
        { name: "Product 4" },
        { name: "Product 5" },
        { name: "Product 6" },
        { name: "Product 7" },
        { name: "Product 8" },
        { name: "Product 9" },
        { name: "Product 10" }
    ];
    const product = products[index];
    const message = `Hi, I am interested in buying immediately: ${product.name}`;
    const whatsappURL = `https://wa.me/918921750844?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
}
    
  
