"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start( ) {
    console.log("ready");
    // TODO: Add event-listeners to filter and sort buttons
    loadJSON();
    document.querySelectorAll(".filter").forEach((each) =>{each.addEventListener("click", misteriousFunction)});
}

function misteriousFunction(event){
    let filter = filterClick(event);
        displayList(filter);
}


function filterClick(event){
    if (event.target.dataset.filter === "cat") {
        // console.log(allAnimals.filter(isCat));
        return allAnimals.filter(isCat);
    }  else if (event.target.dataset.filter === "dog") {
        // console.log(allAnimals.filter(isDog));s
        return allAnimals.filter(isDog);
    } else if (event.target.dataset.filter === "*") {
        return allAnimals;
    };
}

function isCat(animal){
    if (animal.type === "cat") {
        return true;
    } else {
        return false;
    }
}

function isDog(animal){
    if (animal.type === "dog") {
        return true;
    } else {
        return false;
    }
}

//  ------------------- PREPARE OBJECTS FROM DATABASE ---------------------
async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    // when loaded, prepare data objects
    prepareObjects(jsonData);
}

function prepareObjects( inputData ) {
    // console.log(allAnimals);
    allAnimals = inputData.map(preapareObject);
    // console.log(allAnimals);
    // TODO: This might not be the function we want to call first

    displayList(allAnimals);
}

function preapareObject(jsonObject) {
    const animal = Object.create(Animal);
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;
    return animal;
}


// -------------------- DISPLAY --------------------
function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";
    // build a new list
    animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild( clone );
}




