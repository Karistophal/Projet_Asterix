import '../../App.css';

function Authentification() {
  return (
      <div className="bodyy">
        <div className="buttonWrapper">
          <div className="CarreArrondiTahLesInfos">

            <div class="zoneEntree">
                <input type="text" class="inputAuth UsernameEntry" id="inputUsername" name="username" required />
                <span>Nom d'utilisateur</span>
            </div>

            <div class="zoneEntree">
                <input type="text" class="inputAuth PasswordEntry" id="inputPassword" name="password" required />
                <span>Mot de passe</span>
            </div>

          </div>
        </div>
      </div>
  );
}

export default Authentification;