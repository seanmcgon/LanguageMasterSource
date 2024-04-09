
const { MongoClient } = require('mongodb');
const { TextEncoder } = require('util');

const connectionString = "mongodb+srv://mkandeshwara:0CgF5I8hwXaf88dy@cluster0.tefxjrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true";
const client = new MongoClient(connectionString);

function checkValidityOfEmail(emailAddress){
  const regex = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if(emailAddress.match(regex)){
    return true;
  }
  return false;
}
  function checkValidityOfPassword(password){
    const regex = /^[^ ]{2,15}$/;
    if(password.match(regex)){
      return true;
    }
    return false;
  }

async function verifyTeacher(teacherEmail, password){
  try{
    await client.connect();
    db = client.db("UserData");
    col = await db.collection("teachers");
    let result = await col.find({$and:[{email: teacherEmail}, {password: password}]}).toArray();
    return result.length == 1 ? true: false;
  }
  finally{
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


async function createTeacher(firstName,lastName,teacherEmail, password){
  let createdTeacher = false;

  let re = verifyTeacher(teacherEmail.trim(), password.trim());
  let boo = false;
  boo = await re.then(e => e);
  try{
  if(!boo){
    await client.connect();
    db = client.db("UserData");
    col = await db.collection("teachers");
    const booE = checkValidityOfEmail(teacherEmail);
    const booP = checkValidityOfPassword(password);
    let courses = [];

    if(booE && booP){
      let result = {name: firstName.trim() + " " + lastName.trim(), email: teacherEmail.trim(),password: password.trim(),courseList: courses};
      await col.insertOne(result);
      createdTeacher = True;
      console.log("Successfully create new teacher",teacherEmail, password);
    }
    else if(!booE && booP){
      throw("Email is invalid");
    }
    else if(booE && !booP){
      throw("Pass is invalid");
    }
    else{
      throw("Both are invalid");
    }
  }
  else{
    throw ("Teacher already exist!");
  }  
}
  catch (err){
    console.log(err);
  }
  finally{
  await client.close();
  return createdTeacher;
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

  async function viewAssignment(className, assignmentName){
    let cards = [];
    try{
      await client.connect();
      let db = client.db(className);
      let col = db.collection("teachers");
      const teachers = await col.find().toArray();
      // If there are no teachers assigned to the class, then it doesn't exist
      if(teachers.length === 0){
        throw("Class does not exist");
      }
      col = db.collection("assignments");
      cards = await col.find({assignment: assignmentName}).toArray();
      // If there are no cards in the assignment, it doesn't exist
      if(cards.length === 0){
        throw("Assignment does not exist");
      }
    }
    catch(err){
      console.log(err);
    }
    finally{
      await client.close();
      // Currently cards are in {_id, assignment, card, text, translation, audio}, just want {text, translation, audio} returned
      return cards.map(e => ({text: e.text, translation: e.translation, audio: e.audio}));
    }
  }
  module.exports = {createTeacher, verifyTeacher, createStudent, getStudentsInClass, getTeachersInClass, viewAssignment, client};
