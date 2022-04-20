const buttonPost = document.getElementById("btn_message");
const allMessages = document.getElementById("allMessages");
const addComment = document.querySelector(".allMessages");

// Récupération id de l'item dans l'url
const str = window.location.href;
console.log(str);
const userid = str.split("?");
console.log(userid[1]);

// Affichage des messages
fetch(`//localhost:3000/api/post`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    value.forEach((message) => {
      const divMsg = document.createElement("div");
      divMsg.setAttribute("class", "msg");
      allMessages.appendChild(divMsg);
      const ahref = document.createElement("a");
      ahref.setAttribute("href", `${message.content}`);
      ahref.innerHTML = `${message.content}`;
      divMsg.appendChild(ahref);
      //   console.log(message.content);
    });
  });

// Affichage des commentaires
fetch(`//localhost:3000/api/comment`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    value.forEach((comment) => {
      const divCom = document.createElement("div");
      divCom.setAttribute("class", "com");

    });
  });


// Envoi des commentaires
addComment.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.parentNode.classList[0] === "msg") {
    const div = document.createElement("div");
    div.setAttribute("class", "com");
    e.target.appendChild(div);
    const textarea = document.createElement("textarea");
    textarea.setAttribute("id", "commentaire");
    div.appendChild(textarea);
    const btnCom = document.createElement("button");
    btnCom.setAttribute("type", "button");
    btnCom.textContent = "Poster commentaire";
    div.appendChild(btnCom);
    btnCom.addEventListener("click", (e) => {
      console.log("ca marche !!!");
      let postComment = document.getElementById("commentaire");
      console.log(postComment.value);

      // Création du commentaire à envoyer au server
      const newPost = {
        username: userid[1],
        content: postComment.value,
        post: "????????????????",
      };
      console.log(newPost);

      // Envoi du login au server
      fetch("//localhost:3000/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })
        .then((res) => res.json())
        .catch((err) => {
          alert("Erreur :" + err.message);
        });

    });
  }
});

buttonPost.addEventListener("click", () => {
  //Récupération des données du formulaire message
  let postMessage = document.getElementById("post");
  console.log(postMessage);

  // Création du post à envoyer au server
  const newPost = {
    content: postMessage.value,
    username: userid[1],
  };
  console.log(newPost);

  // Envoi du login au server
  fetch("//localhost:3000/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((res) => res.json())
    .catch((err) => {
      alert("Erreur :" + err.message);
    });
});
