// javascript.js
// Desc: all of the javascript to run the "Who's Free?" web app
// Authoer: Noah Del Coro


// ===== VARIABLES =====
// Array of


// ===== CUSTOM CLASSES =====

// Custom time class
// hour=hour (int), min=minute (int), am=T for AM & F for PM (boolean)
function Time(day, hour, min, am) {
    this.day = day; // 1=mon, 2=tue, 3=wed, 4=thu, 5=fri
    this.hour = hour;
    this.min = min;
    this.am = am;

    this.lt = function (t) {
        if (this.am && t.pm) return false;
        else if (this.pm && t.am) return true;
        else if (this.hour > t.hour) return false;
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
    return new Time(d.getDay(), d.getHours() % 12 + 1, d.getMinutes(), d.getHours() < 12);
}

// Function to search the webpage and save as local data

// Reloads table with given time (default time: current time)


// ===== EVENT LISTENERS =====
// Listener for button press


// ===== MAIN =====
$(document).ready(function () {
    $('select').material_select();


})





//End
