const twilio = require('twilio');

export default class TwilioService {
    accountSid: any;
    token: any;
    phoneNumber: any;
    sendMessages: boolean;

    constructor() {
        this.accountSid = process.env.TWILIO_ACC_SID;
        this.token = process.env.TWILIO_AUTH_TOKEN;
        this.phoneNumber = process.env.TWILIO_PHONE_NUM;
        this.sendMessages = process.env.TWILIO_SEND==="TRUE";
    }

    public async sendSMS(phoneNumber: string, body: string) {
        if (!this.sendMessages) return;
        const client = new twilio(this.accountSid, this.token);
        try{
            const message = await client.messages.create({
                body: body,
                to: phoneNumber,
                from: this.phoneNumber
            });
            console.log(`message sent to ${phoneNumber}, id: ${message.sid}`);
        } catch (e) {
            console.log(e)
        }
    }
}