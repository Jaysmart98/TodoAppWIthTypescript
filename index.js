"use strict";
let food = 'popcorn';
console.log(food);
let named = 'John Doe';
console.log(named);
let display = document.getElementById('show');
display.innerHTML = named;
// ? - optional chaining operator ==== This operator checks if the result of document.getElementById('show') is null or undefined.
let arr = [1, 2, 3, 4, 5];
arr.push(6);
console.log(arr);
const person = [
    {
        name: 'John Doe',
        age: 30,
        course: 'Computer Science'
    },
    {
        name: 'Jane Smith',
        age: 25,
        course: 'Physics'
    },
    {
        name: 'Alice Johnson',
        age: 28,
        course: 'Mathematics'
    }
];
let obj = {
    name: 'Joshua',
    age: 26,
    course: 'Computer Science'
};
// person.push(obj); // using type assertion to add an object to the array
person[3] = obj; // using type assertion to add an object to the array
console.log(person);
