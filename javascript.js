// javascript.js
// Desc: all of the javascript to run the "Who's Free?" web app
// Auther: Noah Del Coro


// ===== VARIABLES =====
// Array of all of the schedules
var schedules = {};

//Const with weekdays
const weekdays = {
    "Mo": 1,
    "Tu": 2,
    "We": 3,
    "Th": 4,
    "Fr": 5
};

// ===== CUSTOM CLASSES =====
// Custom time class
// hour=hour (int), min=minute (int), am=T for AM & F for PM (boolean)
function Time(hour, min) {
    this.hour = hour; //24 hour format
    this.min = min;

    this.lt = function (t) {
        if (this.hour > t.hour) return false;
        else if (this.hour < t.hour) return true;
        else return (this.min < t.min);
    }
}

// Schedule object
// Creates a schedule for each person
function Schedule(name) {
    // courses contains all classes each day
    // A course is an object w/ 2 elements in it: "start" Time + "end" Time
    this.courses = {
        1: [], // mon
        2: [], // tue
        3: [], // wed
        4: [], // thu
        5: [] // fri
    };
    this.name = name; // name of person to whom this schedule belongs
    //returns whether schedule is free at given time
    this.isFree = function (t) {
        let dailyCourses = this.courses[t.day];
        for (let course of dailyCourses) {
            if (course["start"].lt(t) && t.lt(course["end"])) return false;
        }
        return true;
    }
}


// ===== HELPER FUNCTIONS =====

// Gets current time
function currentTime() {
    d = new Date();
    return new Time(d.getHours(), d.getMinutes());
}

// Function to search the text and save as local data
function textToSchedule(name, text) {
    let sched = new Schedule(name);
    let times = text.match(/\n(Mo|Tu|We|Th|Fr)( |Mo|Tu|We|Th|Fr).*/gm);
    for (let t of times) {
        let days = [];
        t = t.substring(1); // Take out \n

        console.log(t);

        while (t.substring(0, 1) != " ") { // while t starts w/ day of week
            days.push(weekdays[t.substring(0, 2)]);
            t = t.substring(2); //remove day
        }
        t = t.substring(1); //remove space

        console.log("Days: " + days);
        console.log("t: " + t);


        let t1 = new Time(
            Number(/\d+(?=:)/.exec(t)) + Number((/PM(?= )/.test(t) && Number(/\d+(?=:)/.exec(t)) != 12) ? 12 : 0),
            Number(/\d{2}(?=(?:AM|PM))/.exec(t)));
        t = t.substring(9); // jump to next date

        console.log("t1: " + t1.hour + ":" + t1.min);
        console.log("t: " + t);

        let t2 = new Time(
            Number(/\d+(?=:)/.exec(t)) + Number((/PM/.test(t) && Number(/\d+(?=:)/.exec(t)) != 12) ? 12 : 0),
            Number(/\d{2}(?=(?:AM|PM))/.exec(t)));

        console.log("t2: " + t2.hour + ":" + t2.min);

        for (let day of days) { // add times to day
            sched.courses[day].push({
                "start": t1,
                "end": t2
            });
        }
        console.log(sched);
        console.log("");
    }
}
// Reloads table with given time (default time: current time)
function updateTable() {
    for (s of schedules) {

    }
}

// ===== EVENT LISTENERS =====
// Listener for button press
function clicked() {
    if (/\S/.test($("#nameText").val()) && /\S/.test($("#schedText").val())) {
        schedules.push(textToSchedule($("#nameText").val(), $("#schedText").val()));
    }
    updateTable();
}

// ===== MAIN =====
$(document).ready(function () {
    $('select').material_select();


})



/*

        console.log(t.match(/\d+(?=:)/));
        console.log(/AM(?= )/.test(t) ? 0 : 12);
        console.log(((t.match(/\d+(?=:)/)) - 1) + /AM(?= )/.test(t) ? 0 : 12);
        console.log(t.match(/\d{2}(?=(?:AM|PM))/));


var test1 = new Time(1, 11, 0);
    var test2 = new Time(1, 11, 50);
    console.log(test1.lt(test2));
    console.log(currentTime().min);

    var s = new Schedule();
    console.log(s.isFree(test1));
    s.courses[1] = [[test1, test2]];
    console.log(s.isFree(new Time(1, 11, 12)));
    console.log(s.isFree(new Time(1, 11, 0)));
    console.log(s.isFree(new Time(1, 11, 45)));
    console.log(s.isFree(new Time(1, 10, 12)));
    console.log(s.isFree(new Time(1, 12, 12)));
*/
//End
