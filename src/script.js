function AddressEntry(place, location, timeDate, landmarks, notes) {
    this.place = place;
    this.location = location;
    this.timeDate = timeDate;
    this.landmarks = landmarks;
    this.notes= notes;
}

let addressEntries = JSON.parse(localStorage.getItem("addressEntries")) || [];
let addressBookForm = document.getElementById("address-book-form");
let addressBookTable = document.getElementById("address-book-table").getElementsByTagName('tbody')[0];

addressBookForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const place = document.getElementById("place-you-have-been").value.trim();
    const location = document.getElementById("location").value.trim();
    const timeDate = document.getElementById("time-and-date").value.trim();
    const landmarks = document.getElementById("landmarks").value.trim();
    const notes = document.getElementById("notes").value.trim();

    if (place && location && timeDate && landmarks && notes) {
        const newEntry = new AddressEntry(place, location, timeDate, landmarks, notes);
        addressEntries.push(newEntry);
        localStorage.setItem("addressEntries", JSON.stringify(addressEntries));
        addressBookForm.reset();
        displayEntries(addressEntries);
    } else {
        alert("⚠️ Please fill in all fields!");
    }
});

function displayEntries(data) {
    addressBookTable.innerHTML = "";
    data.forEach(entry => {
        let row = document.createElement("tr");
        row.innerHTML = entry.display();
        addressBookTable.appendChild(row);
    });
}

displayEntries(addressEntries);

let taskDoneForm = document.getElementById("task-done-form");

taskDoneForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskStatus = document.getElementById("task-done").value.trim();
    if (taskStatus) {
        alert(`Task: ${taskStatus}`);
        taskDoneForm.reset();
    } else {
        alert("⚠️ Please enter the task status!");
    }
});

let removeListForm = document.getElementById("remove-list-form");

removeListForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const removeItem = document.getElementById("to-remove-list").value.trim();
    if (removeItem) {
        addressEntries = addressEntries.filter(entry => entry.place !== removeItem);
        localStorage.setItem("addressEntries", JSON.stringify(addressEntries));
        removeListForm.reset();
        displayEntries(addressEntries);
    } else {
        alert("⚠️ Please specify the place to remove!");
    }
});
