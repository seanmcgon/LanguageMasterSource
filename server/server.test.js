const request = require('supertest');
const app = require('./index.js'); 

jest.mock('mongoose')

describe('the function should add new teacher',() =>{
  it('Test create teacher', async() => {
    mongo = require('./insertDummyData.js');
    const fisrName = "huy";
    const lastName = "Gu";
    const email = "hugy@gmaki.sut";
  const password = "uhkjhku";
  
  await mongo.createTeacher(fisrName, lastName, email, password);
  let re = await mongo.verifyTeacher(email, password);
  expect(re).toEqual(true);
  });
});
 describe('the function should verify teacher',() =>{
   it('Test existing teacher with wrong password', async() => {
     mongo = require('./insertDummyData.js');
     const email = "James.Moore@gmail.com";
   const password = "wemKmh";
   let re = await mongo.verifyTeacher(email, password);
   expect(re).toEqual(false);
   });
   it('Test existing teacher with wrong email', async() => {
    mongo = require('./insertDummyData.js');
    const email = "JamesMoore@gmail.com";
  const password = "wemKmhTh"
  let re = await mongo.verifyTeacher(email, password);
  expect(re).toEqual(false);
  });
  it('Test existing teacher with wrong email and password', async() => {
    mongo = require('./insertDummyData.js');
    const email = "JamesMoore@gmail.com";
  const password = "wemKmh"
  let re = await mongo.verifyTeacher(email, password);
  expect(re).toEqual(false);
  });
  it('Test existing teacher', async() => {
    mongo = require('./insertDummyData.js');
    const email = "James.Moore@gmail.com";
  const password = "wemKmhTh";
  let re = await mongo.verifyTeacher(email, password);
  expect(re).toEqual(true);
  });
 });
