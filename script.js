document.addEventListener("DOMContentLoaded", function() {
  const formElements = ["name", "gpa", "major", "activities", "awards"];
  formElements.forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener("input", updateProgress);
  });

  function updateProgress() {
    const name = document.getElementById("name").value.trim();
    const gpa = parseFloat(document.getElementById("gpa").value);
    const major = document.getElementById("major").value.trim();
    const activities = document.getElementById("activities").value.trim();
    const awards = document.getElementById("awards").value.trim();

    // Section completeness
    const completeness = {
      "Personal Info": name.length > 0,
      "Academic Info": !isNaN(gpa) && gpa >= 0,
      "Major": major.length > 0,
      "Activities": activities.length > 0,
      "Awards": awards.length > 0
    };

    const completedSections = Object.values(completeness).filter(v => v).length;
    const totalSections = Object.keys(completeness).length;
    const percentComplete = Math.round((completedSections / totalSections) * 100);

    // Update progress bar
    document.getElementById("progressBar").style.width = percentComplete + "%";

    // Generate output summary
    let outputHtml = "<h3>Section Status</h3><ul>";
    for (let section in completeness) {
      outputHtml += `<li>${section}: ${completeness[section] ? "✔ Complete" : "✖ Needs attention"}</li>`;
    }
    outputHtml += "</ul>";

    document.getElementById("output").innerHTML = outputHtml;
  }

  // Initial update
  updateProgress();
});
