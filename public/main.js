window.onload = function() {
  var deleteButtons = document.getElementsByClassName("deleteButton");
  console.log(deleteButtons);

  deleteButtons[0].onclick = function() {
    // send fetch request
    console.log(this);
    var id = this.getAttribute("id");
    console.log(id);
    sendDeleteRequest(id);
  };
};

function sendDeleteRequest(id) {
  var myRequest = new Request("/students/profile/" + id, {
    method: "DELETE"
  });

  fetch(myRequest)
    .then(response => response.json())
    .then(deletedStudent => {  	
      var message = deletedStudent.name + " has been deleted";
      alert(message);
      window.location.href = "/";
    })
  .catch(error => alert(error));
}