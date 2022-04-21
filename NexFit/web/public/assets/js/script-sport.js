const API_URL = "http://localhost:5000/api";
var current = "";

$("#football-max").hide();
$("#basketball-max").hide();
$("#lawntennis-max").hide();
// $('#id').show();

if ($("#QR-sport").length) {
  document.getElementById("QR-sport").style.display = "none";
}
$.get(`${API_URL}/sport`)
  .then((response) => {
    document.getElementById("basketball-num").innerHTML = response[0].number;
    document.getElementById("football-num").innerHTML = response[1].number;
    document.getElementById("lawntennis-num").innerHTML = response[2].number;

    if (response[1].number == 12) {
      $("#play-football").hide();
      $("#football-max").show();
    }

    if (response[0].number == 10) {
      $("#play-basketball").hide();
      $("#basketball-max").show();
    }

    if (response[2].number == 4) {
      $("#play-lawntennis").hide();
      $("#lawntennis-max").show();
    }
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });

$("#play-football").on("click", () => {
  makeCode(`${localStorage.getItem("user")} started playing Football`);
  current = "football";
});

$("#play-basketball").on("click", () => {
  makeCode(`${localStorage.getItem("user")} started playing Basketball`);
  current = "basketball";
});

$("#play-lawntennis").on("click", () => {
  makeCode(`${localStorage.getItem("user")} started playing Lawntennis`);
  current = "lawntennis";
});

function makeCode(inputtext) {
  document.getElementById("sport-capacity").style.display = "none";
  document.getElementById("QR-sport").style.display = "block";

  var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: inputtext,
    correctLevel: QRCode.CorrectLevel.H,
  });
}

$("#capacity_update").on("click", () => {
  localStorage.setItem("sport", current);
  const body = { current, change: 1 };

  $.post(`${API_URL}/sport`, body)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
});
