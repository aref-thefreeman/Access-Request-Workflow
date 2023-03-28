# Access-Request-Workflow# Website Access Request System

This Google Sheets script allows you to manage website access requests submitted through a Google Form. The script automatically sends email notifications to the requestor and the security team, and updates the status of the request in the sheet.

## Getting Started

1. Create a Google Form to collect website access requests from users. The form should have the following fields: full name, email address, department, reason for access, and website name.

2. Create a Google Sheet to store the responses from the Google Form. The sheet should have the same fields as the form.

3. Open the Google Sheet and go to "Tools" > "Script editor".

4. Copy and paste the code from `code.gs` into the script editor.

5. Save the script and give it a name.

6. Go to "Resources" > "Current project's triggers".

7. Click the "Add Trigger" button and set up the trigger as follows:

   - Choose the `onEdit` function.
   - Choose "From spreadsheet" as the "Run" option.
   - Choose "On edit" as the "Events" option.

8. Click "Save" to create the trigger.

## Usage

1. When a user submits a website access request through the Google Form, the script will automatically send an email notification to the user and the security team.

2. The security team can update the status of the request by changing the value in the "Status" column of the Google Sheet. When the status is set to "Done", the script will automatically send an email to the user with the website access credentials. When the status is set to "Slack", the script will send a message to the user asking them to contact the security team through Slack.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
