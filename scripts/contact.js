let nameValid = false;
let emailValid = false;
let messageValid = false;
// check if form contents are valid

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emailChecker(emailInput) {
  let validity;
  const check = emailInput.parentNode.querySelector(".fa-check-circle");
  const exclamation = emailInput.parentNode.querySelector(
    ".fa-exclamation-circle"
  );
  const errorMessage = emailInput.parentNode.querySelector(".errorMessage");
  if (emailInput.value.trim() === "" || !re.test(emailInput.value)) {
    validity = false;
    check.style.display = "none";
    exclamation.style.display = "block";
    emailInput.classList.remove("correctInput");
    emailInput.classList.add("errorInput");
    if (emailInput.value.trim() === "") {
      errorMessage.textContent = "Field cannot be left blank.";
    } else {
      errorMessage.textContent = "Must enter a valid email address.";
    }
  } else {
    validity = true;
    check.style.display = "block";
    exclamation.style.display = "none";
    emailInput.classList.remove("errorInput");
    emailInput.classList.add("correctInput");
    errorMessage.textContent = "\u200E";
  }
  return validity;
}

function textChecker(input) {
  let validity;
  const check = input.parentNode.querySelector(".fa-check-circle");
  const exclamation = input.parentNode.querySelector(".fa-exclamation-circle");
  const errorMessage = input.parentNode.querySelector(".errorMessage");
  if (input.value.trim() === "") {
    validity = false;
    check.style.display = "none";
    exclamation.style.display = "block";
    input.classList.remove("correctInput");
    input.classList.add("errorInput");
    errorMessage.textContent = "Field cannot be left blank.";
    input.value = "";
  } else {
    validity = true;
    check.style.display = "block";
    exclamation.style.display = "none";
    input.classList.remove("errorInput");
    input.classList.add("correctInput");
    errorMessage.textContent = "\u200E";
  }
  return validity;
}

nameInput.addEventListener("blur", () => {
  nameValid = textChecker(nameInput);
});

messageInput.addEventListener("blur", () => {
  messageValid = textChecker(messageInput);
});

emailInput.addEventListener("blur", () => {
  emailValid = emailChecker(emailInput);
});

emailInput.addEventListener("keydown", (event) => {
  if (event.key == " ") {
    event.preventDefault();
  }
});

// sumbit the email
const form = document.querySelector(".emailFormContainer form");
const result = document.getElementById("result");
const resultText = result.querySelector("p");
const resultIcon = result.querySelector("i");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  nameValid = textChecker(nameInput);
  messageValid = textChecker(messageInput);
  emailValid = emailChecker(emailInput);
  if (emailValid && nameValid && messageValid) {
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        console.log(json);
        if (response.status == 200) {
          resultIcon.classList.add("fa-check-circle");
          resultText.textContent = json.message;
        } else {
          resultText.textContent = json.message;
        }
        console.log("added");
        result.classList.add("movedResult");
        // result.style.visibility = "visible";
      })
      .catch((error) => {
        resultIcon.classList.add("fa-exclamation-circle");
        resultText.textContent = "Something went wrong!";
        result.classList.add("movedResult");
        // result.style.display = "visible";
      })
      .then(function () {
        console.log("in");
        form.reset();
        setTimeout(() => {
          console.log("remvoed");
          result.classList.remove("movedResult");
        }, 2500);
      });
  }
});

// text area auto grow
const textarea = document.querySelector("#messageDiv textarea");

function auto_grow(element) {
  const scrollTop = document.documentElement.scrollTop;
  element.style.height = "100px";
  element.style.height = element.scrollHeight + "px";
  window.scrollTo(0, scrollTop);
}

auto_grow(textarea);

textarea.addEventListener("input", function () {
  auto_grow(this);
});
