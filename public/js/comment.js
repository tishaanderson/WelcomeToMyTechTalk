// const postCommentHandler = async (event) => {
//     event.preventDefault();

//     const text = document.querySelector('.textarea').value.trim();
//     const blogId = req.params.id;

//     if (text && blogId) {
//         try {
//             const response = await fetch(`/blog/${blogId}/comments`, {
//                 method: 'POST',
//                 body: JSON.stringify({ text }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.ok) {

//             }

//             res.status(201).json({ message: 'Comment created successfully!' });
//         } catch (error) {
//             res.status(500).json({ message: 'Failed to create comment.' });
//         }
//     }
// }

// Event listener for posting comments
// document.getElementById('postCommentBtn').addEventListener('click', async (event) => {
//     event.preventDefault();

//     const text = document.querySelector('.textarea').value.trim();
//     const blogId = req.params.id; // You'll need to get the blog ID here

//     try {
//         const response = await fetch(`/blog/${blogId}/comments`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ text })
//         });

//         if (response.ok) {
//             // If the comment was posted successfully, update the UI to display the new comment
//             // Fetch and display all comments for the blog
//             fetchAndDisplayComments(blogId);
//         } else {
//             console.error('Failed to post comment');
//         }
//     } catch (error) {
//         console.error('Error posting comment:', error);
//     }
// });

const postComment = async (event) => {
    event.preventDefault();
    console.log(event);
    const commentText = document.querySelector('#comment-text').value.trim();
    const blogId = window.location.href.split('/').pop(); // Extract the blog ID from the URL
  
    if (commentText) {
      try {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({ text: commentText, blog_id: blogId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          // Refresh the comment section after successful posting
          console.log(response);
          const data = await response.json();
          console.log(data);

            document.location.replace(`/blog/${blogId}`)
     
        } else {
          alert('Failed to post comment');
        }
      } catch (error) {
        console.error('Error posting comment:', error);
        alert('Failed to post comment');
      }
    } else {
      alert('Please enter a comment before posting');
    }
  };
  
  document
    .querySelector('#comment-form')
    .addEventListener('submit', postComment);
  
