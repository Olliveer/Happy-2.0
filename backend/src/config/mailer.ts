import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8381f3641c08a9",
        pass: "41b2a579efd328"
    }
});
console.log(process.env.MAIL_USER, process.env.MAIL_PASS)
const options = {
    viewEngine: {
        extName: '.html',
        partialsDir: path.join(__dirname, '../resources/mail/'),
        layoutsDir: path.join(__dirname, '../resources/mail/'),
        defaultLayout: ''
    },
    viewPath: path.join(__dirname, '../resources/mail/'),
    extName: '.html'
};

transport.use('compile', hbs(options));


// {
//     viewEngine: 'handlebars',
//     viewPath: path.join(__dirname, 'src/resources/mail'),
//     extName: '.html',
// }

export default transport;
