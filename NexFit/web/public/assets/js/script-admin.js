if ($("#admin").length) {
  var a = 0;
  var link;

  function password() {
    var pass = 1234567;

    if (a >= 0 && a <= 2) {
      if (document.getElementById("pass").value != "") {
        if (pass == document.getElementById("pass").value) {
          alert("Login Successful!");
          location.href = "/admin-control";
        } else if (pass != document.getElementById("pass").value) {
          alert("Password Incorrect");
          a++;
        }
      } else {
        alert("Enter password");
      }
    } else {
      alert("You have reached the maximum tries. \nPlease wait for 15 seconds");
      setTimeout(function () {
        a = 0;
      }, 15000);
    }
  }
}

if ($("#admin-control").length) {
  var room_data = ["off", "off", "off", "off", "off"];
var selected = 0;

// document.getElementById("year").innerHTML = new Date().getFullYear();

function log_select(id) {
    var select = document.getElementById(id).value;
}

function switchchange() {
    var select = document.getElementById("customSwitch1").checked;

    if (select) {
        color_indicate();
        document.getElementById("color_select").disabled = false;
        document.getElementById("icon_status").src = "https://cyber-panther.github.io/Digital-Twin/img/lightbulb_on.svg";
        document.getElementById("text_status").innerHTML = "Lights ON";
    } else {
        room_data[selected] = "off";

        document.getElementById("color_select").disabled = true;
        document.getElementById("icon_status").src = "https://cyber-panther.github.io/Digital-Twin/img/lightbulb_off.svg";
        document.getElementById("text_status").innerHTML = "Lights OFF";
        document.getElementById("color_indicator").innerHTML = "OFF";
        document.getElementById("color_indicator").src = "https://cyber-panther.github.io/Digital-Twin/img/bulb_off.png";

    }
}

function color_indicate(color) {
    var color = document.getElementById("color_select").value;
    room_data[selected] = color;

    switch (color) {
        case "White":
            document.getElementById("color_indicator").src = "https://cyber-panther.github.io/Digital-Twin/img/bulb_white.png";
            break;
        case "Red":
            document.getElementById("color_indicator").src = "https://cyber-panther.github.io/Digital-Twin/img/bulb_red.png";
            break;
        case "Blue":
            document.getElementById("color_indicator").src = "https://cyber-panther.github.io/Digital-Twin/img/bulb_blue.png";
            break;
        case "Green":
            document.getElementById("color_indicator").src = "https://cyber-panther.github.io/Digital-Twin/img/bulb_green.png";
            break;
        case "Yellow":
            document.getElementById("color_indicator").src = "https://cyber-panther.github.io/Digital-Twin/img/bulb_yellow.png";
            break;

        default:
            document.getElementById("color_indicator").src = "https://cyber-panther.github.io/Digital-Twin/img/bulb_off.png";
            break;
    }
}

function room_indicate(id) {
    var room = document.getElementById(id).value;
    document.getElementById("color_select").value = "White";

    switch (room) {
        case "0":
            document.getElementById("room_indicator").src = "assets/img/admin/basketball_court.png";
            selected = 0;
            break;
        case "1":
            document.getElementById("room_indicator").src = "assets/img/admin/squash_court.png";
            selected = 1;
            break;
        case "2":
            document.getElementById("room_indicator").src = "assets/img/admin/tt_court.png";
            selected = 2;
            break;
        case "3":
            document.getElementById("room_indicator").src = "assets/img/admin/football_court.png";
            selected = 3;
            break;
        case "4":
            document.getElementById("room_indicator").src = "assets/img/admin/badminton_court.png";
            selected = 4;
            break;
        default:
            document.getElementById("room_indicator").src = "assets/img/admin/Mergeassets/img/badminton_court.png";
            break;
    }

    room_manager();
}

function room_manager() {
    switch (room_data[selected]) {
        case "off":
            document.getElementById("customSwitch1").checked = false;
            switchchange();
            break;

        case "White":
            document.getElementById("customSwitch1").checked = true;
            document.getElementById("color_select").value = "White";
            switchchange();
            break;

        case "Red":
            document.getElementById("customSwitch1").checked = true;
            document.getElementById("color_select").value = "Red";
            switchchange();
            break;

        case "Blue":
            document.getElementById("customSwitch1").checked = true;
            document.getElementById("color_select").value = "Blue";
            switchchange();
            break;

        case "Green":
            document.getElementById("customSwitch1").checked = true;
            document.getElementById("color_select").value = "Green";
            switchchange();
            break;

        case "Yellow":
            document.getElementById("customSwitch1").checked = true;
            document.getElementById("color_select").value = "Yellow";
            switchchange();
            break;

        default:
            break;
    }
}
}
