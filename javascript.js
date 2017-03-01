// javascript.js
// Desc: all of the javascript to run the "Who's Free?" web app
// Auther: Noah Del Coro


// ===== VARIABLES =====
// Array of all of the schedules
var schedules = [];

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
    this.h = hour; //24 hour format
    this.m = min;
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


}


// ===== HELPER FUNCTIONS =====

//returns whether schedule is free at given time
function isFree(schedule, t) {
    d = new Date();
    let dailyCourses = schedule.courses[d.getDay()];
    if (!dailyCourses) return true;
    for (let course of dailyCourses) {
        if (lt(course["start"], t) && lt(t, course["end"])) return false;
    }
    return true;
}

function isEmpty(schedule) {
    return schedule.courses[1].length == 0 && schedule.courses[2].length == 0 && schedule.courses[3].length == 0 && schedule.courses[4].length == 0 && schedule.courses[5].length == 0;
}

function lt(t1, t2) {
    if (t1.h > t2.h) return false;
    else if (t1.h < t2.h) return true;
    else return (t1.m < t2.m);
}



// Gets current time
function currentTime() {
    d = new Date();
    return new Time(Number(d.getHours()), Number(d.getMinutes()));
}

// Deletes index of schedules if pressed down
function del(i) {
    var timeoutId = 0;

    $('#person' + i).on('mousedown', function () {
        timeoutId = setTimeout(function () {
            console.log(schedules);
            schedules.splice(i, 1);
            $.post("save.php", {
                scheds: JSON.stringify(schedules)
            }, function (data) {
                console.log(data);
            }, "json");
            console.log("deleted");
            console.log(schedules);
            getTime();
        }, 2000);
    }).on('mouseup mouseleave', function () {
        clearTimeout(timeoutId);
    });
}

// Gets time from range slider
function getTime() {
    let slideVal = Number($("#slide").val());
    let now = currentTime();
    let temp = new Time(0, 0);

    if (now.m + slideVal >= 60) {
        temp.h = now.h + 1;
        temp.m = (now.m + slideVal) - 60;
    } else if (now.m + slideVal < 0) {
        temp.h = now.h - 1;
        temp.m = (now.m + slideVal) + 60;
    } else {
        temp.h = now.h;
        temp.m = now.m + slideVal;
    }

    $("#time").text((temp.h % 12 == 0 ? 12 : temp.h % 12) + ":" + (temp.m / 10 < 1 ? "0" + temp.m : temp.m) + (temp.h < 12 ? " AM" : " PM"));

    updateTable(temp);

}
// Function to search the text and save as local data
function textToSchedule(name, text) {
    let sched = new Schedule(name);
    let times = text.match(/\n(Mo|Tu|We|Th|Fr)( |Mo|Tu|We|Th|Fr).*/gm);
    if (!times) return sched;
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

        console.log("t1: " + t1.h + ":" + t1.m);
        console.log("t: " + t);

        let t2 = new Time(
            Number(/\d+(?=:)/.exec(t)) + Number((/PM/.test(t) && Number(/\d+(?=:)/.exec(t)) != 12) ? 12 : 0),
            Number(/\d{2}(?=(?:AM|PM))/.exec(t)));

        console.log("t2: " + t2.h + ":" + t2.m);

        for (let day of days) { // add times to day
            sched.courses[day].push({
                "start": t1,
                "end": t2
            });
        }
        console.log(sched);
        console.log("");
    }
    return sched;
}
// Reloads table with given time
function updateTable(t = currentTime()) {
    //Get JSON info
    console.log("trying to parse");
    $.ajax({
        dataType: "json",
        url: "schedules.json",
        async: false,
        function (d) {
            schedules = d;
        }
    });
    let table = $("#people");
    table.html("");
    for (let i = 0; i < schedules.length; i++) {
        let s = schedules[i];
        table.append(`<div class="row" style="background-color:#f3f2ff;border-radius:3px;" id="row"` + i + `"><div class="col s2"><svg style="margin-top:5px;" width="16" height="16">
  <circle cx="8" cy="8" r="8" fill="` + (isFree(s, t) ? "green" : "red") + `" />
</svg></div><div class = "col s9">` + s.name + `</div><div class="col s1"><a class="btn flow-text" style="height:1.7em" id="person` + i + `"><i class="material-icons" style="font-size:1.3em; margin-top:-5px;">delete</i></a></div></div>`);
        del(i);
    }
}

// ===== EVENT LISTENERS =====
// Listener for button press
function clicked() {
    let s = textToSchedule($("#nameText").val(), $("#schedText").val());
    if (/\S/.test($("#nameText").val()) && /\S/.test($("#schedText").val()) && !isEmpty(s)) {
        schedules.push(s);
        $("#schedText ").val("");
        $("#nameText").val("");
        $.post("save.php", {
            scheds: JSON.stringify(schedules)
        }, function (data) {
            console.log(data);
        }, "json");
        console.log("posted");
    }
    updateTable();
}

// ===== MAIN =====
$(document).ready(function () {
    $('select').material_select();
    $('.modal').modal();
    $('.materialboxed').materialbox();
    $('#slide').on("change mousemove", getTime);

    setInterval(getTime, 5000); // Updates time/table every once in a while

})



/*

        console.log(t.match(/\d+(?=:)/));
        console.log(/AM(?= )/.test(t) ? 0 : 12);
        console.log(((t.match(/\d+(?=:)/)) - 1) + /AM(?= )/.test(t) ? 0 : 12);
        console.log(t.match(/\d{2}(?=(?:AM|PM))/));


var test1 = new Time(1, 11, 0);
    var test2 = new Time(1, 11, 50);
    console.log(test1.lt(test2));
    console.log(currentTime().m);

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
