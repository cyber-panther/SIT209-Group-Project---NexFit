$("#navbar").load("common/navbar.html");

const API_URL = "http://localhost:5000/api";

function alert_box(alerts) {
  alert(alerts);
}

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

$("#register-user").on("click", () => {
  const name = $("#user-name").val();
  const email = $("#user-mail").val();
  const password = $("#user-pass").val();
  const repassword = $("#user-pass-repeat").val();
  const activityLog = [];

  const body = {
    name,
    email,
    password,
    activityLog,
  };

  if (name == "" || email == "" || password == "" || repassword == "") {
    alert_box("Please enter all Fields");
    return;
  }

  if (!validateEmail(email)) {
    alert_box("enter valid Email");
    return;
  }

  if (password != repassword) {
    alert_box("Passwords do not match!");
    return;
  }

  $.post(`${API_URL}/users`, body)
    .then((response) => {
      alert(response);
      location.href = "/login";
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
});

function Autheticate(response, mail, pass) {
  var checker = false;
  response.forEach((check) => {
    if ((check.email == mail || check.name == mail) && check.password == pass) {
      localStorage.setItem("user", check.email);
      checker = !checker;
    }
  });

  if (checker) {
    alert_box("Log In Succesfull");
    location.href = "/account";
  } else alert_box("Incorrect Username or Password");
}

$("#login-user").on("click", () => {
  const mail = $("#check-mail").val();
  const pass = $("#check-pass").val();

  if (mail == "" || pass == "") {
    alert_box("Please enter both fields");
    return;
  }

  $.get(`${API_URL}/users`)
    .then((response) => {
      Autheticate(response, mail, pass);
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
});

$(
  "#user-name,#user-mail,#user-pass,#user-pass-repeat,#check-mail,#check-pass"
).keypress(function (event) {
  if (event.keyCode === 13) {
    $("#login-user").click();
    $("#register-user").click();
  }
});
