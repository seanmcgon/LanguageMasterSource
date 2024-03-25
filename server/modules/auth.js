function verifyStudentData(socket) {
    //socket.on listens for the event studentInfo which should send us both studentName and studentPassword
    socket.on('studentInfo', (studentName, studentPassword) => {

        //call the function to search the username and password up in the database
        let studentVerified = studentMatchDB(studentName, studentPassword);
        console.log(studentVerified);

        //socket.emit sends the event studentVerification, which the front-end can listen for using socket.on
        //we send student verified, a boolean of whether or not the student name and password was verified
        socket.emit("studentVerification", studentVerified);
        return studentVerified;
    });
}

function studentMatchDB(studentName, studentPassword) {
    //dummy holder function
    console.log("studentName", studentName);
    console.log("studentPassword", studentPassword);
    let studentsArr = ["Maya", "Jason", "Bach"];
    return studentsArr.some(student => student === studentName);
}

module.exports = { verifyStudentData };