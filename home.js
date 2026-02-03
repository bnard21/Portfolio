const intro = document.getElementById("intro");
const headline = document.getElementById("headline");
const description = document.getElementById("description");

const introText = intro.textContent;
const headlineText = headline.textContent;
const descriptionText = description.textContent;

function typeText(el, text, speed, done) {
  let i = 0;

  // clear text before typing starts
  el.textContent = "";
  el.style.visibility = "visible";

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  el.appendChild(cursor);

  function typeChar() {
    if (i < text.length) {
      el.textContent = text.slice(0, i + 1);
      el.appendChild(cursor);
      i++;
      setTimeout(typeChar, speed);
    } else {
      // start next section immediately
      if (done) done();

      // clean up cursor after
      cursor.remove();
    }
  }

  typeChar();
}

window.addEventListener("DOMContentLoaded", () => {
  typeText(intro, introText, 40, () => {
    typeText(headline, headlineText, 55, () => {
      typeText(description, descriptionText, 20);
    });
  });
});