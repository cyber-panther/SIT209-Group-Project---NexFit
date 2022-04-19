const API_URL = "http://localhost:5000/api";

if ($("#timer").length) {
  /* timer.html */
  let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  let time_log = "";
  let timerRef = document.querySelector(".timerDisplay");
  let int = null;

  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 10);

  document.getElementById("startTimer").addEventListener("click", () => {
    if (int !== null) {
      clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
  });

  document.getElementById("pauseTimer").addEventListener("click", () => {
    clearInterval(int);
  });

  function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
      milliseconds = 0;
      seconds++;
      if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
          minutes = 0;
          hours++;
        }
      }
    }
    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;

    timerRef.innerHTML = ` ${h} : ${m} : ${s}`;

    time_log = `${h}hr ${m}min ${s}sec`;
  }

  $("#user-back").on("click", () => {
    var body = { current: localStorage.getItem("sport"), change: -1 };

    $.post(`${API_URL}/sport`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });

    var body = {
      email: localStorage.getItem("user"),
      sport: localStorage.getItem("sport"),
      time: time_log,
    };

    $.post(`${API_URL}/log`, body)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });

    localStorage.removeItem("sport");
  });
}

if ($("#user-menu").length) {
  $(document).ready(function () {
    $("#logout").click(function () {
      localStorage.clear();
    });
  });
}

if ($("#table").length) {
  $.get(`${API_URL}/log`)
    .then((response) => {
      response.forEach((check) => {
        if (check.email == localStorage.getItem("user")) {
          check.activityLog.forEach((details) => {
            $("#table tbody").append(`
              <tr>
                <td>${details.sport}</td>
                <td>${details.time}</td>
                </tr>`);
          });
        }
      });
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
}
