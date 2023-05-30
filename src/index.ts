import { rejects } from 'assert';
import fetch, { Response } from 'node-fetch';
import { resolve } from 'path';

const urlName: string = 'https://api.ipify.org/?format=json';

// 1. Используйте node-fetch чтобы сделать запрос await fetch(""), 
//получить ответ и вывести на экран свой айпи

// 1
// fetch(urlName)
// 	  .then((res) => res.json())
// 	  .then((res) => console.log(res))
// 	  .catch((err: any) => console.error('error:' + err));

// 2     
// async function getIP() {
//     try {
//         const response = await fetch(urlName);
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
//getIP();


// 2. Напишите функцию по мотивам п.1., которая собственно возвращает ваш айпи.
// first way
// async function getIP() {
//     try {
//         const response = await fetch(urlName);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
// const IP = async () => {
//     const ip = await getIP()
//     console.log(ip);
// }
// IP();

// second way
// const ip = fetch(urlName)
//     .then((res) => res.json())
//     .then((res) => { return res })
//     .catch((err: any) => console.error('error:' + err));

// const _ip = async () => {
//     const a = await ip;
//     console.log(a);
// }
// _ip();

// third way 
// const promise = new Promise(async (resolve, reject) => {
//     const response = fetch(urlName);
//     const data = (await response).json();
//     resolve(data);
// }).then(response => { return response }).catch(err => console.log('MyError ' + err));


// (async () => {
//     const a = await promise;
//     console.log(a);
// })();

// 3. Напишите функцию которая возвращает три имени, сделав параллельно три запроса на https://random-data-api.com/api/name/random_name

// - воспользуйтесь async/await + Promise.all

const url: string = 'https://random-data-api.com/api/name/random_name'
type aboutName = {
    id: number,
    uid: string,
    name: string,
    two_word_name: string,
    four_word_name: string,
    name_with_initials: string,
    name_with_middle: string,
    first_name: string,
    middle_name: string,
    last_name: string,
    male_first_name: string,
    female_first_name: string,
    prefix: string,
    initials: string
};
// async function getName() {
//     const response = await fetch(url);
//     const data = await response.json() as Promise<aboutName>;
//     return data;
// }

// //First way 
// Promise.all([getName(), getName(), getName()])
//     .then(users => users.forEach(u => console.log(u.name)))

// // Second way 
// Promise.all([
//     fetch(url),
//     fetch(url),
//     fetch(url)
// ]).then(responses => Promise.all(responses.map(r => r.json() as Promise<aboutName>)))
//     .then(data => data.forEach(d => console.log(d.name)))
//     .catch(err => console.log(err));


// - воспользуйтесь async/await но без Promise.all

// async function getName2(url: string) {
//     let r = await fetch(url);
//     let d = await r.json() as Promise<aboutName>;
//     return d;
// }
// for (let i = 0; i < 3; i++) {
//     (async () => {
//         await getName2(url).then(el => console.log(el.name));
//         })();
// }

// - воспользуйтесь чисто промисами, без async/await,
//   без Promise.all .... это может быть сложно   ---------------------

const nm = () => {
    return new Promise((resolve, reject)=> {
        const res = fetch(url);
        // const data = res.json() 

        resolve(fetch(url));
    })
}
// function getName3() {
//     return new Promise((resolve, reject)=> {
//         const res = fetch(url);
//         // const data = res.json() 

//         resolve(fetch(url));
//     })
// }
nm.then(data => data.json() as Promise<aboutName>);

// //First way : 
// let data = [fetch(url), fetch(url), fetch(url)];
// for (let i = 0; i < 3; i++) {
//     data[i].then(d => {
//         let n = d.json() as Promise<aboutName>; 
//         return n; 
//     })
//     .then(el => console.log(el.first_name));
// }

// // // Second way
let arrPromises = [
    Promise.resolve(fetch(url)),
    Promise.resolve(fetch(url)),
    Promise.resolve(fetch(url)),
];
for (let i = 0; i < 3; i++) {
    arrPromises[i]
    .then(data => data.json() as Promise<aboutName>)
        .then(el => console.log(el.name));
}


//4. Напишите функцию , которая должна за минимальное количество запросов получить юзера женщину: 
const url1 = 'https://random-data-api.com/api/users/random_user';

//без async/await
// type User = {
//     id: number,
//     uid: string,
//     password: string,
//     first_name: string,
//     last_name: string,
//     username: string,
//     email: string,
//     avatar: string,
//     gender: string,
//     phone_number: string,
//     social_insurance_number: string,
//     date_of_birth: string,
//     employment: { title: string, key_skill: string },
//     address: {
//         city: string,
//         street_name: string,
//         street_address: string,
//         zip_code: string,
//         state: string,
//         country: string,
//         coordinates: { lat: number, lng: number }
//     },
//     credit_card: { cc_number: string },
//     subscription: {
//         plan: string,
//         status: string,
//         payment_method: string,
//         term: string
//     }
// }

// function getUserWoman() {
//     return fetch(url1)
//         .then((res) => res.json() as Promise<User>)
//         .then(data => {
//             if (data.gender == 'Female') {
//                 let userWoman = data;
//                 return userWoman;
//             }
//         })
// }
// const b = () => {
//     getUserWoman().then(user => {
//         if (user == undefined) {
//             return;
//         } else {
//             //console.log(user.first_name + ' ' + user.last_name + ' - ' + user.gender);
//             //return user;
//         }
//     });
// };
// for (let i = 0; i < 10; i++) {
//     b();
// }

// с async/await

// const nameWoman = async () => {
//     const n = await getUserWoman();
//     console.log(n);
// }


// 5. Есть функция №1, которая принимает коллбек, который будет вызван 
//с параметром == ваш текущий айпи. Создайте функцию №2,
// которую можно евейтить, которая будет пользоваться функцией №1
import express from 'express';
const app = express();
const PORT = 3000;
import ip from 'ip';

// function myFunction1(myCallBack: (myIP: string) => string): string {
//     app.get('/', (req, res) => {
//         res.send(ip.address());
//         //res.status(200).json({
//         //     localhost: req.ip,
//         //     userIP: ip.address(),
//         // });
//         //res.end(ip.address());
//     });
//     let myIP = ip.address();
//     return myCallBack(myIP);
// }

// function myCallBack(myIp: string): string {
//     return `http://${myIp}:${PORT}/`;
// }

// async function myFunction2() {
//     let myPath = myFunction1(myCallBack);
//     console.log('User path: ' + myPath);
//     const a = await fetch(myPath);
//     const data = await a.text();
//     return data;
// }

// (async () => {
//     await myFunction2()
//         .then(data => console.log('User IP: ' + data))
// })();

// app.listen(PORT);


// 6. Есть функция №1, которую можно евейтить,
//которая вернет строку == ваш текущий айпи. Создайте функцию №2,
// которая должна использовать функцию №1 для получения вашего текущего айпи,
//и которая принимает на вход один параметр - функцию-коллбек,
// которая будет вызвана, когда айпи будет получен, с первым параметром равным этому айпи.

// function myFunc1() {
//     return new Promise((resolve, reject) => {
//         resolve(ip.address());
//     })
// }
// function callbackFunc(myIp: string) {
//     console.log('User IP is ' + myIp);
// }

// function myFunc2(cb: (myIp: string) => void) {
//     let a = myFunc1()
//         .then(data => { return data as string; })
//         .then(ip => { cb(ip) })
// }
// myFunc2(callbackFunc);
