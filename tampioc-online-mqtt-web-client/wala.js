var broker = document.getElementById('broker').value;
var connectToBroker = document.getElementById('connectToBroker');
var publishButton = document.getElementById('publishButton');
var client = mqtt.connect(broker);

var publishedTopic = document.getElementById('publishTopic');
var publishedPayload = document.getElementById('publishPayload');
var topic = document.getElementById('publishTopic').value;
var payload = document.getElementById('publishPayload').value;

var subscribedTopic = document.getElementById('subscribedTopic');
var subscribedButton = document.getElementById('subscribedButton')

var date = new Date();


//Creating table row 
function createTableBroker() {
    client.on('message', function (topic, payload) {
        var tbody = document.getElementById('tbody-broker');
        var row = tbody.insertRow(0)
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = topic;
        cell2.innerHTML = payload;
        cell3.innerHTML = date.toUTCString();
    })
}


//Creating table row 
function publishedTable() {
    var tbody = document.getElementById('tbody-pub');
    var row = tbody.insertRow(0)
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = publishedTopic.value;
    cell2.innerHTML = publishedPayload.value;
    cell3.innerHTML = date.toUTCString();

}
//Creating table row 
function subscriberTable() {
    var tbody = document.getElementById('tbody-sub');
    var row = tbody.insertRow(0)
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = subscribedTopic.value;
    cell2.innerHTML = date.toUTCString();

}


connectToBroker.addEventListener('click', () => {
    document.getElementById('broker-status').value = "Connecting to " + broker;
    client.on('connect', function () {
        document.getElementById('broker-status').value = "Successfully Connected!"
        console.log("Connected!");

        publishButton.addEventListener('click', () => {
            if (publishedTopic.value != "" && publishedPayload.value != "") {
                client.publish(publishedTopic.value, publishedPayload.value);
                publishedTable();
            } else {
                alert("Please fill out all field!")
            }

        })
        //Subscribe button event
        subscribedButton.addEventListener('click', () => {

            if (subscribedTopic.value != "") {
                client.subscribe(subscribedTopic.value);
                subscriberTable();
            } else {
                alert("Please fill out all field!")
            }
        })
        createTableBroker()
    })
})
