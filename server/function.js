const { assert } = require('console');
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
    let doubleE = await col.find({email: teacherEmail}).toArray();
    const booE = checkValidityOfEmail(teacherEmail);
    const booP = checkValidityOfPassword(password);
    let courses = [];

    if(booE && booP && doubleE.length !==1){
      let result = {name: firstName.trim() + " " + lastName.trim(), email: teacherEmail.trim(),password: password.trim(),courseList: courses};
      await col.insertOne(result);
      createdTeacher = true;
      console.log("Successfully create new teacher");
    }
    else if(doubleE.length === 1){
      throw("The teacher already exist");
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

  function checkValid(className){
    const regex = /^[^ ]+\_[^ ]{1,6}$/
    if(className.match(regex)){
      return true;
    }
    return false;
  }

  async function updateClassForGivenTeacher(col, teacherEmail,className){
    let courseL = await col.find({email: teacherEmail}).toArray();
    let originalCourse = courseL[0].courseList;
    if(originalCourse.indexOf(className) === -1){
    originalCourse.push(className);
    }
    await col.updateOne({email: teacherEmail}, {$set:{courseList: originalCourse}})
  }

  async function createClass(className, teacherEmail){
    // Add class to the teacher's course List
    try{
    await client.connect();
    db = client.db("UserData");
    col = await db.collection("teachers");
   //console.log(getTeacherInfo[0]);
    const checkTheValidOfClassName = checkValid(className);
    const allCoursesPipeline = [
      {
        $unwind: {
           path: "$courseList",
           preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: null,
          allCourses: {
            "$push": "$courseList"
          }
        }
      },
      {'$addFields': {'courseList': {'$setUnion': ['$fcourseList', []]}}}
    ];

  // Use query, set output to courses to be used later
  let courses = await col.aggregate(allCoursesPipeline);
  // courses is not a variable or list or anything that js can output, it's a MongoDB cursor
  // This is part of how to access the info in it
  c = await courses.next();
  //console.log("The index of the given class name is: " + c.allCourses.indexOf(className));
  //console.log(c.allCourses);
    
  if(checkTheValidOfClassName){
      //create a class data base based on the given name
      //1) if the class already exist in the database, so we do not need to create a new one, but update the teacher collection of that class database
     // update class course of the given teacher
     if(((await col.find({email: teacherEmail}).toArray()).length) === 1){
     updateClassForGivenTeacher(col, teacherEmail, className);
     let getTeacherInfo = await col.find({email: teacherEmail}).toArray();
      if(c.allCourses.indexOf(className) !== -1){
      db1 =  client.db(className);
      col1 = await db1.collection("teachers");
      const teacherInThatClass = await col.find({email: teacherEmail}).toArray();
      if(teacherInThatClass.length !== 1){
      await col1.insertOne(getTeacherInfo[0]);
      }
      else{
        await col1.deleteOne({email:teacherEmail});
        await col1.insertOne(getTeacherInfo[0]);
      } 
     }
     //
     //2) If the given class name does not have dabase for itself, then we need to create a database for it, and add teacher info into that class 
    //create class db.
    else{

     MongoClient.connect(connectionString).then(async (client) => { 
  
      //console.log('Database is being created ... '); 
        
      // database name 
      const db = client.db(className); 
        
      // collection name 
      db.createCollection("assignments");
      db.createCollection("metrics");
      db.createCollection("students");
      db.createCollection("teachers");
      //console.log("Success!!")
      //Add teacher to the new class
      col = db.collection("teachers");
      await col.insertOne(getTeacherInfo[0]);
      await client.close();
  })
    }
  }
  else{
    throw("The teacher does not exist");
  }
    }
    else{
      throw("inValid class name");
    }
  }
    catch(err){
      throw (err);
    }
    finally{
      await client.close();
    }


    

  }
  //createClass("LeagueOfLegend_101","jyhuang@umass.edu");
  //console.log(checkValid("Math"));
  module.exports = {createTeacher, verifyTeacher, createClass};
