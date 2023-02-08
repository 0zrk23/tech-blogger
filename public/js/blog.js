const blogFormHandler = async (event) => {
    event.preventDefault();
    // alert('this works')
    const blogTitle = document.querySelector('#title').value.trim();
    const blogContent = document.querySelector('#content').value.trim();
    // alert([blogTitle,blogContent,]);
    if(blogTitle && blogContent){
        const response = await fetch('/api/blogs',
        {
            method: 'POST',
            body: JSON.stringify({
                title: blogTitle,
                content: blogContent,
            }),
            headers: { 'Content-Type': 'application/json' },
        })

        // alert(JSON.stringify(response));
        if (response.ok) {
            console.log(response);
            window.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector('.blog-form')
    .addEventListener('submit',blogFormHandler);



const blogDeleteFormHandler = async (event) => {
    event.preventDefault();
    // // alert('here');
    if(event.target.hasAttribute('data-delete-id')){
        const blog_id = event.target.getAttribute('data-delete-id');
        alert(blog_id);
    }
}

document
    .querySelector('.blog-list')
    .addEventListener('click',blogDeleteFormHandler);