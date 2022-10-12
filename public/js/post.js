// button variables
const addPostBtn = document.querySelector("#add-post");
const createPostBtn = document.querySelector("#create-post");
const updatePostBtn = document.querySelector("#update-post");
const deletePostBtn = document.querySelector("#delete-post");

// container variables
const yourPostsContainer = document.querySelector("#your-posts");
const editDeleteContainer = document.querySelector("#edit-or-delete");

// will be the ID of whatever post has been chosen
let postId;

// ------------------------- FUNCTIONS

// display div to create a new post, hide other divs
function displayCreatePostDiv() {
  document.querySelector("#create-post-div").style.display = "block";
  yourPostsContainer.style.display = "none";
  editDeleteContainer.style.display = "none";
}

// display all existing posts, hide other divs
function displayAllUserPosts() {
  document.querySelector("#create-post-div").style.display = "none";
  yourPostsContainer.style.display = "block";
  editDeleteContainer.style.display = "none";
}

// display the form to edit or delete a post, hide other divs
function displayEditOrDeletePost(event) {
  event.stopPropagation();

  const e = event.target; // event delegation

  const allUserPosts = document.querySelectorAll(".user-post");
  for (let i = 0; i < allUserPosts.length; i++) {
    if (allUserPosts[i].contains(e)) {
      document.querySelector("#create-post-div").style.display = "none";
      document.querySelector("#your-posts").style.display = "none";
      editDeleteContainer.style.display = "block";

      const id = allUserPosts[i].getAttribute("data-id");
      console.log(id);
      postId = id; // keep track of which ID this post has
      getPostInfo(); // call code to send a GET request, and update the form
    }
  }
}

// get post info and display on edit/delete form
const getPostInfo = async () => {
  const response = await fetch(`/api/post/${postId}`, {
    method: "GET",
  });

  const data = await response.json(); // gets the data from the post

  //updates the text areas with the existing post's title and content
  document.querySelector("#edit-post-title").textContent = data.title;
  document.querySelector("#edit-post-content").textContent = data.content;
};

// create a new post from form
const createNewPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#new-post-title").value.trim();
  const content = document.querySelector("#new-post-content").value.trim();

  if (title && content) {
    const response = await fetch("/api/post/", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      displayAllUserPosts();
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

// update existing post
const updatePost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#edit-post-title").value.trim();
  const content = document.querySelector("#edit-post-content").value.trim();

  if (title && content) {
    const response = await fetch(`/api/post/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok){
        displayAllUserPosts();
        document.location.replace("/dashboard");
    } else{
        alert(response.statusText);
    }
  }
};

// delete existing post
const deletePost = async (event) => {
  const response = await fetch(`/api/post/${postId}`, {
    method: "DELETE"
  });

  if (response.ok){
    displayAllUserPosts();
    document.location.replace("/dashboard");
} else{
    alert(response.statusText);
}
};

// ------------------------- EVENT LISTENERS
addPostBtn.addEventListener("click", displayCreatePostDiv);
yourPostsContainer.addEventListener("click", displayEditOrDeletePost);
createPostBtn.addEventListener("click", createNewPost);
updatePostBtn.addEventListener("click", updatePost);
deletePostBtn.addEventListener("click", deletePost);
