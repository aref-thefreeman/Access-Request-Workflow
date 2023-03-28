function onSubmit(e) {
  Logger.log(e);
  Logger.log(JSON.stringify(e));
  var sheet = e.range.getSheet();
  var row = e.range.getRow();
  var email = sheet.getRange(row, 3).getValue(); // Email column is the third column
  var fullName = sheet.getRange(row, 2).getValue(); // Full Name column is the second column
  var department = sheet.getRange(row, 4).getValue(); // Department Name column is the fourth column
  var reason = sheet.getRange(row, 5).getValue(); // Reason column is the fifth column
  var websiteName = sheet.getRange(row, 6).getValue(); // Website Name column is the sixth column

  var recipient = email;
  var subject = "Website Access Request - " + websiteName;
  var message = "Hello " + fullName + ",\n\n" +
                "Your request for access to " + websiteName + " has been received. We will review your request and get back to you soon.\n\n" +
                "Thank you,\n" +
                "The Cyber Security Team";
  MailApp.sendEmail(recipient, subject, message, {noReply: true});

  var recipient = ""; //email here
  sheetURL = "" //sheet url here
  var subject = "New Website Access Request - " + websiteName;
  var message = "Hello,\n\n" +
              "A new website access request has been received for " + websiteName + ".\n\n" +
              "Full Name: " + fullName + "\n" +
              "Email: " + email + "\n" +
              "Department: " + department + "\n" +
              "Reason: " + reason + "\n" +
              "Please provide the website password in the Google Sheet: " + sheetURL  + "\n\n" +
            "Thank you,\n" +
            "The Cyber Security Team";
MailApp.sendEmail(recipient, subject, message, {noReply: true});
}


function onEdit(e) {
  var range = e.range;
  var sheet = range.getSheet();
  var row = range.getRow();
  var column = range.getColumn();

  // Check if the edit was made in the "Status" column
  if (column == 8 && sheet.getName() == "Form Responses 1") {
    var status = sheet.getRange(row, column).getValue();

    // Check if the status is "Done"
    if (status.toLowerCase() == "done") {
      sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground("#00FF00")
      var email = sheet.getRange(row, 3).getValue(); // Email column is the third column
      sendEmailOnPasswordProvided(row, email);
    }
    // Check if the status is "Slack"
    else if (status.toLowerCase() == "slack") {
            sheet.getRange(row, 1, 1, sheet.getLastColumn()).setBackground("#E69318")

      var email = sheet.getRange(row, 3).getValue(); // Email column is the third column
      sendSlackMessage(email);
    }
  }
}

function sendEmailOnPasswordProvided(row, recipientEmail) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var fullName = sheet.getRange(row, 2).getValue(); // Full Name column is the second column
  var websiteName = sheet.getRange(row, 6).getValue(); // Website Name column is the sixth column
  var password = sheet.getRange(row, 7).getValue(); // Password column is the seventh
