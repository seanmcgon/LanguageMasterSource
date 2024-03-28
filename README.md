Part 1: Featureless Live Product Website: 
Once you complete the steps in part 2, the website should be running at http://localhost:3000/. 

Testing Login Button
Test login with existing user- should see positive UI and terminal feedback
Email: Stephen.Calderon@gmail.com"
Password: OqzGbcWE
Test login with non-existing user- should see negative UI and terminal feedback 
Email: csRocks@umass.edu"
Password: 320
Test Sign Up Button
Test sign up, should see positive feedback
Email: csRocks@gmail.com"
Password: 320
We are still integrating checks and features here
Test Login After Creation of New User- should see positive UI and terminal feedback
Email: csRocks@umass.edu"
Password: 320
Test persistence (database functionality):
Refresh the page either manually or by clicking the title button
Test number 3 again, it should still work
Feel free to do additional testing


Part 2: Usage and Development Material

Source control and build process instructions:

Go to: https://github.com/musicApprentice/LanguageMasterSource
Download the repository as an offline copy
Open the folder in VS Code
In the terminal, ensure you are in the same directory as your folder
In the root directory run npm install
cd into the server directory
Run npm install
cd into the client directory
Run npm install
Back in the main directory: run npm start to start the entire application
[0]- indicates terminal messages from the backend
[1]- indicates terminal messages from the frontend
Bug Tracking:
Database access instructions: .
The data is stored in the cluster0 in the MongoDB. We have created several databases including UserData, and a database for each course. The following steps will help you to access our database successfully.

Follow Source control and build process above
In the “databaseUsers.js” in server directory, we have 2 active functions in total (the rest are just helpers

The function verifyTeacher: this function takes two arguments: teacherEmail, and password. This function will check whether the given information matches any data in our database. It returns the boolean value of whether it found a matching teacher user.
The query used in this function is find(). Then, if it finds any matching data, it will return True. How does it work? First of all, the function retrieves information as BSON form, then we have to make it return an array by using toArray() method. If the returned array only contains one element, it should return true.
The function createTeacher: this function will return true if it successfully creates a student, and it will update the new teacher to the database. This function needs two supporting functions: checkValidityOfEmail and checkValidityOfPassword to make sure the given email and password are correct forms. If one of them is not valid, the function logs the message error.
To run these functions:
Option 1: run via server.test.js : This file is the place where we add tests for functions, so you could add your own test if you want. Run “npm run test”
Option 2: Call and execute the functions yourself: At the end of the file, you can simply write the order for which function you want to run: for example createTeacher(“FirstName”, “LastName”, “Email”, “Password”). Run “node function.js”
Remember: When you test the webpage, these functions are called as well
