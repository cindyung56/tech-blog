// button variables
const commentBtn = document.querySelector('#add-comment');
const submitBtn = document.querySelector('#submit-comment');

// get postID of post (Comment requires postID)
const postID = parseInt(window.location.href[window.location.href.length - 1]);

// ------------------------- FUNCTIONS

// display form to create a new comment, hide div that shows all comments
const displayCommentForm = () => {
    document.querySelector('#create-comment-div').style.display = "block";
    document.querySelector('#comments-div').style.display = "none";
}

// display div that shows all comments, hide form to create a new one (default)
const displayCommentList = () => {
    document.querySelector('#create-comment-div').style.display = "none";
    document.querySelector('#comments-div').style.display = "block";
}

// function that creates a new comment on a post
const createCommentOnPost = async(event) => {
    event.preventDefault();

    const comment = document.querySelector('textarea').value;
    if (comment){
        const response = await fetch("/api/comment/", {
            method: "POST",
            body: JSON.stringify({ 'content': comment, "post_id": postID }),
            headers: { "Content-Type": "application/json" },
          });

          if (response.ok){
            
            displayCommentList();
            document.location.replace(`/post/${postID}`);
          } else{
            alert(response.statusText);
          }
    }
}

// ------------------------- EVENT LISTENERS

commentBtn.addEventListener('click', displayCommentForm);
submitBtn.addEventListener('click', createCommentOnPost);