document.getElementById("collegeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  clearErrors();
  document.getElementById("output").innerHTML = "";

  const name = document.getElementById("name").value.trim();
  const gpa = parseFloat(document.getElementById("gpa").value);
  const major = document.getElementById("major").value.trim();
  const activitiesText = document.getElementById("activities").value.trim();

  let valid = true;

  // --- Validation ---
  if (name.length < 2) {
    showError("nameError", "Please enter your full name.");
    valid = false;
  }

  if (isNaN(gpa) || gpa < 0 || gpa > 4) {
    showError("gpaError", "GPA must be between 0.0 and 4.0.");
    valid = false;
  }

  if (major.length < 2) {
    showError("majorError", "Please enter a major.");
    valid = false;
  }

  const activities = activitiesText
    .split("\n")
    .map(a => a.trim())
    .filter(a => a.length > 0);

  if (activities.length === 0) {
    showError("activitiesError", "Please list at least one activity.");
    valid = false;
  }

  if (!valid) return;

  // --- Feedback ---
  let gpaFeedback = gpa >= 3.8 ? "Strong academic standing."
    : gpa >= 3.2 ? "Competitive GPA."
    : "Consider strengthening academic components.";

  let activityFeedback = activities.length >= 5 ? "Excellent extracurricular involvement."
    : activities.length >= 3 ? "Solid activity list."
    : "Consider adding more activities.";

  // --- Section Completeness Tracking ---
  const completeness = {
    "Personal Info": name.length > 0,
    "Academic Info": !isNaN(gpa) && gpa >= 0,
    "Major": major.length > 0,
    "Activities": activities.length > 0
  };

  const completedSections = Object.values(completeness).filter(v => v).length;
  const totalSections = Object.keys(completeness).length;
  const completenessPercent = Math.round((completedSections / totalSections) * 100);

  let completenessList = "";
  for (let section in completeness) {
    completenessList += `<li>${section}: ${completeness[section] ? "✔ Complete" : "✖ Needs attention"}</li>`;
  }

  // --- Output Summary ---
  document.getElementById("output").innerHTML = `
    <h2>Application Summary</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Major:</strong> ${major}</p>
    <p><strong>GPA:</strong> ${gpa} – ${gpaFeedback}</p>

    <h3>Activities (${activities.length})</h3>
    <ul>
      ${activities.map(a => `<li>${a}</li>`).join("")}
    </ul>
    <p>${activityFeedback}</p>

    <h3>Section Completeness: ${completenessPercent}%</h3>
    <ul>
      ${completenessList}
    </ul>
  `;
});

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.textContent = "");
}
