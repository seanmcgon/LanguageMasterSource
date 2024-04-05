const { MongoClient } = require('mongodb');
const request = require('supertest');
const app = require('./index.js');
const { createTeacher, verifyTeacher, createClass,getClassesStudent, getClassesTeacher} = require('./databaseUsers.js');
jest.mock('mongoose');

describe('the function should add new teacher', () => {
    it('Test existing teacher by his email and different password', async () => {
        const firstName = "huy";
        const lastName = "Gu";
        const email = "huyGu@gmail.com";
        const password = "password";
    
        await createTeacher(firstName, lastName, email, password);
        let result = await verifyTeacher(email, 'notThePassword');
        expect(result).toEqual(false);
    }, 100000);
});

describe('the function should verify teacher', () => {
    let mongo;
    beforeAll(() => {
        mongo = require('./databaseUsers.js');
    });

    it('Test existing teacher ', async () => {
        const email = "jyhuang@umass.edu";
        const password = "Test";
        let result = await mongo.verifyTeacher(email, password);
        expect(result).toEqual(true);
    });

    it('Test existing teacher with wrong email', async () => {
        const email = "JamesMoore@gmail.com";
        const password = "wemKmhTh";
        let result = await mongo.verifyTeacher(email, password);
        expect(result).toEqual(false);
    });

    it('Test existing teacher with wrong email and password', async () => {
        const email = "JamesMoore@gmail.com";
        const password = "wemKmh";
        let result = await mongo.verifyTeacher(email, password);
        expect(result).toEqual(false);
    });
});

describe('this suite will test the function createClass', () => {
    const connectionString = "mongodb+srv://mkandeshwara:0CgF5I8hwXaf88dy@cluster0.tefxjrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true";
    let client, db, col;

    beforeAll(async () => {
        client = new MongoClient(connectionString);
        await client.connect();
        db = client.db("UserData");
        col = await db.collection("teachers");
    });

    afterAll(async () => {
        await client.close();
    });

    it('Add a class to a given teacher, and vice versa. In this case, the class already existed', async () => {
        const email = "jyhuang@umass.edu";
        const className = "Vietnamese219_VJTCBB";
        await createClass(className, email);
        const db1 = client.db(className);
        const col1 = await db1.collection("teachers");
        const testTeacher = (await col.find({ email: email }).toArray())[0].courseList.indexOf(className);
        const testClassDataBase = await col1.find({ email: email }).toArray();
        expect(testTeacher).toBeGreaterThan(-1);
        expect(testClassDataBase.length).toBeGreaterThan(0);
    });

    it('Add a class to a given teacher, and vice versa. In this case, the class does not exist', async () => {
        const email = "jyhuang@umass.edu";
        const className = "LeageOfLegend_101";
        await createClass(className, email);
        const testTeacher = (await col.find({ email: email }).toArray())[0].courseList.indexOf(className);
        expect(testTeacher).toBeGreaterThan(-1);
    });
});

describe('getClassesTeacher', () => {
  it('should return an array of classes for a teacher', async () => {
    const classes = await getClassesTeacher('johndoe@gmail.com');
    expect(Array.isArray(classes)).toBe(true);
  });

  it('should return an empty array if teacher does not exist', async () => {
    const classes = await getClassesTeacher('nonexistentteacher');
    expect(classes).toEqual([]);
  });
});

describe('getClassesStudent', () => {
  it('should return an array of classes for a student', async () => {
    const classes = await getClassesStudent('Stephen.Calderon@gmail.com');
    expect(Array.isArray(classes)).toBe(true);
  });

  it('should return an empty array if student does not exist', async () => {
    const classes = await getClassesStudent('nonexistentstudent');
    expect(classes).toEqual([]);
  });
});
