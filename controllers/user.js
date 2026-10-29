import User from '../models/user.js';
import Admin from '../models/admin.js';

const login = (req, res, next) => {
    let msg = req.session.err || "";
    req.session.err = "";
    res.render('login', { user: req.session.user || "", message: msg })
}
const logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/login')
}
const auth = (req, res, next) => {
    const data = {
        username: req.body.username,
        password: req.body.password,
    };
    req.session.err = "";
    Admin.findOne({ where: { username: data.username } }).then(results => {
        if (!results) {
            User.findOne({ where: { username: data.username } }).then(results => {
                if (!results) {
                    req.session.err = 'Incorrect email or password.';
                    res.redirect('/login')
                }
                else if (data.password != results.password) {
                    req.session.err = 'Incorrect password.';
                    res.redirect('/login')
                }
                else {
                    req.session.user = results;
                    res.redirect('/dashboard')
                }
            }).catch(err => {
                req.session.err = err;
                res.redirect('/login')
            });
        }
        else {
            if (data.password != results.password) {
                req.session.err = 'Incorrect password.';
                res.redirect('/login')
            }
            else {
                req.session.admin = results;
                res.redirect('/admin')
            }
        }
    })
}

export default { login, logout, auth};