'use strict';

const Template = require('./lib/template')
const Email = require('./lib/email')

class NiceMail {

    constructor(emailConfig, templateConfig) {
        if( !emailConfig || !templateConfig || typeof(emailConfig) !== 'object' || typeof(templateConfig) !== 'object'  ) {
            throw 'Invalid parameters. Please pass both email and template config objects.';
        }
        try {
            this.email = new Email(emailConfig);
            this.templates = new Template(templateConfig);
        } catch (err) {
            console.error('Missing or wrong configurations.')
            throw err; 
        }
    }

    send(options) {
        if( !this.email || !this.templates ) {
            return Promise.reject('Missing or wrong configurations.')
        }
        return this.email.send(options, this.templates);
    }
}

module.exports = NiceMail;