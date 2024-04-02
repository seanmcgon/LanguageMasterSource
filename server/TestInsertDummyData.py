import unittest
from pymongo.mongo_client import MongoClient

class TestInsertDummyData(unittest.TestCase):
    global client
    global connectionString
    connectionString = "mongodb+srv://mkandeshwara:0CgF5I8hwXaf88dy@cluster0.tefxjrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(connectionString)
    # Get a list of all the courses in the database from the teachers' courselists
    global courses
    pipeline = [
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
        {'$addFields': {'courseList': {'$setUnion': ['$fcourseList', []]}}}]
    courses = client["UserData"]["teachers"].aggregate(pipeline).next()["allCourses"]
    
    # Check that there is a grade for every student for every assignment in each class (checking by numbers)
    # Might want another test to check that each specific flashcard has a grade for every student in each class
    def testClassesHaveCorrectNumOfGrades(self):
        # Iterate through all the course dbs, get the number of students and number of grades,
        # and check that the number of grades per students is the number of flashcards
        for c in courses:
            db = client[c]
            col = db["students"]
            students = 0
            for doc in col.find():
                students = students + 1

            col = db["metrics"]
            grades = 0
            for doc in col.find():
                grades = grades + 1

            if(students == 0):
                assert(grades == 0)
            else:
                assert(grades/students == 4)
                # Origninally I imported the fields which determined the correct number of grades per students and compared against that,
                # but despite only importing variables, field from that file, code from it ran everytime I tried to rus the tests and a ton
                # of data was inserted when I didn't want it to be, so I removed the import statement and hardcoded the numbers

    # Test that every student is actually in the classes in their courselist
    def testEveryStudentInCorrectClass(self):
        # Get list of all students, iterate through them, 
        # and check that each one is in the students list in the classes listed in their courselists
        db = client["UserData"]
        col = db["students"]
        students = []
        for doc in col.find():
            students.append(doc)
        for s in students:
            for c in s["courseList"]:
                db = client[c]
                col =  db["students"]
                student = []
                for doc in col.find({"email": s["email"]}):
                    student.append(doc)
                assert len(student) == 1

    # Test that every teacher is actually in the classes in their courselist
    def testEveryTeacherInCorrectClass(self):
        # Get list of all teachers, iterate through them, 
        # and check that each one is in the students list in the classes listed in their courselists
        db = client["UserData"]
        col = db["teachers"]
        teachers = []
        for doc in col.find():
            teachers.append(doc)
        for t in teachers:
            for c in t["courseList"]:
                db = client[c]
                col =  db["teachers"]
                teacher = []
                for doc in col.find({"email": t["email"]}):
                    teacher.append(doc)
                assert len(teacher) == 1

    # Test that every student in a class has that class in their courselist
    def testAllStudentsInClassInClass(self):
        # Iterate through courses in database, get list of every student in each class
        # Check that each student in the list has the class in their courseList
        for c in courses:
            studentsInClass = []
            db = client[c]
            col = db["students"]
            for doc in col.find():
                studentsInClass.append(doc)
            db = client["UserData"]
            col = db["students"]
            for s in studentsInClass:
                stu = []
                for doc in col.find({"email": s["email"]}):
                    stu.append(doc)
                assert len(stu) == 1
                assert c in stu[0]["courseList"]

    # Test that every teacher in a class has that class in their courselist
    def testAllTeachersInClassInClass(self):
        # Iterate through courses in database, get list of every teacher in each class
        # Check that each teacher in the list has the class in their courseList
        for c in courses:
            teachersInClass = []
            db = client[c]
            col = db["teachers"]
            for doc in col.find():
                teachersInClass.append(doc)
            db = client["UserData"]
            col = db["teachers"]
            for t in teachersInClass:
                tea = []
                for doc in col.find({"email": t["email"]}):
                    tea.append(doc)
                assert len(tea) == 1
                assert c in tea[0]["courseList"]

    # TODO: Test that for every flashcard, each student has a grade
    # TODO: Check that no collections anywhere have duplicates
    # TODO: Check that the only databases are the class dbs, UserData, the default dbs, and Quoc's test db
    # TODO: Change loop which processes finds into .toArray()

if __name__ == '__main__':
    unittest.main()