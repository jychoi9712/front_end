"use strict";
// function hello1(person:{name:string, age:number} ): void{
function hello1(person) {
    console.log(`안녕하세요! ${person.name}입니다.`);
}
// const p1: {name:string, age:number} = {
const p1 = {
    name: "dyonyon",
    age: 26
};
hello1(p1);
