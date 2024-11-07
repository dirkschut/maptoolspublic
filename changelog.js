var generateChangelog = function () {
  var html = "";
  changeLog.forEach((element) => {
    html += `<div class="changelog">`;
    html += `<h2>${element.version} - ${element.date}</h2>`;
    html += `<ul>`;
    element.changes.forEach((change) => {
      html += `<li>${change}</li>`;
    });
    html += `</ul>`;
    html += `</div>`;
  });
  document.getElementById("changelog").innerHTML = html;
};
