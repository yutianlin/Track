const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send'
];
const TOKEN_PATH = 'token.json';

export default class GmailService {
    private gmail: any;
    private auth: any;

    constructor() {
        if (process.env.GMAIL_SEND !== "TRUE") return;
        this.gmail = this.authorize(process.env.GMAIL_CLIENT_SECRET, process.env.GMAIL_CLIENT_ID, process.env.GMAIL_REDIRECT_URI);
    }

    public async sendEmail(to: string, subject: string, body: string) {
        if (process.env.GMAIL_SEND !== "TRUE") return;
        const message = this.createMessage(process.env.GMAIL_SENDER, to, subject, body);

        const sentMessage = await this.gmail.users.messages.send({
            auth: this.auth,
            userId: 'me',
            resource: {
                raw: message
            }
        });
        console.log(`sent email to ${to}`);
        return sentMessage;
    }

    private createMessage(sender: any, to: any, subject: any, body: any) {
        var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
            "MIME-Version: 1.0\n",
            "Content-Transfer-Encoding: 7bit\n",
            "to: ", to, "\n",
            "from: ", sender, "\n",
            "subject: ", subject, "\n\n",
            body
        ].join('');

        var encodedMail = Buffer.from(str, 'utf-8').toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
            return encodedMail;
    }

    private authorize(clientSecret: any, clientId: any, redirectUri: any) {
        // const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            clientId, clientSecret, redirectUri);
        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err: any, token: any) => {
          if (err) return this.getNewToken(oAuth2Client);
          oAuth2Client.setCredentials(JSON.parse(token));
          return this.listLabels(oAuth2Client);
        });
      }

    private getNewToken(oAuth2Client: any) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        return rl.question('Enter the code from that page here: ', (code: any) => {
          rl.close();
          return oAuth2Client.getToken(code, (err: any, token: any) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err: any) => {
              if (err) return console.error(err);
              console.log('Token stored to', TOKEN_PATH);
            });
            return this.listLabels(oAuth2Client);
          });
        });
      }

    private listLabels(auth: any) {
        this.gmail = google.gmail({version: 'v1', auth});
        this.auth = auth;
        this.gmail.users.labels.list({
          userId: 'me',
        }, (err: any, res: any) => {
          if (err) return console.log('The API returned an error: ' + err);
        });
        return this.gmail.users.messages;
      }
}

