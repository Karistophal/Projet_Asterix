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
  timezone : 'UTC', 
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

const tokenCryptageClee = "les_2PiEDsD'ILIESsont576DELici3UX*"; 
function generateToken(user, admin) { 
  return jwt.sign({user : user, admin : admin}, tokenCryptageClee, { expiresIn: '20s', }); 
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
        if(user.adresse_mail === req.body.username && user.mot_de_passe === req.body.password) 
        { 
          const token = generateToken(user.user_id, user.admin); 
          console.log("Connexion réussie"); 
          trouve = true; 
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
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
      return res.status(403).json({ error: 'Token manquant' });
    }
  
    jwt.verify(token, tokenCryptageClee, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token invalide' });
      }
      req.user = decoded;
      next();
    });
  }

  app.get('/tokenVerify', verifyToken, (req, res) => { 
    res.status(200).json({ message: 'Token valide' });
  }); 


  // Route GET /attractions
app.get('/attraction', (req, res) => {
  // Requête SQL pour sélectionner toutes les attractions
  const sql = "SELECT nom, image, description, tailleMini, lieu FROM structure WHERE theme LIKE '%Montagnes Russes'";
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

    app.delete('/api/alertesDel/:id', (req, res) => {
      const id = req.params.id;
    
      // Delete the user from the database
      connection.query('DELETE FROM alerte WHERE id = ?', [id], (err, result) => {
        if (err) {
          console.error('Error:', err);
          res.status(500).json({ error: 'An error occurred while deleting the alert' });
        } else {
          res.status(200).json({ message: 'Alert deleted successfully' });
        }
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
  
  // Mes missions requete 
  app.get('/missions', verifyToken, (req, res) => {
    //recuperation de l'id de l'utilisateur dans le token 
    const user_id = req.user.user; 

    //requete pour recuperer les missions de l'utilisateur 
    connection.query('SELECT missiondujour.*, structure.image, structure.nom from missiondujour inner join poste on poste.poste_id = missiondujour.poste_id INNER JOIN equipe ON equipe.equipe_id = poste.equipe_id INNER JOIN utilisateur ON utilisateur.equipe_id = equipe.equipe_id inner join structure on missiondujour.structure = structure.id WHERE utilisateur.user_id = ?', [user_id], (err, results) => { 
      //si erreur       
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des missions de l\'utilisateur' });
    } else {
      res.status(200).json(results); 
    }
    });
  });

