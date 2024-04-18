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
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
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

  
  // Mes missions requete 
  app.get('/missions', verifyToken, (req, res) => {
    const userEmail = req.user.adresse_mail;

    connection.query('SELECT missiondujour.* FROM missiondujour INNER JOIN poste ON poste.poste_id = missiondujour.poste_id INNER JOIN equipe ON equipe.equipe_id = poste.equipe_id INNER JOIN utilisateur ON utilisateur.equipe_id = equipe.equipe_id WHERE utilisateur.adresse_mail = ?', [userEmail], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des missions de l\'utilisateur' });
      } else {
        res.status(200).json(results); 
      }
    });
});

// Mes missions requete 
app.get('/missionstest', (req, res) => {

  connection.query("SELECT m.id AS mission_id, m.type_mission, m.id_objet, m.date, m.description, CASE WHEN m.type_mission = 'attraction' THEN a.image WHEN m.type_mission = 'boutique' THEN b.image WHEN m.type_mission = 'billeterie' THEN bi.image WHEN m.type_mission = 'accueil' THEN ac.image ELSE NULL END AS image FROM missiondujour m LEFT JOIN attraction a ON m.type_mission = 'attraction' AND m.id_objet = a.id LEFT JOIN boutique b ON m.type_mission = 'boutique' AND m.id_objet = b.id LEFT JOIN billeterie bi ON m.type_mission = 'billeterie' AND m.id_objet = bi.id LEFT JOIN accueil ac ON m.type_mission = 'accueil' AND m.id_objet = ac.id WHERE m.id = 1", (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des missions de l\'utilisateur', err });
    } else {
      res.status(200).json(results); 
    }
  });
});


