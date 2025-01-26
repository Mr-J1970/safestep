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
            { name: "Stretcher", image: "s.jpg", description: "Heavy Duty Stretcher for Patient Transport, Foldable & Portable, Adjustable Height for Easy Movement, Medical Rescue Equipment." },
            { name: "Wheelchair", image: "w.jpg", description: "Foldable Wheelchair for Easy Mobility, Lightweight Aluminum Frame, Adjustable Footrests, Comfortable Padded Seat, Ideal for Travel and Home Use." },
            { name: "Prosthetic limbs", image: "l.jpg", description: "Prosthetic Arm for Upper Limb Amputees, Flexible Design, High-Performance Grip, Adjustable Socket for Optimal Fit, Comfortable and Functional." },
            { name: "Hearing aids", image: "h.jpg", description: "Rechargeable Hearing Aids for Seniors, Behind-the-Ear Style, Clear Sound Quality, Long Battery Life, Comfortable Fit." },
            { name: "Lifting chair", image: "lift.jpg", description: "Power Lift Recliner Chair for Elderly, Remote-Controlled, Comfortable Plush Upholstery, Smooth Lifting Mechanism, Ideal for Seniors with Mobility Issues." },
            { name: "Cane", image: "cane.jpg", description: "Adjustable Walking Cane for Seniors, Lightweight Aluminum Frame, Ergonomic Handle for Comfort, Non-Slip Tip for Stability, Ideal for Everyday Use." },
            { name: "Power scooters", image: "pw.jpg", description: "Heavy-Duty Power Scooter for Adults, High Weight Capacity, Adjustable Speed Settings, Padded Seat and Backrest, Perfect for Long." },
            { name: "Hospital bed", image: "bed.jpg", description: "Manual Hospital Bed for Seniors, Adjustable Head and Foot Sections, Easy-to-Operate Crank Mechanism, Durable Construction for Home or Medical Use" },
            { name: "Prosthetic Arm", image: "arm.jpg", description: "Custom Prosthetic Arm for Upper Limb Amputees, Lightweight and Durable, Adjustable Fit for Comfort, Advanced Grip Technology for Enhanced Functionality" },
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
            <p>Contact Number: +91 8921750844</p>
            <p>Email: <a href="mailto:swarajks93@gmail.com">swarajks93@gmail.com</a></p>
            <p>Instagram: <a href="https://instagram.com/swaraj_r7" target="_blank">@swaraj_r7</a></p>
        `;
    };

    // Default load of products when the page loads
    loadProducts();
});

// Add to Cart functionality
function addToCart(index) {
    const products = [
            { name: "Stretcher" },
        { name: "Wheelchair" },
        { name: "Prosthetic limbs" },
        { name: "Hearing aids" },
        { name: "Lifting chair" },
        { name: "Cane" },
        { name: "Power scooters" },
        { name: "Hospital bed" },
        { name: "Prosthetic Arm" },
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
          { name: "Stretcher" },
        { name: "Wheelchair" },
        { name: "Prosthetic limbs" },
        { name: "Hearing aids" },
        { name: "Lifting chair" },
        { name: "Cane" },
        { name: "Power scooters" },
        { name: "Hospital bed" },
        { name: "Prosthetic Arm" },
        { name: "Product 10" }
    ];
    const product = products[index];
    const message = `Hi, I am interested in buying immediately: ${product.name}`;
    const whatsappURL = `https://wa.me/918921750844?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
}
    
  
