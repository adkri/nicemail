'use strict';

const nodemailer = require('nodemailer');
const util = require('util');

class Email {

    constructor(emailConfig) {
        this.emailConfig = emailConfig;
        this.emailConfig.port = parseInt(this.emailConfig.port)
        this.transporter = nodemailer.createTransport(this.emailConfig,{
            from: emailConfig.sender,
        });
    }

    send(options, template) {
        return new Promise( (resolve, reject) => {
            try {

                if( options.attachments && !util.isArray(options.attachments)) {
                    throw 'Attachments should be in an array.'
                }

                const tempHtml = template.getTemplate(options);
                if(!tempHtml) {
                    return reject('Error generating template. Make sure template exist');
                }
                console.log(tempHtml)
                const  message = {
                    subject: options.subject,
                    html: tempHtml,
                    attachments: options.attachments || [],
                    replyTo: options.replyTo || this.emailConfig.sender
                };

                ['to', 'bcc', 'cc']. forEach(type => {
                    if(options[type] && util.isArray(options[type])) {
                        message[type] = options[type].reduce( (all, receipent) => {
                            return all + receipent + ', '
                        }, '');
                    }
                })

                this.transporter.sendMail( message, (error, info) => {
                    if (error) {
                        return reject(error.message)
                    }
                    resolve('Message sent successfully!')
                    // transporter.close();
                });
            } catch (e) {
                reject(e)
            }
        });
    }
}

module.exports = Email;