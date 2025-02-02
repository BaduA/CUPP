import { ISendMailService } from "./ISendMailService";
var nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

export class SendMailService implements ISendMailService {
  private transporter = nodemailer.createTransport(
    smtpTransport({
      port: 465, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: "batualpustaguel@gmail.com",
        pass: "yibd luoq ercj iigk",
      },
      secureConnection: true,
    })
  );
  sendVerifyUserMail(email: string, code: string) {
    const mailData = {
      from: "batualpustaguel@gmail.com", // sender address
      to: email, // list of receivers
      subject: "ECOPMO",
      html: `<html><body><h1>Hey ecopmo'lu!</h1><br>Aşağıdaki kodu hesabını doğrulamak için kullan.<br/><h2>${code}<h2/></body></html>`,
    };
    var result = this.transporter.sendMail(
      mailData,
      function (err: any, info: any) {
        if (err) console.log(err);
        else {
          console.log("sent");
        }
      }
    );
    console.log(result);
  }
  sendVerifyForgotPassword(email: string, code: string) {
    const mailData = {
      from: "batualpustaguel@gmail.com", // sender address
      to: email, // list of receivers
      subject: "ECOPMO",
      html: `<html><body><h1>Hey ecopmo'lu!</h1><br>Aşağıdaki kodu şifreni değiştirmek için kullan.<br/><h2>${code}<h2/></body></html>`,
    };
    var result = this.transporter.sendMail(
      mailData,
      function (err: any, info: any) {
        if (err) console.log(err);
        else {
          console.log("sent");
        }
      }
    );
    console.log(result);
  }
  async sendHelloMail(email: string) {
    const mailData = {
      from: "batualpustaguel@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Welcome to ecompo!",
      html: "<html><body><b>Hey there! </b><br> This is our first message sent with Nodemailer<br/></body></html>",
    };
    var result = this.transporter.sendMail(
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
