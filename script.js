function toggleNavbar() {
    var x = document.getElementById("navbar-links");
    if (x.className === "") {
      x.className = "show";
    } else {
      x.className = "";
    }
  }
  
  function redactText() {
    var text = document.getElementById("text").value;
    var wordsToRedact = document.getElementById("words").value.split(" ");
    var replacement = document.getElementById("replacement").value || "*";
  
    var redactedText = redactText(text, wordsToRedact, replacement);
  
    // Display results
    var resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = `
      <h2>Redacted Text:</h2>
      <p>${redactedText}</p>
      <h2>Statistics:</h2>
      <p>Words Scanned: ${wordsToRedact.length}</p>
      <p>Matched Words: ${countMatchedWords(text, wordsToRedact)}</p>
      <p>Characters Scrambled: ${countCharactersScrambled(text, wordsToRedact)}</p>
    `;
  }
  
  function redactText(text, wordsToRedact, replacement) {
    return text
      .split(" ")
      .map(word => wordsToRedact.includes(word.toLowerCase()) ? replacement.repeat(word.length) : word)
      .join(" ");
  }
  
  function countMatchedWords(text, wordsToRedact) {
    return text.split(" ").filter(word => wordsToRedact.includes(word.toLowerCase())).length;
  }
  
  function countCharactersScrambled(text, wordsToRedact) {
    return text
      .split(" ")
      .filter(word => wordsToRedact.includes(word.toLowerCase()))
      .reduce((total, word) => total + word.length, 0);
  }
  