var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://habeshamingle.herokuapp.com";
}



module.exports.home = function (req, res) {
    res.render('index', {title: 'habeshamingle'});
};

module.exports.register = function (req, res) {
  renderRegisterForm(req, res)
};

var renderRegisterForm = function (req, res){
    res.render('register', {
       error: req.query.err
    });
};

module.exports.doRegister = function (req, res) {

    console.log(req.body);

    var path = "/api/register";
    var postData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    var requestOptions = {
        url: apiOptions.server + path,
        method: "POST",
        json: postData
    };
    if (!postData.name || !postData.email || !postData.password) {
        res.redirect('/register?err=val');
    }else{
        request(
            requestOptions,
            function (err, response, body) {
                if (response.statusCode === 200) {
                    res.redirect('/login');
                }else if (response.statusCode === 400 && body.name && body.name === "ValidationError") {
                    console.log(body);
                }else{
                    _showError(req, res, response.statusCode);
                }
            }
        );
    }
};

module.exports.login = function (req, res) {
  res.render('login');
};


var _showError = function (req, res, status) {
    var title, content;
    if (status === 404) {
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    } else if (status === 500) {
        title = "500, internal server error";
        content = "How embarrassing. There's a problem with our server.";
    } else {
        title = status + ", something's gone wrong";
        content = "Something, somewhere, has gone just a little bit wrong.";
    }
    res.status(status);
    res.render('generic-text', {
        title : title,
        content : content
    });
};