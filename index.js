import express from "express";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import Product from "./models/product.js";
import User from "./models/user.js";
import user_controller from './controllers/user.js'
import admin_controller from './controllers/admin.js';
import session from 'express-session';


const file = fileURLToPath(import.meta.url);
const dir = dirname(file);

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'ini adalah kode secret###',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get("/login", user_controller.login);
app.get("/logout", user_controller.logout);
app.post("/login", user_controller.auth);



app.get("/", (req, res) => {
    // res.sendFile(dir + "/index.html");
    Product.findAll().then((results) => {
        res.render('index', { products: results || "" });
    });
    
});

app.get("/index", (req, res) => {
    // res.sendFile(dir + "/index.html");
    res.render('index');
    
});


//ADMIN ROUTE
app.get('/admin', admin_controller, (req, res) => {
    Product.findAll().then((results) => {
        res.render('admin/admin', { products: results, admin: req.session.admin || "" });
    });
})

app.get("/dashboard", (req, res) => {
    // res.sendFile(dir + "/index.html");
    res.render('dashboard', {user:req.session.user || ""});
    
});

app.get('/create', admin_controller, (req, res) => {
    res.render('create');
})
app.get('/edit/:id', admin_controller, (req, res) => {
    Product.findOne({ where: { id: req.params.id } }
    ).then((results) => {
        res.render('edit', { product: results });
    })
})
app.post('/api/products', admin_controller, (req, res) => {
    Product.create({ name: req.body.name, price: req.body.price }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})
app.put('/api/product/:id', admin_controller, (req, res) => {
    Product.update({ name: req.body.name, price: req.body.price },
        { where: { id: req.params.id } }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})
app.delete('/api/product/:id', admin_controller, (req, res) => {
    Product.destroy({ where: { id: req.params.id } }
    ).then(() => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 500, error: err, Response: {} });
    })
})

// app.get("/login", (req, res) => {
//     // res.send("Hello")
//     // res.sendFile(dir + "/login.html");
//     res.render('login');
// });

app.post('/api/users',(req, res) => {
    User.create({ username: req.body.username, password: req.body.password }
    ).then((results) => {
        res.json({ status: 200, error: null, Response: results });
    }).catch(err => {
        res.json({ status: 502, error: err });
    })
})

app.get("/register", (req, res) => {
    // res.send("Hello")
    // res.sendFile(dir + "/create.html");
    res.render('register');
});

app.get("/shopCard", (req, res) => {
    // res.send("Hello")
    // res.sendFile(dir + "/shopCard.html");
    res.render('shopCard');
});

app.listen(port, () => {
    console.log(`${hostname}:${port}`);
});
