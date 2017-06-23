// Oregon Trail Object-Oriented/Constructors/this assigment

/** 
 * Returns true `chance` percent of the time.
 *
 * Examples:
 *  prob(75); // returns true 75% of the time, false 25%
 *  prob(14); // returns true 14% of the time, false 86%
 */
function prob(chance) {
    return chance < (Math.random() * 100);
} // Luke says you're going ot have to use this, so be mindful. 

function Traveler(name) {
    this.name = name;
    this.hunger = 0;
    this.home = null;
    this.sick = false;
    this.alive = true;
    this.hunt = function () {
        // uses 5 ammo from the wagon. 
        this.home.ammo = this.home.ammo - 5; // ask about this, since Wagon generates wagon objects, will this syntax work?
        let success = prob(60); // will this syntax work?
        if (success === true) {
            this.home.food = this.home.food + 200;
            return 'Hunt was successful.';
        } else {
            return 'Hunt failed.';
        }
    } // this one works. 

    this.eat = function () {
        this.hunger = this.hunger - 25;
        if (this.sick === true) {
            this.home.food = this.home.food - 20;
            return name + ' is sick and had to eat 20 food to survive. ' + this.home.food + ' food remains.';
        } else {
            this.home.food = this.home.food - 10;
            return name + ' is healthy and only had to eat 10 food. ' + this.home.food + ' food remains.';
        }
    } // this one works. 

    this.sidekicks = function () {

        // As this stands right now it looks alright, but keep an eye on it.

        return this.home.passengers.length - 1;


    } // this seems right. Keep an eye on it.
    return this;

} // as it stands now looks like all the properties and functions are in order. 


function Wagon(capacity) {

    this.day = 1;
    this.capacity = capacity;
    this.food = 100;
    this.ammo = 50;
    this.passengers = [];


    this.join = function (traveler) {

        if (this.capacity > this.passengers.length) {
            this.passengers.push(traveler); // "add their name to the list of passengers"
        } else {
            if (this.capacity <= this.passengers.length) {
                return 'The wagon is full, no more room!';
            }
        }
        return this;
    }

    this.quarantine = function () {
        let sick = false;

        for (let i = 0; i < this.passengers.length; i++) {
            if (this.passengers[i].sick === true) {
                return true;
            }
        }
        return sick;
    }


    this.ready = function () {
        // returns the # of passengers who are 'alive' (a property of Traveler objects)
        // and "ready to travel". RETURN TYPE WILL BE A NUMBER BASED ON BOOLEAN CONDITION
        let readyToGo = 0;
        for (i = 0; i < this.passengers.length; i++) {
            if (this.passengers[i].alive === true) {
                readyToGo + 1;
            }
        }
        return readyToGo;

    } // This one seems OK right now, keep an eye on it. 

    this.next = function () {

        // The wagon's 'day' increases by 1
        this.day = this.day + 1;

        for (let i = 0; i < this.passengers.length; i++) {
            this.passengers[i].hunger = this.passengers[i].hunger + 10; // Every traveler in the wagon's hunger should increase by 10.
            this.passengers[i].eat(); // Every should try to eat once a day.
            this.passengers[0].hunt(); // One member (passengers[0] in this case) should try to hunt;

            if (this.food >= 20) {
                this.passengers[i].hunger = this.passengers[i].hunger - 25;
            } // Their hunger should only decrease if there's enough food for them;

            if (this.passengers[i].hunger >= 100) {
                this.passengers[i].alive === false;
            } // If any traveler's hunger reaches 100, that person dies (alive = false)

            if (this.quarantine() === true) {
                if (prob(15)) {
                    this.passengers[i].sick = true;
                } // If anyone is sick on the wagon, there's a 15% chance each other person will get sick. 
            } else if (this.quarantine() === false) {
                if (prob(5)) {
                    this.passengers[i].sick = true;
                } // If not, there's a 5% chance each other person will get sick.
            }

            if (this.passengers.sick === true) {
                if (prob(20)) {
                    this.passengers.sick === false;
                }
            } // If someone is sick, they have a 20% chance of becoming healthy.

        } // end of for loop

    } // end of this.next()
    return this;
} // end of wagon constructor function()

function play() {
  for (; Wagon1.ready() !== 0;) {
    Wagon1.next();
  }  
}

let Wagon1 = new Wagon(8);
let ezekiel = new Traveler('Ezekiel');
let sarah = new Traveler('Sarah');
let nathaniel = new Traveler('Nathaniel');
let nancy = new Traveler('Nancy');
let hezekiah = new Traveler('Hezekiah');

Wagon1.join(ezekiel);
Wagon1.join(sarah);
Wagon1.join(nathaniel);
Wagon1.join(nancy);
Wagon1.join(hezekiah);

play();
console.log(Wagon1.day)