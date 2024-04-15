// document.addEventListener("DOMContentLoaded", function () {
//   function redactText(text, wordsToRedact, replacement) {
//     // Ensure text and wordsToRedact are initialized
//     text = text || "";
//     wordsToRedact = wordsToRedact || [];

//     var sentences = text.split(/[.!?]/); // Split the text into sentences
//     var changedWords = []; // Array to store changed words
//     var changedTo = []; // Array to store corresponding replacements

//     sentences.forEach(function (sentence, index) {
//       var words = sentence.split(/\s+/); // Split the sentence into words

//       words.forEach(function (word) {
//         if (wordsToRedact.includes(word.toLowerCase())) {
//           changedWords.push(word); // Store the changed word
//           changedTo.push(replacement); // Store the corresponding replacement
//         }
//       });
//     });

//     return {
//       sentences: sentences,
//       changedWords: changedWords,
//       changedTo: changedTo,
//     };
//   }

//   function displayResults(result) {
//     var resultContainer = document.getElementById("result-container");
//     resultContainer.innerHTML = "<h2>Results:</h2>";

//     // Display original sentences
//     result.sentences.forEach(function (sentence, index) {
//       resultContainer.innerHTML +=
//         "<p><strong>Sentence " +
//         (index + 1) +
//         ":</strong> " +
//         sentence.trim() +
//         "</p>";
//     });

//     // Display changed words and corresponding replacements
//     if (result.changedWords.length > 0) {
//       resultContainer.innerHTML +=
//         "<p><strong>Changed Words:</strong> " +
//         result.changedWords.join(", ") +
//         "</p>";
//       resultContainer.innerHTML +=
//         "<p><strong>Changed To:</strong> " +
//         result.changedTo.join(", ") +
//         "</p>";
//     } else {
//       resultContainer.innerHTML += "<p>No words were changed.</p>";
//     }
//   }

//   document
//     .getElementById("redact-form")
//     .addEventListener("submit", function (event) {
//       event.preventDefault();

//       var text = document.getElementById("text").value;
//       var wordsToRedactInput = document.getElementById("words").value;
//       var wordsToRedact = wordsToRedactInput.split(",").map(function (word) {
//         return word.trim().toLowerCase();
//       });
//       var replacement = document.getElementById("replacement").value;

//       var result = redactText(text, wordsToRedact, replacement);
//       displayResults(result);
//     });
// });

// UNCOMMENT FROM HERE
// ############################

document.addEventListener("DOMContentLoaded", function () {
  function redactText(text, wordsToRedact, replacement) {
    // Ensure text and wordsToRedact are initialized
    text = text || "";
    wordsToRedact = wordsToRedact || [];

    var sentences = text.split(/[.!?]/); // Split the text into sentences
    var changedWords = []; // Array to store changed words
    var changedTo = []; // Array to store corresponding replacements
    var modifiedSentences = []; // Array to store modified sentences

    sentences.forEach(function (sentence) {
      var words = sentence.split(/\s+/); // Split the sentence into words
      var modifiedWords = []; // Array to store modified words

      words.forEach(function (word) {
        if (wordsToRedact.includes(word.toLowerCase())) {
          modifiedWords.push(replacement); // Store the corresponding replacement
          changedWords.push(word); // Store the changed word
          changedTo.push(replacement); // Store the corresponding replacement
        } else {
          modifiedWords.push(word); // Store the original word
        }
      });

      modifiedSentences.push(modifiedWords.join(" ")); // Join modified words to form the modified sentence
    });

    return {
      sentences: sentences,
      changedWords: changedWords,
      changedTo: changedTo,
      modifiedSentences: modifiedSentences,
    };
  }

  function displayResults(result) {
    var resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = "<h2>Results:</h2>";

    // Display original sentences
    result.modifiedSentences.forEach(function (sentence, index) {
      resultContainer.innerHTML +=
        "<p><strong>Sentence " +
        (index + 1) +
        ":</strong> " +
        sentence.trim() +
        "</p>";
    });

    // Display changed words and corresponding replacements
    if (result.changedWords.length > 0) {
      resultContainer.innerHTML +=
        "<p><strong>Changed Words:</strong> " +
        result.changedWords.join(", ") +
        "</p>";
      resultContainer.innerHTML +=
        "<p><strong>Changed To:</strong> " +
        result.changedTo.join(", ") +
        "</p>";
    } else {
      resultContainer.innerHTML += "<p>No words were changed.</p>";
    }
  }

  document
    .getElementById("redact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var text = document.getElementById("text").value;
      var wordsToRedactInput = document.getElementById("words").value;
      var wordsToRedact = wordsToRedactInput.split(",").map(function (word) {
        return word.trim().toLowerCase();
      });
      var replacement = document.getElementById("replacement").value;

      var startTime = performance.now();
      var result = redactText(text, wordsToRedact, replacement);
      var endTime = performance.now();
      var elapsedTime = ((endTime - startTime) / 1000).toFixed(2);

      displayResults(result);

      // Display time taken to process the text
      document.getElementById("time-taken").textContent =
        "Time taken: " + elapsedTime + " seconds";
    });
});
