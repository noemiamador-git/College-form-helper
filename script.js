document.getElementById("collegeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  clearErrors();
  document.getElementById("output").innerHTML = "";

  const name = document.getElementById("name").value.trim();
  const gpa = parseFloat(document.getElementById("gpa").value);
  const major = document.getElementById("major").value.trim();
  const activitiesText = document.getElementById("activities").value.trim();

  let valid = true;

  // Name validation
  if (name.length < 2) {
    showError("nameError", "Please enter your full name.");
    valid = false;
  }

  // GPA validation
  if (isNaN(gpa) || gpa < 0 || gpa > 4) {
    showError("gpaError", "GPA must be between 0.0 and 4.0.");
    valid = false;
  }

  // Major validation
  if (major.length < 2) {
    showError("majorError", "Please enter a major.");
    valid = false;
  }

  // Activities validation
  const activities = activitiesText
    .split("\n")
    .map(a => a.trim())
    .filter(a => a.length > 0);

  if (activities.length === 0) {
    showError("activitiesError", "Please list at least one activity.");
    valid = false;
  }

  if (!valid) return;

  // GPA feedback
  let gpaFeedback = "";
  if (gpa >= 3.8) gpaFeedback = "Strong academic standing.";
  else if (gpa >= 3.2) gpaFeedback = "Competitive GPA.";
  else gpaFeedback = "Consider strengthening academic components.";

  // Activities feedback
  let activityFeedback = "";
  if (activities.length >= 5) activityFeedback = "Excellent extracurricular involvement.";
  else if (activities.length >= 3) activityFeedback = "Solid activity list.";
  else activityFeedback = "Consider adding more activities.";

  // Readiness score
  let score = 0;
  score += gpa >= 3.5 ? 40 : 25;
  score += activities.length >= 4 ? 40 : 25;
  score += major.length > 0 ? 20 : 0;

  // Output summary
  document.getElementById("output").innerHTML = `
    <h2>Application Summary</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Major:</strong> ${major}</p>
    <p><strong>GPA:</strong> ${gpa} – ${gpaFeedback}</p>

    <h3>Activities (${activities.length})</h3>
    <ul>
      ${activities.map(a => `<li>${a}</li>`).join("")}
    </ul>

    <h3>Readiness Score: ${score}/100</h3>
    <p>${activityFeedback}</p>
  `;
});

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
}
