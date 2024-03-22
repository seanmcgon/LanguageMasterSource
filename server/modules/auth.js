function verifyStudentData(socket) {
    socket.on('studentInfo', (studentName, studentPassword) => {
        let studentVerified = studentMatchDB(studentName, studentPassword);
        console.log(studentVerified);
        console.log("sending data");
        socket.emit("studentVerification", studentVerified);
        return studentVerified;
    });
}

function studentMatchDB(studentName, studentPassword) {
    console.log("studentName", studentName);
    console.log("studentPassword", studentPassword);
    let studentsArr = ["Maya", "Jason", "Bach"];
    return studentsArr.some(student => student === studentName);
}

module.exports = { verifyStudentData };