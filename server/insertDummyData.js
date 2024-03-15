const { MongoClient } = require('mongodb');
const { faker } = require('@faker-js/faker');

const connectionString = "mongodb+srv://mkandeshwara:0CgF5I8hwXaf88dy@cluster0.tefxjrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(connectionString);

const NUMOFTEACHERS = 5;
const NUMOFCLASSESPERTEACHER = 3;
// Each student is only in once class, not always the case, but most of the time our data will probably look like this
const NUMOFSTUDENTSPERCLASS = 5;
const NUMOFASSIGNMENTS = 2;
const NUMOFCARDSPERASSIGNMENT = 10;

  // Couldn't figure out how to properly terminate the function without the connection closing too soon
  // MAKE SURE TO KILL FUNCTION AFTER ALL THE DATA HAS BEEN UPLOADED
  // Set to print when students, assignments, or grades are uploaded to each class
  // Kill once the correct number of documents have been inserted, right now there's 15 classes
  // It's at most NUMOFTEACHERS*NUMOFCLASSESPERTEACHER, but there could be dublicates, in which case there'd be less

// Create randomized teacher object to insert into db
function createTeacher(){
    const first = faker.person.firstName();
    const last = faker.person.lastName();
    let courses = [];
    for(let i = 0; i < NUMOFCLASSESPERTEACHER; i++){
        courses.push(faker.lorem.word())
    }
    return {name: first + " " + last, email: faker.internet.email({"firstName": first, "lastName": last}), password: faker.string.alphanumeric(8), courseList: courses};
}


async function run(){
    await client.connect();

    // Code to print all databases in cluster
    // const admin = client.db().admin();
    // const dbInfo = await admin.listDatabases();
    // dbInfo.databases.forEach(e => console.log(e));


    // Insert teachers into db
    db = await client.db("UserData");
    col = await db.collection("teachers");
    for(let i = 0; i < NUMOFTEACHERS; i++){
        await col.insertOne(createTeacher());
    }

    // Query to get a list of courses from all the teachers in UserData.teachers
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

    await client.close();

    // Printing list of courses and number of courses in list
    // This is the number of grade inserts you should kill after
    console.log(c.allCourses);
    console.log(c.allCourses.length);
  
    //Create and upload students, grades, and assignments for each class
    await c.allCourses.forEach(async (e, i) =>  {

      //Create students
      let students = [];
      for(let i = 0; i < NUMOFSTUDENTSPERCLASS; i++){
        const first = faker.person.firstName();
        const last = faker.person.lastName();
        students.push({name: first + " " + last, email: faker.internet.email({"firstName": first, "lastName": last}),
            password: faker.string.alphanumeric(8), courseList: [e]});
    }
    
    //Create flashcards
    let cards = [];
    for(let i = 0; i < NUMOFASSIGNMENTS; i++){
        for(let j = 0; j < NUMOFCARDSPERASSIGNMENT; j++){
            cards.push({assignment: i, card: j, text: faker.lorem.word(), translation: faker.lorem.word(),
                audio: faker.internet.url()});
        }
    }

    let grades = [];
    //Create grades for each student for each card
    for(let i = 0; i < cards.length; i++){
        for(let j = 0; j < students.length; j++){
            grades.push({studentEmail: students[j].email, assignment: cards[i].assignment, card: cards[i].card,
                timesPracticed: Math.floor(Math.random()*10), score: Math.floor(Math.random()*10)/10});
        }
    }

    await client.connect();

    // Upload students to UserData.students
    let db = await client.db("UserData");
    let col = await db.collection("students");
    let scount = 0;
    for(let i = 0; i < students.length; i++){
      if((await col.insertOne(students[i])).acknowledged){
        scount++;
      }
    }
    console.log(i + ": " + scount + " students inserted into " + e);

    // Upload flashcards to a course db in the assignments collection
    db = await client.db(e);
    col = await db.collection("assignments");
    let ccount = 0;
    for(let i = 0; i < cards.length; i++){
      if((await col.insertOne(cards[i])).acknowledged){
        ccount++;
      }
    }

    console.log(i + ": " + ccount + " cards inserted into " + e);

    // Upload grades to a course db in the metrics collection
    col = await db.collection("metrics");
    let gcount = 0;
    for(let i = 0; i < grades.length; i++){
      if((await col.insertOne(grades[i])).acknowledged){
        gcount++;
      }
    }
   
    console.log(i + ": " + gcount + " grades inserted into " + e);


    });

}


run();

/*
Terminal query to get list of all classes that any teacher teaches without duplicates

db.teachers.aggregate([
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
    {$addFields: {'courseList': {'$setUnion': ['$courseList', []]}}}
  ]);
*/