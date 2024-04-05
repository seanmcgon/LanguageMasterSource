const { assert } = require('console');
const { MongoClient } = require('mongodb');
const { TextEncoder } = require('util');

const connectionString = "mongodb+srv://mkandeshwara:0CgF5I8hwXaf88dy@cluster0.tefxjrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true";
const client = new MongoClient(connectionString);

function checkValidityOfEmail(emailAddress) {
    const regex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (emailAddress.match(regex)) {
        return true;
    }
    return false;
}

function checkValidityOfPassword(password) {
    const regex = /^[^ ]{2,15}$/;
    if (password.match(regex)) {
        return true;
    }
    return false;
}

async function verifyTeacher(teacherEmail, password) {
    try {
        await client.connect();
        const db = client.db("UserData");
        const col = await db.collection("teachers");
        const result = await col.find({ $and: [{ email: teacherEmail }, { password: password }] }).toArray();
        return result.length === 1;
    } finally {
        await client.close();
    }
}

async function verifyStudent(studentEmail, password){
  try{
    await client.connect();
    db = client.db("UserData");
    col = await db.collection("students");
    let result = await col.find({$and:[{email: studentEmail}, {password: password}]}).toArray();
    return result.length == 1 ? true: false;
  }
  finally{
    await client.close();
  }
}



async function createTeacher(firstName, lastName, teacherEmail, password) {
    let createdTeacher = false;

    const re = verifyTeacher(teacherEmail.trim(), password.trim());
    let boo = await re;
    if (!boo) {
        await client.connect();
        const db = client.db("UserData");
        const col = await db.collection("teachers");
        const doubleE = await col.find({ email: teacherEmail }).toArray();
        const booE = checkValidityOfEmail(teacherEmail);
        const booP = checkValidityOfPassword(password);
        let courses = [];

        if (booE && booP && doubleE.length !== 1) {
            const result = { name: `${firstName.trim()} ${lastName.trim()}`, email: teacherEmail.trim(), password: password.trim(), courseList: courses };
            await col.insertOne(result);
            createdTeacher = true;
            console.log("Successfully created new teacher");
        }

        await client.close();
    }
    return createdTeacher;
}

function checkValid(className) {
    const regex = /^[^ ]+\_[^ ]{1,6}$/;
    if (className.match(regex)) {
        return true;
    }
    return false;
}

async function updateClassForGivenTeacher(col, teacherEmail, className) {
    const courseL = await col.find({ email: teacherEmail }).toArray();
    let originalCourse = courseL[0].courseList;
    if (!originalCourse.includes(className)) {
        originalCourse.push(className);
    }
    await col.updateOne({ email: teacherEmail }, { $set: { courseList: originalCourse } });
}

async function createClass(className, teacherEmail) {
    let classCreated = false;

    await client.connect();
    const db = client.db("UserData");
    const col = await db.collection("teachers");
    const checkTheValidOfClassName = checkValid(className);

    const allCoursesPipeline = [
        { $unwind: "$courseList" },
        { $group: { _id: null, allCourses: { "$push": "$courseList" } } },
        { '$addFields': { 'courseList': { '$setUnion': ['$fcourseList', []] } } }
    ];

    let courses = await col.aggregate(allCoursesPipeline);
    let c = await courses.next();

    if (checkTheValidOfClassName) {
        if ((await col.find({ email: teacherEmail }).toArray()).length === 1) {
            await updateClassForGivenTeacher(col, teacherEmail, className);
            let getTeacherInfo = await col.find({ email: teacherEmail }).toArray();
            if (c.allCourses.includes(className)) {
                const db1 = client.db(className);
                const col1 = await db1.collection("teachers");
                const teacherInThatClass = await col.find({ email: teacherEmail }).toArray();
                if (teacherInThatClass.length !== 1) {
                    await col1.insertOne(getTeacherInfo[0]);
                } else {
                    await col1.deleteOne({ email: teacherEmail });
                    await col1.insertOne(getTeacherInfo[0]);
                }
                classCreated = true;
            } else {
                MongoClient.connect(connectionString).then(async (client) => {
                    const db = client.db(className);
                    db.createCollection("assignments");
                    db.createCollection("metrics");
                    db.createCollection("students");
                    db.createCollection("teachers");
                    col = db.collection("teachers");
                    await col.insertOne(getTeacherInfo[0]);
                    await client.close();
                    classCreated = true;
                });
            }
        }
    }

    return classCreated;
}

async function getStudentsInClass(className){
  // array of students to return
  let students = [];
  try{
    await client.connect();
    let db = client.db(className);
    // If the db doesn't exist, then find will just return an empty array,
    // but when a class is created some teacher must be assigned
    const teachers = await db.collection("teachers").find().toArray();
    if(teachers.length === 0){
      throw("Class does not exist");
    }
    else{
      let col = db.collection("students");
      students = await col.find().toArray();
    }
  }
  catch(err){
    console.log(err);
  }
  finally{
    await client.close();
  }
  return students;
}

async function getTeachersInClass(className){
  // array of students to return
  let teachers = [];
  try{
    await client.connect();
    let db = client.db(className);
    let col = db.collection("teachers");
    // If the db doesn't exist, then find will just return an empty array,
    // but when a class is created some teacher must be assigned
    teachers = await col.find().toArray();
    if(teachers.length === 0){
      throw("Class does not exist");
    }
  }
  catch(err){
    console.log(err);
  }
  finally{
    await client.close();
  }
  return teachers;
}


async function getClassesTeacher(teacherEmail) {
  try {
    await client.connect();
    const db = client.db("UserData");
    const col = db.collection("teachers");
    const result = await col.findOne({email: teacherEmail.trim() });
    if (result) {
      return result.courseList || [];
    } else {
      return [];
    }
  } finally {
    await client.close();
  }
}

async function getClassesStudent(studentEmail) {
  try {
    await client.connect();
    const db = client.db("UserData");
    const col = db.collection("students");
    const result = await col.findOne({email: studentEmail.trim() });
    if (result) {
      return result.courseList || [];
    } else {
      return [];
    }
  } finally {
    await client.close();
  }
}

async function createStudent(firstName, lastName, studentEmail, password){
  // boolean to return based on whether the student is returned or not
  let inserted = false;
  try{
    // Connect to db and go to student data collection
    await client.connect();
    let db = client.db("UserData");
    let col = db.collection("students");

    // Check that the email isn't already in the database
    if((await col.find({email: studentEmail.trim()}).toArray()).length === 0){
      // Booleans for valdidity of email and password
      let validEmail = checkValidityOfEmail(studentEmail.trim());
      let validPass = checkValidityOfPassword(password.trim());
      // If all is correct, insert student and set return boolean to whether student is correctly inserted
      if(validEmail && validPass){
        await col.insertOne({name: firstName.trim() + " " + lastName.trim(), email: studentEmail.trim(), password: password.trim(), courseList: []});
        inserted = true;
      }
      // One or both of the password and email are invalid, throw an error corresponding to which are invalid
      else if(!validEmail && validPass){
        throw("Email is invalid");
      }
      else if(validEmail && !validPass){
        throw("Password is invalid");
      }
      else{
        throw("Both email and password are invalid");
      }
    }
    else{
      throw("Student already exists!");
    }
  }
  catch(err){
    console.log(err);
  }
  finally{
    await client.close();
  }
  return inserted;
}



module.exports = { createTeacher, createStudent, verifyTeacher, verifyStudent, createClass, getClassesTeacher, getClassesStudent, getStudentsInClass, getTeachersInClass, client}
