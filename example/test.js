const Nicemail = require('../index.js');
const path = require('path');

const emailConfig = {
    sender: 'Sender <abc@company.com>',
    host: 'smtp.gmail.com',
    port: '465',
    auth: {
        user: '',
        pass: ''
    }
};

const templateConfig = {
    dir: path.join(__dirname,'./template') ,
    type: 'hbs'
}

const nm = new Nicemail(emailConfig, templateConfig);

nm.send({
    template: 'simple',
    subject: 'Simple subject text',
    content: {
        title : 'This is title',
        header : 'This is header',
        body : 'Body Message'
    },
    to : ['abc@gmail.com']
})
    .then(res => console.log('Response: ', res))
    .catch(err => console.log('Errors: ', err));