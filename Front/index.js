const buttonSign = document.getElementById("btn_signup");
const buttonLog = document.getElementById("btn_login");

buttonSign.addEventListener("click", () => {
  //Récupération des données du formulaire signup
  let signUsername = document.getElementById("sign_username");
  let signEmail = document.getElementById("sign_email");
  let signPassword = document.getElementById("sign_password");

  // Création du signup à envoyer au server
  const newUser = {
    username: signUsername.value,
    email: signEmail.value,
    password: signPassword.value,
  };
  console.log(newUser);

  // Envoi du signup au server
  if (newUser.username && newUser.email && newUser.password != null) {
    fetch("//localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((value) => {
        document.location.href = "signup.html";
      })
      .catch((err) => {
        alert("Erreur :" + err.message);
      });
    console.log("utilisateur enregistré dans la db");
  } else {
    window.alert("Veuillez renseigner tous les champs");
  }
});

buttonLog.addEventListener("click", () => {
  //Récupération des données du formulaire signup
  // let logEmail = document.getElementById("log_email");
  let logUsername = document.getElementById("log_username");

  let logPassword = document.getElementById("log_password");

  // Création du login à envoyer au server
  const logUser = {
    // email: logEmail.value,
    username: logUsername.value,

    password: logPassword.value,
  };
  console.log(logUser);

  // Envoi du login au server
  fetch("//localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logUser),
  })
    .then((res) => res.json())
    .then((value) => {
      console.log(value);
      if (value.token != null) {
        // document.location.href = "logged.html";
        document.location = `logged.html?${logUser.username}`;
      } else {
        window.alert("utilisateur non reconnu");
      }
    })
    .catch((err) => {
      alert("Erreur :" + err.message);
    });
});
