function ex() {
    console.log(1);
}
console.log(typeof ex.__proto__);
console.log(typeof ex.prototype);

console.log(typeof Object.__proto__);
console.log(typeof Object.prototype);

console.log(typeof Function.__proto__);
console.log(typeof Function.prototype);
// 20160114

// var n1 = 2;
// var n2 = n1;
// console.log(n1 + ',' + n2);
// n1++;
// console.log(n1 + ',' + n2);

// var n3 = new Object();
// n3.n = 1;
// var n4 = n3;
// console.log(n3.n + ',' + n4.n);
// n4.n++;
// n3.n++;
// console.log(n3.n + ',' + n4.n);