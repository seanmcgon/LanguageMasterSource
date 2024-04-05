const { MongoClient } = require('mongodb');
const request = require('supertest');
const app = require('./index.js');
const { createTeacher, verifyTeacher, createClass,getClassesStudent, getClassesTeacher, getStudentsInClass, getTeachersInClass} = require('./databaseUsers.js');
jest.mock('mongoose');
const mongo = require('./databaseUsers.js')

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


describe('createStudent', () => {
  it('Inserts student if student is not in db', async () => {
    // Check that if the insertion was successful, which it should be here, then the return value is correct
    expect(await mongo.createStudent("Maya", "Kandeshwarath", "mkandeshwarath@umass.edu", "1324")).toEqual(true);
    try{
      // connect to the db, get the inserted document and check that all the fields are correct
      await mongo.client.connect();
      const ret = await mongo.client.db("UserData").collection("students").find({email: "mkandeshwarath@umass.edu"}).toArray();
      expect(ret.length).toEqual(1);
      expect(ret[0].name).toEqual("Maya Kandeshwarath");
      expect(ret[0].email).toEqual("mkandeshwarath@umass.edu");
      expect(ret[0].password).toEqual("1324");
      expect(ret[0].courseList).toEqual([]);
      // Remove the document from the db
      await mongo.client.db("UserData").collection("students").deleteOne({email: "mkandeshwarath@umass.edu"});
    }
    finally{
       await mongo.client.close();
    }

  });

  it("Doesn't insert if the email is already in the db", async () => {
    console.log = jest.fn();
    expect(await mongo.createStudent("Dua", "Aegah", "Antonio.Greene@yahoo.com", "weaghwha")).toEqual(false);
    expect(console.log).toHaveBeenCalledWith("Student already exists!");
  });

  it("Doesn't insert if the email format is incorrect", async () => {
    console.log = jest.fn();
    expect(await mongo.createStudent("Dua", "Aegah", "relwargg", "weaghwha")).toEqual(false);
    expect(console.log).toHaveBeenCalledWith("Email is invalid");
  });

  it("Doesn't insert if the password format is incorrect", async () => {
    console.log = jest.fn();
    expect(await mongo.createStudent("Dua", "Aegah", "lawdla@dalkf.com", "aaaaaaaaaaaaaaaaaaaa")).toEqual(false);
    expect(console.log).toHaveBeenCalledWith("Password is invalid");
  });

  it("Doesn't insert if the email and password format are incorrect", async () => {
    console.log = jest.fn();
    expect(await mongo.createStudent("Dua", "Aegah", "lawdladalkf", "aaaaaaaaaaaaaaaaaaaa")).toEqual(false);
    expect(console.log).toHaveBeenCalledWith("Both email and password are invalid");
  });
});

describe("getStudentsInClass", () => {
  it("Gets students from existing class", async () => {
    const students = await mongo.getStudentsInClass("Chinese671_JPYVGX");
    expect(students.length).toEqual(2);
    expect(students.map(e => e.email)).toEqual(["Michael.Hinton@gmail.com", "Mark.Wilson@yahoo.com"]);
  });

  it("Throws an error with a non-existent class", async () => {
    console.log = jest.fn();
    await mongo.getStudentsInClass("ABCD");
    expect(console.log).toHaveBeenCalledWith("Class does not exist");
  });

  it("Returns an empty list for an empty class", async () => {
    expect(await mongo.getStudentsInClass("English235_JHBWXD")).toEqual([]);
  });
});

describe("getTeachersInClass", () => {
  it("Gets teachers from existing class", async () => {
    const teachers = await mongo.getTeachersInClass("Chinese671_JPYVGX");
    expect(teachers.length).toEqual(1);
    expect(teachers[0].email).toEqual("Stephen.Calderon@gmail.com");
  });

  it("Throws an error with a non-existent class", async () => {
    console.log = jest.fn();
    await mongo.getTeachersInClass("ABCD");
    expect(console.log).toHaveBeenCalledWith("Class does not exist");
  })
})