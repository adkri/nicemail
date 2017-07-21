'use strict';

const path = require('path');
const fs = require('fs');
const pug = require('pug');
const ejs = require('ejs');
const handlebars = require('handlebars');

class Template {
    
    constructor(templateConfig) {
        this.templateConfig = templateConfig;
        if(!templateConfig.dir || !templateConfig.type) {
            throw 'Template path or type not specified.'
        }

        this.templateType = this.templateConfig.type.trim();
        this.templatePath = this.templateConfig.dir || path.join(process.cwd(), 'templates')
        this.initTemplates(this.templateConfig.dir,this.templateConfig.type)

    }

    initTemplates(dir, type) {
        try {
            const files = fs.readdirSync(dir)

            this.files = files.reduce((acc,file) => {
                if(file.split('.')[1] === type) {
                    const fileName = file.split('.')[0];                        
                    const fileContent = fs.readFileSync(path.join(dir, file), 'utf-8');

                    acc[fileName] = fileContent;
                    return acc;
                }
            }, {});
        }catch(err) {
            throw err;
        }
    }

    getTemplate(options) {
        if(!options.template || typeof(options.template) !== 'string') {
            return null;
        }
        if(!this.files || !this.files[options.template]) {
            return null;
        }
        
        let data;

        switch(this.templateType) {
        case 'jade' || 'pug':
            data = this.compilePug(this.files[options.template],options.content) 
            break;
        case 'ejs':
            data = this.compileEjs(this.files[options.template],options.content) 
            break;
        case 'hbs':
            data = this.compileHbs(this.files[options.template],options.content) 
            break;
        default:
            data = null 
            break;
        }

        return data;
    }

    compilePug(template, locals) {        
        // Compile a function
        var fn = pug.compile(template);

        // Render the function
        var html = fn(locals);

        return html;
    }

    compileEjs(template, locals) {
        // Compile a function      
        var fn = ejs.compile(template);

        // Render the function        
        var html = fn(locals);

        return html;        
    }

    compileHbs(template, locals) {
        // Compile a function      
        var fn = handlebars.compile(template);

        // Render the function        
        var html = fn(locals);

        return html;
    }
}

module.exports = Template;