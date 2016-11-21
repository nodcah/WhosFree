// javascript.js
// Desc: all of the javascript to run the "Who's Free?" web app
// Authoer: Noah Del Coro


// ===== VARIABLES =====
// Assosciative array of schedules with names
var people = {};

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
function Schedule() {
    // courses contains all classes each day
    // A course is an object w/ 2 elements in it: "start" Time + "end" Time
    this.courses = {
            1: [], // mon
            2: [], // tue
            3: [], // wed
            4: [], // thu
            5: [] // fri
        }
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
function textToSchedule(text) {
    let sched = new Schedule();
    let times = text.match(/\n(Mo|Tu|We|Th|Fr)( |Mo|Tu|We|Th|Fr).*/gm);
    for (let t of times) {
        let days = []
        t = t.substring(1); // Take out \n

        console.log("t@1\t" + t);

        while (t.substring(0, 1) != " ") { // while t starts w/ day of week
            days.push(weekdays[t.substring(0, 2)]);
            t = t.substring(2); //remove day
        }
        t = t.substring(1); //remove space

        console.log("Days:\t" + days);
        console.log("t@2\t" + t);


        let t1 = new Time(
            Number(/\d+(?=:)/.exec(t)) + Number(/AM(?= )/.test(t) ? 0 : 12),
            Number(/\d{2}(?=(?:AM|PM))/.exec(t)))
        t = t.substring(9); // jump to next date

        console.log("t1: " + t1.hour + ":" + t1.min);
        console.log("t@3\t" + t);

        let t2 = new Time(
            Number(/\d+(?=:)/.exec(t)) + Number(/AM(?= )/.test(t) ? 0 : 12),
            Number(/\d{2}(?=(?:AM|PM))/.exec(t)))

        console.log("t2: " + t2.hour + ":" + t2.min);

        for (let day of days) { // add times to day
            sched.courses[day].push({
                "start": t1,
                "end": t2
            })
        }
        console.log("sched:");
        console.log(sched);
    }
}
// Reloads table with given time (default time: current time)


// ===== EVENT LISTENERS =====
// Listener for button press


// ===== MAIN =====
$(document).ready(function () {
    $('select').material_select();
    test = "\nTh 2:00PM - 5:00PM";
    textToSchedule(test);
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
