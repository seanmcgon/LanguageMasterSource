const request = require('supertest');
const app = require('./index.js'); 
const { createTeacher, verifyTeacher } = require('./function.js');
jest.mock('mongoose')

describe('the function should add new teacher',() =>{
  it('Test create teacher', async() => {
    const firstName = "huy";
    const lastName = "Gu";
    const email = "hugy@gmail.sut";
    const password = "uhkjhku";
  
    await createTeacher(firstName, lastName, email, password);
    let re = await verifyTeacher(email, password);
    expect(re).toEqual(true);
  }, 100000); 
});
 describe('the function should verify teacher',() =>{
   it('Test existing teacher with wrong password', async() => {
     mongo = require('./function.js');
     const email = "James.Moore@gmail.com";
   const password = "wemKmh";
   let re = await mongo.verifyTeacher(email, password);
   expect(re).toEqual(false);
   });
   it('Test existing teacher with wrong email', async() => {
    mongo = require('./function.js');
    const email = "JamesMoore@gmail.com";
  const password = "wemKmhTh"
  let re = await mongo.verifyTeacher(email, password);
  expect(re).toEqual(false);
  });
  it('Test existing teacher with wrong email and password', async() => {
    mongo = require('./function.js');
    const email = "JamesMoore@gmail.com";
  const password = "wemKmh"
  let re = await mongo.verifyTeacher(email, password);
  expect(re).toEqual(false);
  });
  it('Test existing teacher', async() => {
    mongo = require('./function.js');
    const email = "James.Moore@gmail.com";
  const password = "wemKmhTh";
  let re = await mongo.verifyTeacher(email, password);
  expect(re).toEqual(true);
  });
 });


