module.exports.home = function (req, res) {
    res.render('index', {title: 'habeshamingle'});
};

module.exports.register = function (req, res) {
  res.render('register');
};

module.exports.login = function (req, res) {
  res.render('login');
};