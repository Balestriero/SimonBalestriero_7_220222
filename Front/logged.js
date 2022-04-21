const buttonPost = document.getElementById("btn_message");
const allMessages = document.getElementById("allMessages");

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
  .then(function (allPosts) {
    // console.log(allPosts);
    allPosts.forEach((post) => {
      //   console.log(post);
      const divMsg = document.createElement("div");
      divMsg.setAttribute("class", "msg");
      allMessages.appendChild(divMsg);
      const ahref = document.createElement("a");
      ahref.setAttribute("href", `message.html?id=${post.postID}`);
      ahref.innerHTML = `${post.content}`;
      divMsg.appendChild(ahref);
      const divCom = document.createElement("div");
      divCom.setAttribute("id", `${post.postID}`);
      divMsg.appendChild(divCom);
      //   console.log(post.user_id);
    });
  });

// Affichage des commentaires
fetch(`//localhost:3000/api/comment`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (allComs) {
    allComs.forEach((comment) => {
      console.log(comment);
      const postCible = document.getElementById(`${comment.post_id}`);
      const com = document.createElement("p");
      com.innerHTML = `${comment.content}`;
      postCible.appendChild(com);
    });
  });

// Poster un message
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
