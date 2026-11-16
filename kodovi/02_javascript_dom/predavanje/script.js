console.log("Hello World");

// alert("Ovo je prazna stranica");

let x1 = 5;
console.log(typeof(x1));

let str = String(5);
console.log(typeof(str));

// str. 11
let message = "Ocjene na kolegiju su: ";
for (let i = 1; i <= 5; ++i) {
    let ocjenaStr = String(i);
    message += ocjenaStr;

    if (i < 5)
        message += ", ";
    else message += ".";
}

console.log(message);

const x = 1;
const y = 2;
const a = { x, y };
const b = a;

const pi = Math.PI;
// pi = 3;

// str. 17

function howDoYouFeel() {
    const userPrompt = prompt("Kako se osjećaš danas?");
    return userPrompt;
}
// const response = howDoYouFeel();
// console.log(response);

function sum() {
    let s = 0;
    for (let i = 0; i < arguments.length; ++i)
        s += arguments[i];

    return s;
}

console.log(sum(1, 2, 3, 4));

// Array
const myArray = [1, 2, 3];
myArray.push(4);
console.log(myArray);
console.log(myArray[5]);
// delete(myArray[2])
myArray.splice(2, 1);
console.log(myArray);


const sumViaReduce = myArray.reduce(function(acc, curr) {
    return acc + curr;
});

console.log(sumViaReduce);

const modifyAge = (person, newAge) => {
    person["age"] = newAge;
}

let person =  { firstName: "Jurica", age: 33 };
modifyAge(person, 34);
console.log(person);


value = 254;
let objectWithFunctionWithObjectWithoutLambda = {
	value: 255,
	innerScope: () => {
		let object = {
			value: 256,
			printValue: () => { 
				console.log(this.value);
			}
		}
		return object;
	}
}

// objectWithFunctionWithObjectWithoutLambda.innerScope().printValue();


const findMaxAndPropagate = (arr, callb) => {
    let maxValue = -Infinity;
    for (let el of arr)
        if (el > maxValue)
            maxValue = el;
    callb(maxValue);
}

const fauxStoreToDb = (n) => {
    console.log("Pravimo se da smo ovo spremili u bazu podataka: ", n);
}

findMaxAndPropagate([-10, 255, -Infinity], console.log);
findMaxAndPropagate([-10, 255, -Infinity], fauxStoreToDb);

