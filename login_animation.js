document.addEventListener("DOMContentLoaded", () => {
  password_toggel_hide();
  go();
});

function password_toggel_hide() {
  const passwordToggle = document.querySelector(".show-password");

  passwordToggle.addEventListener("click", () => {
    passwordToggle.classList.toggle("active");
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  });
}

function go() {
  const form = document.querySelector("form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Example validation (you can replace this with your actual validation logic)
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Replace with your actual validation logic
    if (username === "user" && password === "pass") {
      // Redirect to /main.html if validation is successful
      window.location.href = "./main.html";
    } else {
      alert("اسم المستخدم أو كلمة المرور غير صحيحة"); // Alert for incorrect credentials
    }
  });
}
