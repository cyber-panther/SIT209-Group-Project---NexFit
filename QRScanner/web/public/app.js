function onScanSuccess(decodedText, decodedResult) {
    // alert(`Scan result: ${decodedText}`, decodedResult);
    html5QrcodeScanner.clear();
    showdiv()

    Email.send({
        Host: "smtp.gmail.com",
        Username: "himanshu02092002@gmail.com",
        Password: "hjjxowzuugqwfvmv",
        To: 'himanshu3038.be20@chitkara.edu.in',
        From: "himanshu02092002@gmail.com",
        Subject: "Costumer Logged",
        Body: `<p>User Logged Successfully <br> Sports: ${decodedText} <p>`,
    })
        .then(function (message) {
            console.log("mail sent successfully")
        });

    func(decodedText);

    const myTimeout = setTimeout(myGreeting, 5000);

    function myGreeting() {
        clearTimeout(myTimeout);
        window.location.reload();
    }
}

var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
    fps: 10,
    qrbox: 250,
});
html5QrcodeScanner.render(onScanSuccess);

function showdiv() {
    document.getElementById("div").style.visibility = "visible";
}

function func(Content) {
    var date = new Date();

    const _Date = date;

    const API_URL = "http://localhost:5000/api";

    const response = $.get(`${API_URL}/devices`);
    console.log(response);

    const body = {
        Content,
        _Date
    };

    $.post(`${API_URL}/devices`, body)
        .then((response) => {
        })
        .catch((error) => {
            console.error(`Error: ${error}`);
        });


    const MQTT_URL = 'http://localhost:5001/send-command';

    const deviceId = 1;
    const command = 1;
    $.post(MQTT_URL, { deviceId, command })
        .then(response => {
            // alert(command)
        })
}