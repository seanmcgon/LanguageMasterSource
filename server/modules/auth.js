const { MongoClient } = require('mongodb');
const { TextEncoder } = require('util');
const connectionString = "mongodb+srv://mkandeshwara:0CgF5I8hwXaf88dy@cluster0.tefxjrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true";
const client = new MongoClient(connectionString);


function verifyTeacherData(socket) {
    socket.on('studentInfo', async (teacherEmail, teacherPassword) => {
      console.log(teacherEmail, teacherPassword)
        let teacherVerified;
        try {
          teacherVerified = await verifyTeacher(teacherEmail, teacherPassword);
        } catch (error) {
            console.error('Error verifying student:', error);
            teacherVerified = false;
        }
        console.log("verifyTeacher was called and returned value:", teacherVerified);
        socket.emit("studentVerification", teacherVerified);
        return teacherVerified;
    });
}

async function verifyTeacher(teacherEmail, password) {
  if (!password) {
    return false;
  }
  try {
    await client.connect();
    const db = client.db("UserData");
    const col = db.collection("teachers");
    const result = await col.findOne({ email: teacherEmail, password: password });
    await client.close();
    return result !== null;
  } catch (error) {
    console.error('Error in verifyTeacher:', error);
    await client.close();
    return false;
  } finally {
    await client.close();
  }
}

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


function createTeacherAccount(socket) {
  socket.on('createTeacher', async (firstName, lastName, teacherEmail, teacherPassword) => {
    let teacherCreated;
    console.log(firstName, lastName, teacherEmail, teacherPassword);
      try {
          teacherCreated = await createTeacher(firstName, lastName, teacherEmail, teacherPassword);
      } catch (error) {
          console.error('Error creating teacher:', error);
          teacherCreated = false;
      }
      console.log("teacherCreated was called and returned value:", teacherCreated);
      socket.emit("createTeacherStatus", teacherCreated);
      return teacherCreated;
  });
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
  // }
// }

// function studentMatchDB(studentName, studentPassword) {
//     //dummy holder function
//     console.log("studentName", studentName);
//     console.log("studentPassword", studentPassword);
//     let studentsArr = ["Maya", "Jason", "Bach"];
//     return studentsArr.some(student => student === studentName);
// }

module.exports = { verifyTeacherData, createTeacherAccount};