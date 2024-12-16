function displayMessage(message, callback) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = message;
    setTimeout(callback, 5000);
}

function fetchData(callback) {
    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => {
            document.getElementById('result').textContent = 'Error fetching data: ' + error.message;
        });
}

function displayPosts(data) {
    const resultDiv = document.getElementById('result');
    const posts = data.posts.map(post => post.title).join('\n');
    resultDiv.textContent = posts;
    resultDiv.style.whiteSpace = 'pre-line';
}

function handleClick() {
    displayMessage('Processing...', () => {
        displayMessage('Callback executed after 5 seconds', () => {
            fetchData(displayPosts);
        });
    });
}