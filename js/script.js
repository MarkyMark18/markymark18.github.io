const path = "C:\\Users\\markh>";

// The lines of text to be 'typed out' by the page
const lines = [
  { text: "Second year Computer Science student at The University of Sheffield." },
  { text: "Check out my projects on GitHub", linkText: "GitHub", linkHref: "https://github.com/MarkyMark18/" },
  { text: "Find me on LinkedIn", linkText: "LinkedIn", linkHref: "https://www.linkedin.com/in/mark-harrison-2833a57a" },
  { text: "" }
]

function typeText(line, consoleElement) {
  
  // Set the minimum and maximum delay times between each character for the typing effect
  const min = 20;
  const max = 80;

  const { text, linkText, linkHref } = line;

  // Use a Promise to allow sequential typing using await
  return new Promise((resolve) => {

    let i=0;
    const cursor = document.getElementById("cursor");

    // Insert a new line and the path prefix
    cursor.insertAdjacentHTML("beforebegin", "<br>");
    cursor.insertAdjacentHTML("beforebegin", `<span class="path">${path}</span>`);

    // The function for typing the next character
    function typeNextChar() {

      if (i < text.length) {

        // Handle inserting the link into the text
        if (linkText && text.slice(i, i+linkText.length) === linkText) {
          const link = document.createElement("a");
          link.href = linkHref;
          link.textContent = linkText;
          cursor.insertAdjacentElement("beforebegin", link);
          i += linkText.length;
        } else {
          cursor.insertAdjacentText("beforebegin", text.charAt(i)) ;
          i++;
        }

        // Randomised delay between each character
        setTimeout(typeNextChar, Math.random() * (max - min) + min);

      } else {

        // The delay before starting a new line
        setTimeout(() => {       
          resolve();
        }, 500);
        
      }

    }

    typeNextChar();
  });
}

document.addEventListener("DOMContentLoaded", async () => {

  const consoleElement = document.getElementById("typed-text");

  for (const line of lines) {
    await typeText(line, consoleElement);
  }

});

