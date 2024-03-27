import unittest
from pymongo.mongo_client import MongoClient

class TestInsertDummyData(unittest.TestCase):
    
    def testClassesHaveCorrectNumOfGrades(self):
        connectionString = "mongodb+srv://mkandeshwara:0CgF5I8hwXaf88dy@cluster0.tefxjrp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        client = MongoClient(connectionString)
        db = client["UserData"]
        col = db["teachers"]
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
        courses = col.aggregate(pipeline).next()["allCourses"]
        

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


if __name__ == '__main__':
    unittest.main()