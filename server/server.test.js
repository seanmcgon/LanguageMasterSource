const request = require('supertest');
const app = require('./index.js'); 
const mongo = require('./databaseUsers.js')

jest.mock('mongoose')

// describe('API Endpoints', () => {
//     it('GET /api - success', async () => {
//       const response = await request(app).get('/api');
//       expect(response.statusCode).toEqual(200);
//       expect(response.body).toEqual({
//         message: "Node.js server says hi to React Frontend!"
//       });
//     });
//   });

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