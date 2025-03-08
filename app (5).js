// app.js

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
    if (createAccountForm) {
      createAccountForm.addEventListener("submit", (event) => {
        event.preventDefault();
  
        const username = document.getElementById("newUsername").value.trim();
        const email = document.getElementById("newEmail").value.trim();
        const password = document.getElementById("newPassword").value;
  
        if (username && email && password) {
          saveAccount(username, email, password);
          alert("Account created successfully! Redirecting to the dashboard...");
          redirectToPage("dashboard.html", username);
        } else {
          alert("All fields are required to create an account.");
        }
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
  });
  
    
document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".menu ul li");
    const sections = document.querySelectorAll(".content-section");
  
    menuItems.forEach((item) => {
      item.addEventListener("click", () => {
        menuItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
  
        sections.forEach((section) => {
          section.classList.remove("active");
          if (section.id === item.getAttribute("data-target")) {
            section.classList.add("active");
          }
        });
      });
    });
  });
  
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
    { 
        name: "Stretcher", 
        image: "s.jpg", 
        description: "Heavy Duty Stretcher for Patient Transport, Foldable & Portable, Adjustable Height for Easy Movement, Medical Rescue Equipment.", 
        price: 2200, 
        buyNowPrice: 1999  
    },
    { 
        name: "Wheelchair", 
        image: "w.jpg", 
        description: "Foldable Wheelchair for Easy Mobility, Lightweight Aluminum Frame, Adjustable Footrests, Comfortable Padded Seat, Ideal for Travel and Home Use.", 
        price: 3300, 
        buyNowPrice: 2999
    },
    { 
        name: "Prosthetic limbs", 
        image: "l.jpg", 
        description: "Prosthetic Arm for Upper Limb Amputees, Flexible Design, High-Performance Grip, Adjustable Socket for Optimal Fit, Comfortable and Functional.", 
        price: 16500, 
        buyNowPrice: 15000 
    },
    { 
        name: "Hearing aids", 
        image: "h.jpg", 
        description: "Rechargeable Hearing Aids for Seniors, Behind-the-Ear Style, Clear Sound Quality, Long Battery Life, Comfortable Fit.", 
        price: 1500, 
        buyNowPrice: 1400
    },
    { 
        name: "Lifting chair", 
        image: "lift.jpg", 
        description: "Power Lift Recliner Chair for Elderly, Remote-Controlled, Comfortable Plush Upholstery, Smooth Lifting Mechanism, Ideal for Seniors with Mobility Issues.", 
        price: 12879, 
        buyNowPrice: 10779 
    },
    { 
        name: "Cane", 
        image: "cane.jpg", 
        description: "Adjustable Walking Cane for Seniors, Lightweight Aluminum Frame, Ergonomic Handle for Comfort, Non-Slip Tip for Stability, Ideal for Everyday Use.", 
        price: 500, 
        buyNowPrice: 450 
    },
    { 
        name: "Power scooters", 
        image: "pw.jpg", 
        description: "Heavy-Duty Power Scooter for Adults, High Weight Capacity, Adjustable Speed Settings, Padded Seat and Backrest, Perfect for Long.", 
        price: 13000, 
        buyNowPrice: 12000 
    },
    { 
        name: "Hospital bed", 
        image: "bed.jpg", 
        description: "Manual Hospital Bed for Seniors, Adjustable Head and Foot Sections, Easy-to-Operate Crank Mechanism, Durable Construction for Home or Medical Use.", 
        price: 2000, 
        buyNowPrice: 1650 
    },
    { 
        name: "Prosthetic Arm", 
        image: "arm.jpg", 
        description: "Custom Prosthetic Arm for Upper Limb Amputees, Lightweight and Durable, Adjustable Fit for Comfort, Advanced Grip Technology for Enhanced Functionality.", 
        price: 20000, 
        buyNowPrice: 18000 
    },
    { 
        name: "Ultrasonic sensor", 
        image: "u.jpeg", 
        description: "Ultrasonic Obstacle Detection Sensor for Visually Impaired, Compact and Lightweight, Real-Time Vibration and Audio Alerts, High-Precision Detection for Enhanced Mobility.", 
        price: 1550, 
        buyNowPrice: 1500 
    }
];

products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
        <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <h3 class="product-price">₹${product.price}</h3> <!-- Price in Indian Rupees -->
        <div class="product-details">
            <h4 class="product-name">${product.name}</h4>
            <p class="product-description">${product.description}</p>
            <div class="product-buttons">
                <button class="add-to-cart" onclick="addToCart(${index})">Add to Cart</button>
                <button class="buy-now" onclick="buyNow(${index})">Buy Now ₹${product.buyNowPrice}</button>
            </div>
        </div>
    `;

    productList.appendChild(productCard);
});

};

// Add CSS styles to enhance the layout
const style = document.createElement("style");
style.innerHTML = `
    .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    background-image: url('grey.jpg');
    background-size: cover; /* Ensures the image fully covers the card */
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}


    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    }

.product-image-wrapper {
    width: 150px; /* Set a fixed width */
    height: 100px; /* Set a fixed height */
    overflow: hidden; /* Hide parts of the image that go outside this area */
    border-radius: 8px; /* Optional: Add rounded corners */
    margin-bottom: 10px; /* Add spacing below the image */
}

    .product-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .product-details {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .product-name {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0;
    }

    .product-description {
    font-size: 14px; /* Uniform font size for all descriptions */
    line-height: 1.5; /* Consistent spacing between lines */
    color: white; /* Standardized color for readability */
    text-align: left; /* Align text to the left */
    margin-top: 10px; /* Space above the description for separation */
    max-width: 300px; /* Optional: Limit the width for better alignment */
    overflow-wrap: break-word; /* Handle long words gracefully */
}


    .product-buttons {
        display: flex;
        gap: 10px;
    }

    .product-buttons button {
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .add-to-cart {
        background-color: #28a745;
        color: #fff;
    }

    .add-to-cart:hover {
        background-color: #218838;
    }

    .buy-now {
        background-color: #007bff;
        color: #fff;
    }

    .buy-now:hover {
        background-color: #0056b3;
    }
`;
document.head.appendChild(style);


    // Load About Us info
    const loadAboutInfo = () => {
        aboutInfoSection.innerHTML = `
            <p>Contact Number: +91 8921750844</p>
            <p>Email: <a href="mailto:swarajks93@gmail.com"> target="_blank">swarajks93@gmail.com</a></p>
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
    
