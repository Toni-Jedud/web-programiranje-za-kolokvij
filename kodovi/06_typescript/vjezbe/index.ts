const x: number = 5;
const message: string = "Hello World";
const o: object = { name: "Jurica", age: 33 };

// ovo je problem bez interface-a
// console.log(o.name)

type Numbers = number[];
export type Rating = 1 | 2 | 3 | 4 | 5;

// const numbers: number[] = [1, 2, 3];
const numbers: Numbers = [1, 2, 3];

const truth_values: (number | boolean)[] = [true, 0, 1, 1, false, false];


// tipizacija funkcija

/*
const add = function(m: number, n: number) {
    return m + n;
}
*/

// isti sintaksa i za lambda funkciju
const add: (m: number, n: number) => number = function(m, n) {
    return m + n;
}

/*
function add(m: number, n: number): number {
    return m + n;
}
*/

/*
const printArr = (arr: any[]) => {
    for (const el of arr) {
        console.log(el);
    }
}
*/

// printArr(message);

// printArr kao generička funkcija
const printArr = <T>(arr: T[]) => {
    for (const el of arr) {
        console.log(el);
    }
}

function printArrOrd<T>(arr: T[], upTo: number): void {
    let c = 0;
    for (const el of arr) {
        
        console.log(el);

        if (++c === upTo)
            break;
    }    
}

const printArrAnotherExample: <T>(arr: T[], separator: string) => void = <T>(arr: T[], separator: string) => {
    let strToPrint: string = "";
    for (const el of arr)
        strToPrint += `${el}${separator}`;
    console.log(strToPrint);
}

printArrOrd(numbers, 2);
printArrAnotherExample(numbers, "\t");

const format: (arg: string | number) => string = (arg) => {
    if (typeof(arg) === "string")
        return arg.toUpperCase();
    else return arg.toFixed(2);
}

console.log(format(Math.PI));
console.log(format("Math.PI"));