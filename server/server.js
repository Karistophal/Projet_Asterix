const express=require('express');
const app=express();
const mysql=require('mysql');
const port=3333;
const cors=require('cors');
const bodyParser=require('body-parser');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbasterix'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données : ', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})

// Route pour l'authentification
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    connection.query('SELECT adresse_mail, mot_de_passe FROM utilisateur WHERE adresse_mail = ?', [email], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des données utilisateur' });
      } else if (results.length === 0 || results[0].password !== password) {
        res.status(401).json({ error: 'Email ou mot de passe incorrect' });
      } else {
        const token = jwt.sign({ email: results[0].email }, '1234', { expiresIn: '1h' });
        res.json({ token });
      }
    });
  });
  
  // Middleware pour protéger les routes privées
  function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ error: 'Token manquant' });
    }
  
    jwt.verify(token, '1234', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token invalide' });
      }
      req.user = decoded;
      next();
    });
  }
  
  // Exemple de route privée
  app.get('/profile', verifyToken, (req, res) => {
    res.json({ message: 'Route protégée', user: req.user });
  });

  // Route GET /attractions
app.get('/attraction', (req, res) => {
  // Requête SQL pour sélectionner toutes les attractions
  const sql = 'SELECT nom, image, description, tailleMini FROM attraction';

  // Exécution de la requête SQL
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête SQL : ', err);
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }

    // Renvoyer les résultats de la requête au format JSON
    res.json(results);
  });
});

  // Route pour l'inscription
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    // Vérifier si l'email existe déjà dans la base de données
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la vérification de l\'email' });
      } else if (results.length > 0) {
        res.status(409).json({ error: 'Email déjà utilisé' });
      } else {
        // Insérer les données de l'utilisateur dans la base de données
        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, result) => {
          if (err) {
            res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
          } else {
            res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
          }
        });
      }
    });
  });
