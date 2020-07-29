const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");
const { resourceUsage } = require("process");
const { response } = require("express");
const { readdirSync } = require("fs");

const app = express();


//Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Signup Route

app.post('/signup', (req, res) => {
    const { firstName, lastName, email } = req.body;


    // Make sure filred are filled
    if (!firstName || !lastName || !email) {
        res.redirect('/fail.html');
        return;
    }

    // Constuct req data
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_field: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }


    const postData = JSON.stringify(data);

    const options = {
        url: 'https://us10.api.mailchimp.com/3.0/lists/92b8a28056',
        method: 'POST',
        headers: {
            Authorization: 'auth 8fa20137dea6be8c1d536e0719cce600-us10'
        },
        body: postData
    }

    request(options, (err, response, body) => {
    if(err) {
        res.redirect('/fail.html');
    } else {
        if(response.statusCode === 200 ) {
        res.redirect('/success.html');
        } else {
            res.redirect('/fail.html');
        }
    }

    });
});









//     request(options, function(err, response, body){
       

//     }

// })

const PORT = process.env.port || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
// })
