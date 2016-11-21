// javascript.js
// Desc: all of the javascript to run the "Who's Free?" web app
// Authoer: Noah Del Coro


// ===== VARIABLES =====
// Assosciative array of schedules with names
var people = {};


// ===== CUSTOM CLASSES =====
// Custom time class
// hour=hour (int), min=minute (int), am=T for AM & F for PM (boolean)
function Time(day, hour, min) {
    this.day = day; // 1=mon, 2=tue, 3=wed, 4=thu, 5=fri
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
    // A course is an array with 2 elements in it: start Time and end Time
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
            if (course[0].lt(t) && t.lt(course[1])) return false;
        }
        return true;
    }
}

// ===== HELPER FUNCTIONS =====

// Gets current time
function currentTime() {
    d = new Date();
    return new Time(d.getDay(), d.getHours(), d.getMinutes());
}

// Function to search the text and save as local data

// Reloads table with given time (default time: current time)


// ===== EVENT LISTENERS =====
// Listener for button press


// ===== MAIN =====
$(document).ready(function () {
    $('select').material_select();

})




/*
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
