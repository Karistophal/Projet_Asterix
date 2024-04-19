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

function generateToken(user) {
  return jwt.sign({user : user}, '1234', { expiresIn: '120s', });
}

allUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM utilisateur', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Route pour l'authentification
app.post('/api/login', async (req, res) => {
  trouve = false;
    users = await allUsers();
    users.forEach(user => {
      console.log(req.body.username);
      console.log(req.body.password);
      console.log(user.adresse_mail);
      console.log(user.mot_de_passe)
      if(user.adresse_mail === req.body.username && user.mot_de_passe === req.body.password)
      {
        const token = generateToken(req.body.username);
        console.log("Connexion réussie");
        trouve = true;
        console.log(token);
        res.send({ token });
      }
    });
    if(trouve === false){
    console.log("Connexion échouée");
      res.send({ error: 'Email ou mot de passe incorrect' });
    }
  });

  app.delete('/api/comptesDel/:id', (req, res) => {
    const id = req.params.id;
  
    // Delete the user from the database
    connection.query('DELETE FROM utilisateur WHERE user_id = ?', [id], (err, result) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
      } else {
        res.status(200).json({ message: 'User deleted successfully' });
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

  // Route GET /admin/comptes
  app.get('/api/comptes', (req, res) => {
    // Requête SQL pour sélectionner toutes les attractions
    const sql = 'SELECT * FROM utilisateur';
  
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

    // Route GET /admin/alertes
    app.get('/api/alertes', (req, res) => {
      // Requête SQL pour sélectionner toutes les attractions
      const sql = 'SELECT * FROM alerte';
    
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
  const { email, password, teamId } = req.body;
  // Vérifier si l'email existe déjà dans la base de données
  connection.query('SELECT * FROM utilisateur WHERE adresse_mail = ?', [email], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la vérification de l\'email' });
    } else if (results.length > 0) {
      res.status(409).json({ error: 'Email déjà utilisé' });
    } else {
      // Insérer les données de l'utilisateur dans la base de données
      connection.query('INSERT INTO utilisateur (adresse_mail, mot_de_passe, equipe_id, admin) VALUES (?, ?, ?, 0)', [email, password, teamId], (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
        } else {
          // Get the newly created user
          connection.query('SELECT * FROM utilisateur WHERE adresse_mail = ?', [email], (err, results) => {
            if (err) {
              res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
            } else {
              res.status(201).json(results[0]); // Return the newly created user
            }
          });
        }
      });
    }
  });
});