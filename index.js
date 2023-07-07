/** Date Header */

const today = new Date();

const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

$("#list-title").html(today.toLocaleDateString("en-US", options) + "<br/> To Do List");


/** To Do List */

const items = [];
const checkedBoxes = [];
let numChecked = 0;

// Adding

$("#add-button").on("click", addItem);

$("#item-input").submit(function(event) {
    event.preventDefault();
    $("#add-button").click();
});

function addItem() {
    let newItem = $("#new-item").val();
    $("#new-item").reset;
    if (newItem.length === 0) {
        flashRed();
    }
    else {
        items.push(newItem);
        checkedBoxes.push("");
        updateList();  
    }
}

function flashRed() {
    $("#item-input").addClass("flash-red");
    setTimeout(function() {
        $("#item-input").removeClass("flash-red");
    }, 200);
}

// Deleting

$(document).on("click", ".delete-button", function () {
    deleteItem(this);
});

function deleteItem(item) {
    items.splice(item.value, 1);
    if (checkedBoxes[item.value] === "checked") {
        numChecked--;
    }
    else if (numChecked === items.length){
        motivate();
    }
    checkedBoxes.splice(item.value, 1);
    updateList();
}

// Checking

$(document).on("click", ".todo-item input", function() {
    if (this.checked) {
        checkedBoxes[this.value] = "checked";
        numChecked++;
        motivate();
    }
    else {
        if (checkedBoxes[this.value] === "checked") {
            numChecked--;
        }
        checkedBoxes[this.value] = "";

    }
});

// Updating

function updateList() {
    // clear list
    $(".todo-item ").remove();

    // update list
    for (let i = 0; i < items.length; i++) {
        let checked = checkedBoxes[i];
        $("#todo-list").append(`<div class='item todo-item'><input type='checkbox' value=${i.toString()} ${checked}><p>${items[i]}</p><form method='post'><button class='delete-button' type='button' value=${i.toString()}>✖</button></form></div>`);
    }    
}


/** Motivation Texts */

function motivate() {
    let tasksLeft = checkedBoxes.length - numChecked;
    let messages = [];
    
    if (tasksLeft === 0 || numChecked === items.length) {
        messages = [
            "Yayyy! All done!",
            "You did it! Now go take a break.",
            "Take that, to-do list!"
        ];
    }
    else {
        messages = [
        "Productivity!",
        "Booyah!",
        "Yessss.",
        "Look at how productive you're being!",
        "Phew. Glad that one's done!",
        "Got that one out of the way!",
        "Procrastination? Never heard of it.",
        ];

        if (tasksLeft > 0 && tasksLeft < 4) {
            messages.push("Only "+ tasksLeft +" left!");
            messages.push("You're almost there!");
            messages.push(tasksLeft +" left to go.");
        }
    }

    let len = messages.length;
    let index = Math.floor(Math.random() * len);

    animateMotivation(messages[index]);
}

function animateMotivation(msg) {
    let motivation = $("#motivation-text");
    motivation.text(msg).hide();
    motivation.stop(true);
    motivation.css("opacity", 1);
    motivation.slideDown()
    setTimeout(function() {
        $("#motivation-text").fadeOut(1500);
    }, 1000);
}
