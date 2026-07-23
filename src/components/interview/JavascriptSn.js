'use client'

// Custom recursive array flattener
function flattenArray(arr) {
    return arr.reduce(
        (acc, val) =>
            Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val),
        [],
    );
}
const nestedArray = [1, [2, [3, [4, [5]]]]];
const flatArray = flattenArray(nestedArray);

console.log(flatArray); // Output: [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

const mergedObj = Object.assign({}, obj1, obj2);

function Person(name) {
    this.name = name;
}
const person = new Person('Alice');
console.log(person.name); // 'Alice'

function greet() {
    console.log(this.name);
}
const person1 = { name: 'Alice' };
greet.call(person1); // 'Alice'


const obj = {
    name: 'Test',
    greet() {
        console.log(this.name);
    }
}

//Defaults to global object or undefined in strict modes    

const user = {
    name: 'Alice',
    hobbies: ['coding', 'review'],
    printHobbies() {
        this.hobbies.forEach(function (hobby) {
            console.log(`${this.name} loves ${hobby}`)
        }.bind(this));
    }
}

localStorage.setItem('username', 'Jhone die');
console.log(localStorage.getItem('username'));
localStorage.removeItem('username');
localStorage.clear();

function Sum(a, b) {
    return a + b;
}
console.log(Sum.call(null, 1, 2));
console.log(Sum.apply(null, [1, 2])); // 3


const john = {
    age: 42,
    getAge: function () {
        return this.age;
    }
}

console.log(john.getAge());










function multiplier(factor) {
    return function (num) {
        return num * factor;
    }
}

function fetchData(callback) {
    setTimeout(() => {
        const data = { name: 'John', age: 30 };
        callback(data);
    }, 1000);
}
fetchData((data) => {
    console.log(data); // { name: 'John', age: 30 }
});


function createCounter() {
    let count = 0; // Local variable in the outer function's scope
    return function () {
        count += 1; // The inner function accesses and modifies 'count'
        return count;
    };
}
console.log(createCounter()); // Output: 1
console.log(createCounter()); // Output: 2
console.log(createCounter()); // Output: 3

const checkEvenNumber = new Promise((resolve, reject) => {
    const number = 4;

    if (number % 2 === 0) {
        resolve("Success! The number is even."); // Moves state to fulfilled
    } else {
        reject("Error: The number is odd.");    // Moves state to rejected
    }
});


function* dialog() {
    const name = yield 'What is your name?';
    yield `Hello, ${name}!`;
}

const d = dialog();
d.next(); // { value: 'What is your name?', done: false }
d.next('Ada'); // { value:

const arr = [1, 2, 3];
const sorted = arr.toSorted(); // [1, 2, 3] — arr unchanged
const revered = arr.toReversed();


function findSecondLargestNumber() {
    if (arr.length < 2) return null
}

const employees = [
    { name: 'John', dept: 'Engineering' },
    { name: 'Jane', dept: 'Design' },
    { name: 'Mark', dept: 'Engineering' }
];

const grouped = Object.groupBy(employees, (employee) => employee.dept);
console.log(grouped);


function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % 2 == 0) {
            return false
        }
        return true;
    }
}

console.log(isPrime(101)); // true (Prime band)
console.log(isPrime(100)); // false

function getPrimesInRange(min, max) {
    const primes = [];
    for (let i = min; i <= max; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

console.log(getPrimesInRange(100, 150));

function generateFibonacci(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const series = [0, 1];
    for (let i = 2; i < n; i++) {
        series.push(series[i - 1] + series[i - 2]);
    }
    return series;
}

console.log(generateFibonacci(8));
// Output: [0, 1, 1, 2, 3, 5, 8, 13]
const data = { item1: "apple", item2: "banana", item3: "apple", item4: "orange", item5: "banana" };

const counts = Object.values(data).reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
}, {});


function largest(arr) {
    return Math.max(...arr);
}

function isPalindrome(str) {
    return str === str.split("").reverse().join("");
}

function charCount(str) {
    const map = {};
    for (const ch of str) {
        map[ch] = (map[ch] || 0) + 1;
    }
    return map;
}
console.log(charCount("3"));


const title = document.getElementById("title");
const button = document.getElementById("button");
const allButtons = document.querySelectorAll("button");
//returns the first matching element bases on a css selector
//represents collection of key value pairs and complex data structures includes plain object arrays, sets, maps, and more. It is iterable and can be looped over using for...of or forEach. It is not an array but can be converted to one using Array.from() or the spread operator [...].s
const arr1 = [1, 2, 3];
const arr2 = new Array(1, 2, 3);
Array.of(1, 2, 3);
const arr3 = Array.from('hello');

setTimeout(() => {
    console.log('This will run after 2 seconds');
}, 2000);

setInterval(() => {
    console.log('This will run every 3 seconds');
}, 3000);




function operateOnNumbers(numbers, operation) {
    const result = [];
    for (const num of numbers) {
        result.push(operation(num));
    }
    return result;
}

const double = (num) => num * 2;
const squared = (num) => num * num;

const numbers = [1, 2, 3];
const doubledNumbers = operateOnNumbers(numbers, double); // [2, 4, 6]
const squaredNumbers = operateOnNumbers(numbers, squared); // [1, 4, 9]

function largestNumber(arr) {
    return Math.max(...arr);
}

function isPalindrome1(str) {
    return str === str.split("").reverse().join("");
}

console.log(isPalindrome1("madam")); // true


function charCount1(str) {
    const map = {};
    for (const ch of str) {
        map[ch] = (map[ch] || 0) + 1;
    }
    return map;
}

console.log(charCount1("hello"));


function reverseNumber(num) {
    return Number(String(num).split("").reverse().join(""));
}

console.log(reverseNumber(12345)); // 54321

function randomNum(min, max) {
    return Math.floor(Math.random() * 100) + 1;
}

function removeDuplicates(arr) {
    return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4]));


function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
        return arr;
    }
}



function counter11() {
    let count = 0;
    return function () {
        count++;
        return count;
    };
}

const increment = counter11();
console.log(increment()); //1
console.log(increment()); // 2
console.log(increment()); // 3

function createPerson(name, age) {
    return { name, age };
}

const p3 = createPerson("John", 25);

(function () {
    //code to executed immediately
    let message = "Hello, World!";
    console.log(message);
})();


const fragment = document.createDocumentFragment();
for (let i = 0; i < 10000; i++) {
    const div = document.createElement("div");
    div.textContent = i;
    fragment.appendChild(div);
}
document.body.appendChild(fragment);


function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}


// fetch("https://example.com", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ name: 'Alex' })
// }).
//     then(response => response.json()).
//     then(data => console.log(data)).
//     catch(error => console.error('Error:', error));
// axios.post('https://example.com', { name: 'Alex' })
//     .then(response => console.log(response.data))
//     .catch(error => console.error('Error:', error));

// const apiClient = axios.create({
//     baseURL: 'https://example.com',
//     timeout: 1000,
//     headers: { 'X-Custom-Header': 'foobar' }
// });

// apiClient.interceptors.request.use(config => {
//     config.headers.Authorization = 'Bearer token';
//     return config;
// })

var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
}

var twoSum = function (nums, target) {
    for (let i = 0; i < nums.Length; i++) {
        for (let j = i + 1; j < nums.Length; j++) {
            if (numbs[i] + numb[j] === target) {
                return [i, j]
            }
        }
    }
}
const JavaScriptSnip = () => {

    function findMaxDifference(arr) {
        // Check if the array has at least two elements. 
        if (arr.length < 2) {
            return 0;
        }
        // Initialize both min and max values with the first element of the array. 
        let minVal = arr[0];
        let maxVal = arr[0];
        // Iterate through the array starting from the second element in a single pass. 
        for (let i = 1; i < arr.length; i++) {
            // Check if the current element is smaller than the current minimum value. 
            if (arr[i] < minVal) {
                minVal = arr[i];
            } else if (arr[i] > maxVal) {
                maxVal = arr[i];
            }
        }
        // The result is the difference between the maximum and minimum values found. 
        return maxVal - minVal;
    }

    function reverseString(str) {
        return str.split('').reverse().join('');
    }

    function isPalindrome2(str) {
        return str === str.split('').reverse().join('');
    }

    function isPrime2(num) {
        if (num <= 1) {
            return false;
        }
        if (num == 2) {
            return true;
        }
        if (num % 2 == 0) {
            return false;
        }
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }

    typeof obj === 'object' && obj !== null;

    function factorial(n) {
        if (n === 0) { return 1; }
        return n * factorial(n - 1)
    }

    function fibonacciSequence(n) {
        // Handle edge cases for n < 2.
        if (n <= 0) {
            return [];
        } else if (n === 1) {
            return [0];
        }

        // Initialize the sequence with the first two numbers.
        const sequence = [0, 1];
        // Use a loop to generate the remaining numbers.
        for (let i = 2; i < n; i++) {
            // Each new number is the sum of the previous two numbers in the sequence.
            const nextNumber = sequence[i - 1] + sequence[i - 2];
            sequence.push(nextNumber);
        }
        // Return the resulting Fibonacci sequence.
        return sequence;
    }

    console.log(`leela` + fibonacciSequence(10));
    function convertArrayToObject(arr) {
        return arr.reduce((accumulator, currentItem) => {
            const key = currentItem.id;
            const value = currentItem.value;
            accumulator[key] = value;
            return accumulator;
        }, {}); // The `{}` is the initial value of the accumulator.
    }
    const data4 = [
        { id: 'a', value: 1 },
        { id: 'b', value: 2 },
        { id: 'c', value: 3 },
    ];
    const singleObject = convertArrayToObject(data4);
    console.log('lelea' + singleObject);

    function areAnagrams(str1, str2) {
        return str1.split('').sort().join('') === str2.split('').sort().join('');
    }

    const numbers = [1, 2, 2, 3, 4, 4, 5];
    const uniqueNumbers = numbers.filter((item, index) => {
        return numbers.indexOf(item) === index;
    })
    const books = [
        { id: 1, title: "JavaScript Basics" },
        { id: 2, title: "Advanced CSS" },
        { id: 1, title: "JavaScript Basics (Duplicate)" }, // Duplicate ID
        { id: 3, title: "React Guide" }
    ];

    const seen = new Set();
    const uniqueBookFirst = books.filter(item => {
        if (seen.has(item.id)) {
            return false;
        }
        seen.add(item.id);
        return true;
    });
    // Math.max(...books);
    function getValueByKey(obj, key) {
        // Check if the object and key are valid and the object has the key as its own property.
        // We use `Object.prototype.hasOwnProperty.call()` for a safer check
        // against objects that might not have a `hasOwnProperty` method.
        // Object.prototype.hasOwnProperty.call(obj, key);
        if (typeof obj === 'object' && obj !== null && Object.prototype.hasOwnProperty.call(obj, key)) {
            return obj[key];
        } else {
            // If the key doesn't exist or the inputs are invalid, return undefined.
            return undefined;
        }
    }


    return (
        <>
            <h1>Javascript Snippet</h1>
        </>
    )
}
export default JavaScriptSnip;


const getObjectEntries = (obj) => {
    const objKeys = Object.keys(obj);
    console.log(objKeys);

    const result = objKeys.map((key) => {
        const value = objKeys[key];
        return [key, value];
    })
    return result;
}

const res = getObjectEntries();
console.log(res);

function getSecondLargest(arr) {
    let largest = -Infinity;
    let secondLargest = -Infinity;

    for (const num of arr) {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        }
        else if (num > secondLargest && num !== largest) {
            secondLargest = num;
        }
    }
    return secondLargest === -Infinity ? null : secondLargest;
}

function getSecondLargestShort(arr) {
    // 1. Remove duplicates using a Set
    // 2. Sort the unique values in descending order
    const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);

    // Return the second element if it exists, otherwise null
    return uniqueSorted.length >= 2 ? uniqueSorted[1] : null;
}

function debounce(mainFunction, delay) {
    let timer;

    // Return a wrapper function that collects all arguments
    return function (...args) {
        // Clear the previous timeout if the function is called again within the delay period
        clearTimeout(timer);

        // Set a new timeout
        timer = setTimeout(() => {
            mainFunction.apply(this, args);
        }, delay);
    };
}

// Don't change `getRandomEmoji` function
export function getRandomEmoji() {
    const emojisIcon = ["🍋", "🍒", "🍊", "💎", "🍉"]
    const randomIndex = Math.floor(Math.random() * emojisIcon.length);
    return emojisIcon[randomIndex]
}


const findMissing = num => {
    const max = Math.max(...num); // Will find highest number
    const min = Math.min(...num); // Will find lowest number
    const missing = []

    for (let i = min; i <= max; i++) {
        if (!num.includes(i)) { // Checking whether i(current value) present in num(argument)
            missing.push(i); // Adding numbers which are not in num(argument) array
        }
    }
    return missing;
}



findMissing([1, 15]); function findMissing(num) {
    let min = num[0];
    let max = num[0];
    let missing = [];
    let index = 0;

    for (let i = 1; i < num.length; i++) {
        if (num[i] < min) {
            min = num[i];
        }
        if (num[i] > max) {
            max = num[i];
        }
    }

    for (let i = min; i <= max; i++) {
        let found = false;

        for (let j = 0; j < num.length; j++) {
            if (num[j] === i) {
                found = true;
                break;
            }
        }

        if (!found) {
            missing[index] = i;
            index++;
        }
    }

    return missing;
}



console.log(findMissing([1, 15]));


// function identity<T>(value: T): T {
//     return value;
// }

// let output = identity < string > ("DataCamp");
// let outputNumber = identity < number > (42);

