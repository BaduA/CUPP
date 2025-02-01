import { ISendMailService } from "./ISendMailService";
var nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

export class SendMailService implements ISendMailService {
  private transporter = nodemailer.createTransport(smtpTransport({
    port: 465, // true for 465, false for other ports
    host: "mail.ecopmo.com",
    auth: {
      user: "noreply@ecopmo.com",
      pass: "Ecopmo101..",
    },
    secureConnection: false,
    tls: {
      rejectUnauthorized: false,
    },
  }));
  sendVerifyUserMail(email: string, code: string) {}
  async sendHelloMail(email: string) {
    const mailData = {
      from: "noreply@ecopmo.com", // sender address
      to: email, // list of receivers
      subject: "Welcome to ecompo!",
      html: "<html><body><b>Hey there! </b><br> This is our first message sent with Nodemailer<br/></body></html>",
    };
    var result = await this.transporter.sendMail(
      mailData,
      function (err: any, info: any) {
        if (err) console.log(err);
        else {
          console.log("sent");
          console.log(info);
        }
      }
    );
    console.log(result);
  }
}
