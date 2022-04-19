var input = document.getElementById("input");
var input1 = document.getElementById("input1");
var input2 = document.getElementById("input2");
var input3 = document.getElementById("input3");
var button = document.querySelector(".submit");

button.addEventListener("click", function (name) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
      "X-RapidAPI-Key": "078bf5cfbfmshe0771fedbe987fep11f340jsn81dedab6e51f",
    },
  };

  fetch(
    "https://fitness-calculator.p.rapidapi.com/burnedcalorie?activityid=bi_1&activitymin=" +
      input3.value +
      "&weight=" +
      input.value,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const a = response.data.burnedCalorie;
      const b = response.data.unit;
      if (input3.value <= 30 && input3.value > 0) {
        document.querySelector(
          "#app"
        ).innerHTML = `<div class="user"><p>Calories: ${a} ${b}</p></div>`;
        // document.querySelector('#app4').innerHTML = `<div class="user"><p>Almost There! Try to put in more work</p></div>`;
      }

      document.querySelector(
        "#app"
      ).innerHTML = `<div class="user"><p>Calories: ${a} ${b}</p></div>`;
    })
    .catch((err) => console.error(err));

  fetch(
    "https://fitness-calculator.p.rapidapi.com/bmi?age=" +
      input2.value +
      "&weight=" +
      input.value +
      "&height=" +
      input1.value,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const a = response.data.bmi;
      const b = response.data.health;
      const c = response.data.healthy_bmi_range;
      document.querySelector(
        "#app1"
      ).innerHTML = `<div class="user"><p>Body Mass Index: ${a}</p></div>`;
      document.querySelector(
        "#app2"
      ).innerHTML = `<div class="user"><p>Health: ${b}</p></div>`;
      document.querySelector(
        "#app3"
      ).innerHTML = `<div class="user"><p>BMI Range: ${c}</p></div>`;
    })
    .catch((err) => console.error(err));
});
