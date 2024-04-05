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

module.exports = { createTeacher, verifyTeacher, createClass, getClassesTeacher, getClassesStudent}
