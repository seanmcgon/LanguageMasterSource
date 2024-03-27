# Maya Kandeshwarath 3/29/2024, Script to insert test data into the database
# originally written earlier in js, but rewritten in python due to data being inserted incorrectly

from pymongo.mongo_client import MongoClient
from faker import Faker # Package used to generate fake data
import random

faker = Faker()

connectionString = "mongodb+srv://mkandeshwara:0CgF5I8hwXaf88dy@cluster0.tefxjrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(connectionString)

# Constants to control the amount of data generated and inserted
NUMOFTEACHERS = 3
NUMOFCLASSESPERTEACHER = 2
# Total number of students is numofstudentsperclass*numofclassesperteacher*numofteachers, students are randomly assigned to classes
# so exactly numofstudentsperclass won't necessarily be in each class
NUMOFSTUDENTSPERCLASS = 3
NUMOFASSIGNMENTSPERCLASS = 2
NUMOFCARDSPERASSINGMENT = 2
# Used to name classes
LANGUAGES = ["Spanish", "French", "German", "Vietnamese", "Hindi", "Latin", "Greek", "English", "Chinese"]


# Method to randomly generate a teacher dictionary to insert into database
def createTeacher():
    first = faker.first_name()
    last = faker.last_name()
    courses = []
    for i in range(NUMOFCLASSESPERTEACHER):
        courses.append(random.choice(LANGUAGES) + str(random.randrange(100, 900)) + "_" + faker.pystr_format(string_format = "??????", letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
    return {"name": first + " " + last, "email": first + "." + last + "@" + faker.free_email_domain(), "password": faker.pystr(min_chars = 8, max_chars = 8), "courseList": courses}

# Method to randomly generate dictionaries for all students to insert into database
def createStudents(courses):
    students = []
    for i in range(NUMOFSTUDENTSPERCLASS*len(courses)):
        first = faker.first_name()
        last = faker.last_name()
        classes = []
        classes.append(random.choice(courses))
        # Roughly one in ten students will be enrolled in two classes, the rest will only be enrolled in one
        if(random.randint(1, 10) == 1):
            c = random.choice(courses)
            while(c == classes[0]):
                c = random.choice(courses)
            classes.append(c)
        students.append({"name": first + " " + last, "email": first + "." + last + "@" + faker.free_email_domain(), "password": faker.pystr(min_chars = 8, max_chars = 8), "courseList": classes})
    return students

# Insert teachers into the database
db = client["UserData"]
col = db["teachers"]
for i in range(NUMOFTEACHERS):
    col.insert_one(createTeacher())
print("Inserted " + str(NUMOFTEACHERS) + " into UserData.teachers")

# MongoDB aggregation pipeline to be used to get an array of all the classes taught by some teacher in UserData.teachers,
# without duplicates if there are multiple teachers teaching the same class
allCoursesPipeline = [
        {
          "$unwind": {
             "path": "$courseList",
             "preserveNullAndEmptyArrays": False,
          },
        },
        {
          "$group": {
            "_id": "null",
            "allCourses": {
              "$push": "$courseList"
            }
          }
        },
        {'$addFields': {'courseList': {'$setUnion': ['$fcourseList', []]}}}
      ]

# Use the pipeline to get the list of courses
courses = col.aggregate(allCoursesPipeline).next()["allCourses"]
print("There are " + str(len(courses)) + " courses in the database")

# Insert students into the database
col = db["students"]
col.insert_many(createStudents(courses))
print("Inserted " + str(NUMOFSTUDENTSPERCLASS*len(courses)) + " into UserData.students")

# Iterate through the list of courses found with the aggregation and create databases for each one, with teachers, students, assignments, and grades
for c in courses:
    db = client["UserData"]
    col = db["teachers"]
    # Short for teachers in class, array of all teachers teaching the class
    tic = []
    # Going through UserData.teachers to find all teachers who teach this class, adding each teacher document to an array to be able to access the data
    for doc in col.find({"courseList": {"$all": [c]}}):
        tic.append(doc)

    col = db["students"]
    # Short for students in class, array of all students in the class
    sic = []
    # Going through UserData.students to find all students who take this class, adding each student document to an array to be able to access the data
    for doc in col.find({"courseList": {"$all": [c]}}):
        sic.append(doc)

    # Insert students taking class into the database
    db = client[c]
    col = db["students"]
    if(len(sic) > 0):
        col.insert_many(sic)
    print("Inserted " + str(len(sic)) +" student(s) into " + c + ".students")

    # Insert teachers teaching class into the database
    col = db["teachers"]
    col.insert_many(tic)
    print("Inserted " + str(len(tic)) +" teacher(s) into " + c + ".teachers")

    # Randomly generating flashcards to add to the class's assignments collection
    cards = []
    for i in range(NUMOFASSIGNMENTSPERCLASS):
        assignmentName = faker.word()
        for j in range(NUMOFCARDSPERASSINGMENT):
            cards.append({"assignment": assignmentName, "card": j, "text": faker.word(), "translation": faker.word(), "audio": faker.url()})

    # Randomly generating grades to add to the class's metrics collection
    grades = []
    for flashcard in cards:
        for student in sic:
            grades.append({"studentEmail": student["email"], "assignment": flashcard["assignment"], "card": flashcard["card"], "timesPracticed": random.randint(0, 10), "score": random.randint(0, 10)/10})

    # Inserting flashcards into the database
    col = db["assignments"]
    col.insert_many(cards)
    print("Inserted " + str(len(cards)) + " flashcards into " + c + ".assignments")

    # Inserting grades into the database
    col = db["metrics"]
    col.insert_many(grades)
    print("Inserted " + str(len(grades)) + " grades into " + c + ".metrics")

    print("Completed inserting data for " + c + " class " + str(courses.index(c) + 1) + " of " + str(len(courses)) + " classes")