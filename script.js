let steps = document.querySelectorAll(
  ".email-from, .email-subject, .email-greeting, .email-link, .email-footer"
);
let currentStep = 0;
let popupBox = document.getElementById("popup-box");
let helpText = document.getElementById("help-text");
let popupText = document.getElementById("popup-question");

function showPopup() {
  let element = steps[currentStep];
  let rect = element.getBoundingClientRect();
  popupBox.style.top = `${window.scrollY + rect.top}px`;
  popupBox.style.left = `${rect.left + rect.width + 10}px`;
  popupBox.style.display = "block";
  helpText.style.display = "none";

  element.classList.add("highlight");
}

function handleAnswer(answer) {
  let element = steps[currentStep];
  let feedback = "";

  if (element.classList.contains("email-from")) {
    if (answer === "safe") {
      feedback =
        "Incorrect. The sender's email address contains a " +
        "_" +
        ", while the ECCB's email domain contains a " -
        " eccb-centralbank.org.";
    } else {
      feedback =
        "Correct. The sender's email address contains a " +
        "_" +
        ", while the ECCB's email domain contains a " -
        " eccb-centralbank.org.";
    }
  } else if (element.classList.contains("email-subject")) {
    if (answer === "safe") {
      feedback =
        "Incorrect. The subject tries to create panic. This is a common phishing tactic.";
    } else {
      feedback =
        "Correct. The subject tries to create panic. This is a common phishing tactic.";
    }
  } else if (element.classList.contains("email-greeting")) {
    if (answer === "safe") {
      feedback =
        "Incorrect. The greeting is vague. Legitimate emails usually use your name.";
    } else {
      feedback =
        "Correct. The vague greeting is a red flag, indicating a possible phishing attempt.";
    }
  } else if (element.classList.contains("email-link")) {
    if (answer === "safe") {
      feedback =
        "Correct. The link seems okay, but always hover to check the actual URL before clicking.";
    } else {
      feedback =
        "Incorrect. The link seems okay, but always hover to check the actual URL before clicking.";
    }
  } else if (element.classList.contains("email-footer")) {
    if (answer === "safe") {
      feedback =
        "Correct. Attachments in suspicious emails can contain malware, so only open them if you're sure they're from a trusted source.";
    } else {
      feedback =
        "Incorrect. Attachments in suspicious emails can contain malware, so only open them if you're sure they're from a trusted source.";
    }
  }

  alert(feedback);

  element.classList.remove("highlight");

  currentStep++;
  if (currentStep < steps.length) {
    showPopup();
  } else {
    alert("You have completed the phishing email test!");
  }
}

function showHelp() {
  let element = steps[currentStep];
  let popupMessage = element.getAttribute("data-popup");
  helpText.querySelector("p").innerText = popupMessage;
  helpText.style.display = "block";
}

showPopup();
