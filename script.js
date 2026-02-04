const form = document.getElementById("collegeForm");
const output = dcoument.getElementById("output")

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById ("name").value;
  const gpa = document.getElementById("gpa").value;
  const major = document.getElementById("major").value;
  const activities = document.getElementById("activities").value;

  if (!name || !gpa || !major || !activities) {
    output.innerHTML = "<p>Please fill out all fields.</p>";
    return;
  }

  output.innerHTML = 
    <h2>Application Summary </h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>GPA:</strong> ${gpa}</p>
  <p><strong>Major:</strong> ${major}</p>
  <p><strong>Activities:</strong> ${activities}</p>
 ';
});
