const divMsg = document.querySelector(".message");
const postCom = document.getElementById("postCom");
console.log(divMsg);

// Récupération id du message dans l'url
const str = window.location.href;
const url = new URL(str);
const postId = url.searchParams.get("id");
console.log(postId);

// Affichage du message
fetch(`//localhost:3000/api/post/${postId}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (post) {
    console.log(post.user_id);
    const message = document.createElement("p");
    message.innerHTML = `${post.content}`;
    divMsg.appendChild(message);
  });

// Envoi du commentaire
postCom.addEventListener("click", (e) => {
  let comment = document.getElementById("commentaire");

  fetch(`//localhost:3000/api/post/${postId}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (post) {
      console.log(post.user_id);
      // Création du commentaire à envoyer au server
      const newPost = {
        username: post.user_id,
        content: comment.value,
        post: postId,
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
});
