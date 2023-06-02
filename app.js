
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res,) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  // console.log(req.body.Email);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.Email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us11.api.mailchimp.com/3.0/lists/9008b0f28c";
  const options = {
    method: "POST",
    auth: "SGeethma:fbe3ef2427436816d7fba1c5008e6b8c-us11",
  }

  const request = https.request(url, options, (response) => {

    if(response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    // response.on("data", (data) => {
    //   console.log(JSON.parse(data));
    // })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is Running on port 3000...");
});



// API KEY
// fbe3ef2427436816d7fba1c5008e6b8c-us11

// Audience ID
// 9008b0f28c