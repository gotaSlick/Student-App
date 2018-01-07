var express = require("express");
var router = express.Router();
var data = require("../models/students_js"); //imports the model with data
var Student = require("../models/studentSchema");

// display all students
router.get("/", (req, res) => {  // define "/" as /students (in app.js)
	// var students = data.getAll(); //from students.js
	Student.find((err, students) => {  //find finds all the documents
		if (err) {
			console.log(err);
		} else {
			res.render("index", { students: students });
		}
	});
	// How to do it with Promises:
	//Student.find()
	//.then(students => res.render("index", { students: students }))
	//.catch(error => console.log(error));
});
// get the add form
router.get("/add", (req, res) => {
	//res.send("welcome to the add page");
	res.render("addStudent", { message: "Please fill in the form" })//{} say it's an object
}); // 2nd argument says what has to happen when we go to /add

//post the add form
router.post("/add", (req, res) => {
	//console.log(req.body); //req object has a property called body
	var studentObj = new Student(req.body);
	var message = "";
	// data.addNewStudent(studentObj, (err) => {
	// 	if(err) {
	// 		message = err;
	// 	} else {
	// 		message = studentObj.name + " has successfully been added!";
	// 	}
	// });
	studentObj.save((err) => { // saving to the db. two arguments: error msg callback and 	
		if(err) {
			message = err;
		} else {
			message = studentObj.name + " has successfully been added!!!!!!";
		}
		res.render("addStudent", { message: message });
	}); 
});

// get a specific student profile
router.get("/profile/:id", (req, res) => {
	var id = req.params.id;
	// var student = data.getStudentById(id);
	//findById form Mongo:
	Student.findById(id)  
	.then(student => 
	res.render("profile", { student: student, message: "Edit the form" })
	)
	.catch(error => console.log(error));
});

router.post("/profile/:id", (req, res) => {
	var id = req.params.id;
	// data.updateStudent(id, req.body, (err) => {
	// 	if(err) {
	// 		res.render("profile", { message: err, student: data.getStudentById(id) });
	// 	} else {
	// 		res.redirect("/students");
	// 	}
	// });
	// var currentStudent;
	// Student.findById(id).then(student => (currentStudent = student));
	Student.findByIdAndUpdate(id, req.body, (err, updatedStudent) => {
		if(err) {
			res.render("profile", {message: err, student: updatedStudent});
		} else {
			//console.log(updatedStudent); //to console log in terminal just to see whats happening
			res.redirect("/");
		}
	});
});

router.delete("/profile/:id", (req, res) => {
	// data.deleteStudent(req.params.id, message => {
	// 	res.json(message);
	// });
	Student.findByIdAndRemove(req.params.id)
		.then(deletedStudent => {
			res.json(deletedStudent);
	})
	.catch(error => res.json(error));
});
module.exports = router;