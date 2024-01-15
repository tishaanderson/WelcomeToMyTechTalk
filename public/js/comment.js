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
  
