const buttonPost = document.getElementById("btn_message");

// Affichage des messages

fetch(`//localhost:3000/api/post/${getAllPosts}`)

buttonPost.addEventListener("click", () => {
  //Récupération des données du formulaire message
  let postMessage = document.getElementById("post");
  console.log(postMessage);

  // Création du signup à envoyer au server
  const newPost = {
    content: postMessage.value,
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
