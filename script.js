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

//Command Palette

function initCommandPalette() {
  const palette = document.getElementById("command-palette");
  const input = document.getElementById("command-input");
  const list = document.getElementById("command-results");

  const commands = [
    {
      label: "About Me",
      keywords: ["about", "bio", "who"], 
      action: () => { 
        window.location.href = "about.html";
      }
    },
    {
      label: "View Projects",
      keywords: ["projects", "portfolio", "work"],
      action: () => {
        window.location.href = "projects.html";
      }
    }
  ]

  function render(items) {
    list.innerHTML = "";

    items.forEach((cmd, index) => {
      const li = document.createElement("li");
      li.textContent = cmd.label;

      li.addEventListener("click", () => {
        cmd.action();
        closePalette();
      });

      list.appendChild(li);
    });
  }

  function openPalette() {
    palette.classList.remove("hidden");
    palette.setAttribute("aria-hidden", "false");
    input.value = "";
    render(commands);
    input.focus();
  }

  function closePalette() {
    palette.classList.add("hidden");
    palette.setAttribute("aria-hidden", "true");
    input.blur();
  }

  input.addEventListener("input", () => {
    const value = input.value.toLowerCase();

    const filtered = commands.filter(cmd =>
      cmd.label.toLowerCase().includes(value) ||
      cmd.keywords.some(k => k.includes(value))
    );

    render(filtered);
  });

  input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const first = list.querySelector("li");
    if (first) first.click();
  }
});


  document.addEventListener("keydown", (e) => {
    // Open / close palette
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      palette.classList.contains("hidden")
        ? openPalette()
        : closePalette();
    }

    // Escape closes
    if (e.key === "Escape" && !palette.classList.contains("hidden")) {
      closePalette();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const headline = document.getElementById("headline");
  const description = document.getElementById("description");

  if (intro && headline && description) {
    const introText = intro.textContent;
    const headlineText = headline.textContent;
    const descriptionText = description.textContent;

    typeText(intro, introText, 40, () => {
      typeText(headline, headlineText, 55, () => {
        typeText(description, descriptionText, 20);
      });
    });
  }

  initCommandPalette();
});

