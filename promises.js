function fetchDataWithTimeout() {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Loading...';

    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new Error('Operation timed out'));
        }, 5000);

        fetch('https://dummyjson.com/posts')
            .then(response => response.json())
            .then(data => {
                clearTimeout(timeoutId);
                resolve(data);
            })
            .catch(error => {
                clearTimeout(timeoutId);
                reject(error);
            });
    });
}

function handleClick() {
    fetchDataWithTimeout()
        .then(data => {
            const resultDiv = document.getElementById('result');
            const posts = data.posts.map(post => post.title).join('\n');
            resultDiv.textContent = posts;
            resultDiv.style.whiteSpace = 'pre-line';
        })
        .catch(error => {
            document.getElementById('result').textContent = error.message;
        });
}