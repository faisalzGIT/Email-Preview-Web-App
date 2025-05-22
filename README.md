# Email Management Program (EMP)

A modern web application Built with Node.js, Express, EJS, Tailwind CSS, and integrates with the Gmail API for authentication and email preview.

## Features
- **Google OAuth2 Authentication**: Securely sign in with your Gmail account.
- **Email Preview**: View a list of your recent emails with sender, subject, and snippet.
- **Label Overview**: See counts for Inbox, Unread, Starred, Sent, Spam, Trash, and Drafts.
- **Modern UI**: Clean, responsive design using Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm
- A Google Cloud project with Gmail API enabled

### Installation
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Email-Preview-Web-App
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory with the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   GMAIL_CLIENT_ID=your_google_client_id
   GMAIL_CLIENT_SECRET=your_google_client_secret
   GMAIL_REDIRECT_URI=your_google_redirect_uri
   ```
4. **Build Tailwind CSS:**
   ```sh
   npm run tail
   ```
   (Keep this running in a separate terminal for live CSS updates.)

5. **Start the server:**
   ```sh
   npm run dev
   ```

6. **Open in your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure
```
Email-Preview-Web-App/
├── app.js                # Main Express app
├── package.json
├── public/               # Static assets (Tailwind CSS)
├── routes/
│   └── emailRoutes.js    # Email-related routes
├── src/
│   └── gmailService.js   # Gmail API logic
├── views/                # EJS templates
│   ├── authBtnPage.ejs   # Login page
│   └── impPage.ejs       # Inbox page
└── .env                  # Environment variables (not committed)
```

## Usage
- Click "Authenticate and Authorize your Gmail to Proceed" on the login page.
- Grant access to your Gmail account.
- View your inbox and label stats in a modern dashboard.

## Customization
- Update UI in `views/` and styles in `public/input.css` (Tailwind).
- Extend backend logic in `src/gmailService.js`.