#NodeMailer


###An easy to use nodejs mailing library with integration for different templates

> npm install --save nicemail

## Requirements
 * Node.js >=  6.11.0
 * ECMAScript >= 6

## Usage

```javascript
const Nicemail = require('nicemail');
const path = require('path');

const emailConfig = {
    sender: 'Sender <abc@company.com>',   // sender email
    host: 'smtp.gmail.com',
    port: '465',
    auth: {
        user: '',
        pass: ''
    }
};

const templateConfig = {
    dir: path.join(__dirname,'./template') ,
    type: 'hbs'         //  template type (also supports ejs and jade templates)
}

const nm = new Nicemail(emailConfig, templateConfig);
const receipents = ['abc@gmail.com','bcd@gmail.com'];

nm
  .send({
    template: 'simple',             // template name
    subject: 'Simple subject text', // email subject
    content: {                      // template locals
        title : 'This is title',
        header : 'This is header',
        body : 'Body Message'
    },
    to : receipents.join(',')    // comma seperated email recipients
  })
  .then(res => console.log('Response: ', res))
  .catch(err => console.log('Errors: ', err));

```

***templates/simple.hbs:***
```html
<div>
 {{ title }}
 <h6>{{ header }}</h6>
 <p>{{ body }}</p>
</div>
```

####Other templates

***templates/simple.pug:***
```html
.div
	#{ title }
	h6 #{ header }
	p #{ body } 
```
***templates/simple.ejs:***
```html
<div>
 <%= title %>
 <h6><%= header %></h6>
 <p><%= body %></p>
</div>
```