const { MongoClient } = require('mongodb');
const request = require('supertest');
const app = require('./index.js'); 
const { createTeacher, verifyTeacher, createClass } = require('./databaseUsers.js');
jest.mock('mongoose')

describe('the function should add new teacher',() =>{
  it('Test create teacher', async() => {
    const firstName = "huy";
    const lastName = "Gu";
    const email = "hugfdsfy@gmail.sut";
    const password = "uhkfdsfj";
  
    await createTeacher(firstName, lastName, email, password);
    let re = await verifyTeacher(email, password);
    expect(re).toEqual(true);
  }, 100000); 
  it('Test existing teacher by his email and different password', async() => {
    const firstName = "huy";
    const lastName = "Gu";
    const email = "hugfdsfy@gmail.sut";
    const password = "uhkfkdlafda";
  
    await createTeacher(firstName, lastName, email, password);
    let re = await verifyTeacher(email, password);
    expect(re).toEqual(false);
  }, 100000); 
});
 describe('the function should verify teacher',() =>{
   it('Test existing teacher ', async() => {
     mongo = require('./databaseUsers.js');
     const email = "jyhuang@umass.edu";
   const password = "Test";
   let re = await mongo.verifyTeacher(email, password);
   expect(re).toEqual(true);
   });
   it('Test existing teacher with wrong email', async() => {
    mongo = require('./databaseUsers.js');
    const email = "JamesMoore@gmail.com";
  const password = "wemKmhTh"
  let re = await mongo.verifyTeacher(email, password);
  expect(re).toEqual(false);
  });
  it('Test existing teacher with wrong email and password', async() => {
    mongo = require('./databaseUsers.js');
    const email = "JamesMoore@gmail.com";
  const password = "wemKmh"
  let re = await mongo.verifyTeacher(email, password);
  expect(re).toEqual(false);
  });
 });

 describe('this suit will test the function createClass',() =>{
  it('Add a class to a given teacher, and vice versa. In this case, the class already existed', async() => {
    const connectionString = "mongodb+srv://mkandeshwara:0CgF5I8hwXaf88dy@cluster0.tefxjrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true";
    const client = new MongoClient(connectionString);
    const email = "jyhuang@umass.edu";
    const className ="Vietnamese219_VJTCBB"; 
  await createClass(className, email);
  await client.connect();
    db = client.db("UserData");
    db1 = client.db(className);
    col = await db.collection("teachers");
    col1 = await db1.collection("teachers");
  const testTeacher = (await col.find({email: email}).toArray())[0].courseList.indexOf(className);
  const testClassDataBase = await col1.find({email:email}).toArray();
  expect(testTeacher).toBeGreaterThan(-1);
  expect(testClassDataBase.length).toBeGreaterThan(0);
  });

  // test case 2
  
  it('Add a class to a given teacher, and vice versa. In this case, the class does not exist', async() => {
    
    const connectionString = "mongodb+srv://mkandeshwara:0CgF5I8hwXaf88dy@cluster0.tefxjrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true";
    const client = new MongoClient(connectionString);
    await client.connect();
    const email = "jyhuang@umass.edu";
    const className ="LeageOfLegend_101";
  await createClass(className, email);
   db = client.db("UserData");
    col = await db.collection("teachers");
    const testTeacher = (await col.find({email: email}).toArray())[0].courseList.indexOf(className);
  
  //const testClassDataBase = await col1.find({email:email}).toArray();
  //await client.close();
  expect(testTeacher).toBeGreaterThan(-1);
  });
});

