document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.getElementById("signInForm");
    const createAccountForm = document.getElementById("createAccountForm");
    const createAccountLink = document.getElementById("createAccountLink");

    const saveAccount = (username, email, password) => {
        localStorage.setItem("userAccount", JSON.stringify({ username, email, password }));
    };

    const getAccount = () => JSON.parse(localStorage.getItem("userAccount"));

    const redirectToPage = (url, username) => {
        if (username) {
            localStorage.setItem("loggedInUser", username);
        }
        window.location.href = url;
    };

    const handleFormSubmission = (form, callback) => {
        if (form) {
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                callback();
            });
        }
    };

    handleFormSubmission(signInForm, () => {
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

    handleFormSubmission(createAccountForm, () => {
        const username = document.getElementById("newUsername")?.value.trim();
        const email = document.getElementById("newEmail")?.value.trim();
        const password = document.getElementById("newPassword")?.value;

        if (!username || !email || !password) {
            alert("All fields are required to create an account.");
            return;
        }

        saveAccount(username, email, password);
        alert("Account created successfully! Redirecting to the dashboard...");
        redirectToPage("dashboard.html?username=" + encodeURIComponent(username));
    });

    if (createAccountLink) {
        createAccountLink.addEventListener("click", () => {
            redirectToPage("s.html");
        });
    }

    const updateUsernameInProfile = () => {
        const usernameElement = document.querySelector(".profile h2");
        const savedUser = localStorage.getItem("loggedInUser");

        if (savedUser && usernameElement) {
            usernameElement.textContent = savedUser;
        } else {
            console.error("Username element or saved user not found!");
        }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    if (username) {
        localStorage.setItem("loggedInUser", username);
    }
    updateUsernameInProfile();

    const menuItems = document.querySelectorAll(".menu ul li");
    const sections = document.querySelectorAll(".content-section");
    const productList = document.getElementById("productList");
    const aboutInfoSection = document.getElementById("aboutInfo");

    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            menuItems.forEach(i => i.classList.remove("active"));
            sections.forEach(section => section.classList.remove("active"));

            item.classList.add("active");
            const targetSection = document.getElementById(item.getAttribute("data-target"));
            if (targetSection) {
                targetSection.classList.add("active");
            }

            if (item.getAttribute("data-target") === "today-tasks") {
                loadProducts();
            } else if (item.getAttribute("data-target") === "aboutInfo") {
                loadAboutInfo();
            }
        });
    });

    const products = [
        { name: "Stretcher", image: "s.jpg", description: "Heavy Duty Stretcher for Patient Transport...", price: 8821, buyNowPrice: 8000 },
        { name: "Wheelchair", image: "w.jpg", description: "Foldable Wheelchair for Easy Mobility...", price: 13293, buyNowPrice: 12999 },
        { name: "Prosthetic limbs", image: "l.jpg", description: "Prosthetic Arm for Upper Limb Amputees...", price: 17500, buyNowPrice: 17000 },
        { name: "Hearing aids", image: "h.jpg", description: "Rechargeable Hearing Aids for Seniors...", price: 15000, buyNowPrice: 14820 },
        { name: "Lifting chair", image: "lift.jpg", description: "Power Lift Recliner Chair for Elderly...", price: 82879, buyNowPrice: 80779 },
        { name: "Cane", image: "cane.jpg", description: "Adjustable Walking Cane for Seniors...", price: 1500, buyNowPrice: 1450 },
        { name: "Power scooters", image: "pw.jpg", description: "Heavy-Duty Power Scooter for Adults...", price: 130000, buyNowPrice: 120000 },
        { name: "Hospital bed", image: "bed.jpg", description: "Manual Hospital Bed for Seniors...", price: 2000, buyNowPrice: 1650 },
        { name: "Prosthetic Arm", image: "arm.jpg", description: "Custom Prosthetic Arm for Upper Limb Amputees...", price: 200000, buyNowPrice: 180000 },
        { name: "Ultrasonic sensor", image: "u.jpeg", description: "Ultrasonic Obstacle Detection Sensor...", price: 550, buyNowPrice: 500 }
    ];

    const loadProducts = () => {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";
            productCard.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                </div>
                <h3 class="product-price">₹${product.price}</h3>
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

    const style = document.createElement("style");
    style.innerHTML = `
        .product-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 20px;
            margin: 16px;
            background: url('grey.jpg') center/cover no-repeat;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            overflow: hidden;
        }

        .product-card:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
        }

        .product-image-wrapper {
            width: 160px;
            height: 110px;
            overflow: hidden;
            border-radius: 10px;
            margin-bottom: 12px;
            transition: transform 0.3s ease-in-out;
        }

        .product-image-wrapper:hover {
            transform: scale(1.1);
            width: 100%;
        }

        .product-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }

        .product-details {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            max-width: 280px;
        }

        .product-name {
            font-size: 20px;
            font-weight: 600;
            margin: 10px 0;
            color: white;
        }

        .product-description {
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.9);
            margin-top: 10px;
            text-align: center;
            word-wrap: break-word;
            max-width: 90%;
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

    const loadAboutInfo = () => {
        aboutInfoSection.innerHTML = `
            <p>Contact Number: +91 8921750844</p>
            <p>Email: <a href="mailto:swarajks93@gmail.com" target="_blank">swarajks93@gmail.com</a></p>
            <p>Instagram: <a href="https://instagram.com/swaraj_r7" target="_blank">@swaraj_r7</a></p>
        `;
    };

    const addToCart = (index) => {
        const product = products[index];
        const message = `Hi, I want to purchase: ${product.name}`;
        const whatsappURL = `https://wa.me/918921750844?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    };

    const buyNow = (index) => {
        const product = products[index];
        const message = `Hi, I am interested in buying immediately: ${product.name}`;
        const whatsappURL = `https://wa.me/918921750844?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    };

    window.addToCart = addToCart;
    window.buyNow = buyNow;

    loadProducts();
});
