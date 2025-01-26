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
  
        const productImages = [
            "https://via.placeholder.com/150x100?text=Product+1",
            "https://via.placeholder.com/150x100?text=Product+2",
            "https://via.placeholder.com/150x100?text=Product+3",
            "https://via.placeholder.com/150x100?text=Product+4",
            "https://via.placeholder.com/150x100?text=Product+5",
            "https://via.placeholder.com/150x100?text=Product+6",
            "https://via.placeholder.com/150x100?text=Product+7",
            "https://via.placeholder.com/150x100?text=Product+8",
            "https://via.placeholder.com/150x100?text=Product+9",
            "https://via.placeholder.com/150x100?text=Product+10"
        ];
  
        productImages.forEach((imageUrl, index) => {
            const product = document.createElement("div");
            product.className = "product";
            product.innerHTML = `
                <img src="${imageUrl}" alt="Product ${index + 1}">
                <h4>Product ${index + 1}</h4>
                <button class="add-to-cart">Add to Cart</button>
                <button class="buy-now">Buy Now</button>
            `;
            productList.appendChild(product);
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
function addToCart(index) {
  const product = products[index];
  const message = `Hi, I want to purchase: ${product.name}`;
  const whatsappURL = `https://wa.me/918921750844?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
}
    
  
