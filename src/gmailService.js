const { google } = require("googleapis");
const { head } = require("../routes/emailRoutes");
const OAuth2 = google.auth.OAuth2;

const oAuth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

//1
const authenticateGmail = (req, res) => {

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.send'
    ],
    prompt: 'consent',
    include_granted_scopes: true,
    enable_granular_consent: true
  });
  res.redirect(authUrl);
};

//2
const handleGmailCallback = async (req, res) => {
  try {
    const code = req.query.code; // Extract the authorization code
    // console.log(code)

    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(code); 
    // Set the tokens for future API calls
    oAuth2Client.setCredentials(tokens); 

    // console.log("THIS IS Callback after the Authorization!!!!!!!")
    // console.log("Access Token:", tokens.access_token);
    // console.log("Refresh Token:", tokens.refresh_token);
    
    //initialize the Gmail API client in Node.js
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    
    //getting user's email address preview
    const myProfile = await gmail.users.getProfile({ userId: "me" });
    const myGmailDetails = {
      myEmailAddress: myProfile.data.emailAddress
    };
    // console.log(myProfile.data.emailAddress)

    //code for getting all the Label's Numbers like Inbox:20, Spam:30, etc
    const getLabelCount = async (labelId) => {
      const label = await gmail.users.labels.get({ userId: "me", id: labelId });
      return {
        name: label.data.name,
        totalMessages: label.data.messagesTotal,
        unreadMessages: label.data.messagesUnread
      };
    };

    const labelsToFetch = ["INBOX", "UNREAD", "STARRED", "SENT", "SPAM", "TRASH", "DRAFT"];2
    const labelCounts = await Promise.all(
      labelsToFetch.map(async (label) => await getLabelCount(label))
    );
    // console.log(labelCounts);


    //Now getting data of the emails
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 100,
    });
    const messages = response.data.messages;
    // console.log("Message" + response.data.messages)

    // Create an array to store email details
    const emailDetails = [];

    // Fetch subject and ID for each message
    for (const message of messages) {
      const messageDetails = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });

      const snippet = messageDetails.data.snippet;
      const snippetWords = snippet.split(" ");
      const shortSnippet = snippetWords.slice(0, 8).join(" ") + (snippetWords.length > 8 ? " ..." : "");

      const headers = messageDetails.data.payload.headers;

      // Find the "Subject" header
      const from = headers.find(header => header.name === "From")?.value || "No From";
      const subjectHeader = headers.find(header => header.name === "Subject")?.value || "No Subject"; 


      emailDetails.push({
        id: message.id,
        sender:from,
        subject: subjectHeader,
        threadId: message.threadId,
        emailSnippet:shortSnippet,
      });
      // console.log(emailDetails)
    }

    //short email message preview in the list template

    res.render("impPage", { myGmailDetails, labelCounts, emailDetails });
    // res.send('<a href="/emails/gmail/list">Gmail List</a>');
  } catch (error) {
    // console.error("Error exchanging code for tokens:", error);
    res.status(500).send("Fail");
    // console.log(error)
  }
};



//3
const listGmailEmails = async (req, res) => {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    // Render the list with email details (only one render)
    res.render("listOfGmails", { emails: emailDetails });

  } catch (error) {
    // console.error("Error fetching emails:", error);
    res.status(500).send("Error fetching emails.");
  }
};



module.exports = {
  authenticateGmail,
  handleGmailCallback,
  listGmailEmails,
};
