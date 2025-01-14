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
  
    
  