function onSubmit(e) {
  Logger.log(e);
  Logger.log(JSON.stringify(e));
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  
  var fullName = sheet.getRange(row, 2).getValue(); // Full Name column is the third column
  var email = sheet.getRange(row, 3).getValue(); // Email column is the fourth column
  var department = sheet.getRange(row, 4).getValue(); // Department Name column is the fifth column
  var reason = sheet.getRange(row, 5).getValue(); // Reason column is the sixth column
  var websiteType = sheet.getRange(row, 7).getValue(); // Website Type column is the seventh column
  var websiteName = sheet.getRange(row, 6).getValue(); // Website Name column is the eighth column
  var teamLeaderOrSupervisor = sheet.getRange(row, 8).getValue(); // Website Name column is the eighth column

  var recipient = email;
  var subject = "Website Access Request - " + websiteName;
  var message = "Hello " + fullName + ",\n\n" +
                "Your request for access to " + websiteName + " has been received. We will review your request and get back to you soon.\n\n" +
                "Thank you,\n" +
                "The Cyber Security Team";
  MailApp.sendEmail(recipient, subject, message, {noReply: true});

  var recipient = "emon@staffasia.org";
  var ccRecipient = "shakif@staffasia.org";

  sheetURL = "https://docs.google.com/spreadsheets/d/1DBMLkn5qBJQdiWeMsdmh4n9IUTd2jBYdvetlJd15Wbw/edit?resourcekey#gid=345184498"
  var subject = "New Website Access Request - " + fullName + "(" + department + ")";
  var message = "Hello,\n\n" +
              "A new website access request has been received for " + websiteName + ".\n\n" +
              "Name: " + fullName + "\n" +
              "Email: " + email + "\n" +
              "Department: " + department + "\n" +
              "Team Leader/ Supervisor: " + teamLeaderOrSupervisor + "\n" +
              "Reason: " + reason + "\n" +
              "Wesbiste Type: " + websiteType + "\n" +
              "Please provide the website password, user name & then set the status in the Google Sheet: " + sheetURL  + "\n\n" +
            "Thank you,\n" +
            "The Cyber Security Team";
MailApp.sendEmail(recipient, subject, message, {cc: ccRecipient, noReply: true});
}
function onEdit(e) {
  var range = e.range;
  var sheet = range.getSheet();
  var row = range.getRow();
  var column = range.getColumn();

  // Check if the edit was made in the "Status" column
  if (column == 11 && sheet.getName() == "Form Responses 1") {
    var status = sheet.getRange(row, column).getValue();

    // Check if the status is "Slack"
    if (status.toLowerCase() == "slack") {
      sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground("#E69318");

      var email = sheet.getRange(row, 3).getValue(); // Email column is the third column
      sendSlackMessage(email);
    }

    // Check if the status is "Done" and website type is "our sites"
    else if (status.toLowerCase() == "done" && sheet.getRange(row, 7).getValue().toLowerCase() == "our sites") {
      sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground("#00FF00");

      var email = sheet.getRange(row, 3).getValue(); // Email column is the third column
      var username = sheet.getRange(row, 10).getValue(); // Username column is the 10th column
      var password = sheet.getRange(row, 9).getValue(); // Password column is the 9th column
      sendEmailOnPasswordProvided(row, email, username, password);
    }

    // Check if the status is "Done" and website type is "others"
    else if (status.toLowerCase() == "done" && sheet.getRange(row, 7).getValue().toLowerCase() == "others") {
      sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground("#00FF00");

      var email = sheet.getRange(row, 3).getValue(); // Email column is the third column
      var username = sheet.getRange(row, 10).getValue(); // Username column is the 10th column
      var password = sheet.getRange(row, 9).getValue(); // Password column is the 9th column
      sendEmailOnPasswordProvided(row, email, username, password);
    }
  }
}

function sendSlackMessage(recipientEmail) {
  var message = "Please leave a message in the slack for the access you requested. Thanks for your patience.";
  MailApp.sendEmail(recipientEmail, "Website Access Status Update", message, {noReply: true});
}

function sendEmailOnPasswordProvided(row, recipientEmail, username, password) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var fullName = sheet.getRange(row, 2).getValue(); // Full Name column is the second column
  var websiteName = sheet.getRange(row, 6).getValue(); // Website Name column is the sixth column
  var websiteType = sheet.getRange(row, 7).getValue(); // Website Type column is the seventh column

  // Check if the website type is valid
  if (websiteType.toLowerCase() == "our sites") {
    username = recipientEmail;
    password = sheet.getRange(row, 9).getValue(); // Password column is the 9th column
  } else if (websiteType.toLowerCase() == "others") {
    username = sheet.getRange(row, 10).getValue(); // Username column is the 10th column
    password = sheet.getRange(row, 9).getValue();
  // Password column is the eighth column
}

var subject = "Website Access Status Update - " + websiteName;
var message = "Hi " + fullName + ",\n\n";
message += "Your access to " + websiteName + " is now ready. Please use the following credentials to log in:\n\n";
message += "Username: " + username + "\n";
message += "Password: " + password + "\n\n";
message += "Thanks for your patience and let us know if you encounter any issues.\n\n";
message += "Best regards,\n";
message += "The Cyber Security Team";

MailApp.sendEmail(recipientEmail, subject, message, {noReply: true});
}





