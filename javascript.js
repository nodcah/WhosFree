// javascript.js
// Desc: all of the javascript to run the "Who's Free?" web app
// Authoer: Noah Del Coro


// ===== VARIABLES =====
// Array of


// ===== CUSTOM CLASSES =====
// Make custom time class with function to return current time

// hour=hour (int), min=minute (int), am=T for AM & F for PM (boolean)
function Time(hour, min, am) {
    this.hour = hour;
    this.min = min;
    this.am = am;

    function gt(t) {
        if (this.am && t.pm) return true;
        else if (this.pm && t.am) return false;
        else if (this.hour > t.hour) return true;
        else if (this.hour < t.hour) return false;
        else return (this.min > t.min);
    }

}

// ===== HELPER FUNCTIONS =====
// Function to search the webpage and save as local data

// Reloads table with given time (default time: current time)


// ===== EVENT LISTENERS =====
// Listener for button press


// ===== MAIN =====
