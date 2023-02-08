const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    const blogId = document.querySelector('.is-blog').getAttribute('data-blog');
    console.log(blogId);
    if(comment){
        const response = await fetch('/api/comments',
        {
            method: 'POST',
            body: JSON.stringify({comment,blogId}),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace(`/blogs/${blogId}`);
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector('.comment-form')
    .addEventListener('submit',commentFormHandler);