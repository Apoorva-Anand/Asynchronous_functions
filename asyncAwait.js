async function fetchData() {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Loading...';

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('https://dummyjson.com/posts', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        const data = await response.json();
        const posts = data.posts.map(post => post.title).join('\n');
        resultDiv.textContent = posts;
        resultDiv.style.whiteSpace = 'pre-line';
    } catch (error) {
        if (error.name === 'AbortError') {
            resultDiv.textContent = 'Request timed out';
        } else {
            resultDiv.textContent = `Error: ${error.message}`;
        }
    }
}

async function handleClick() {
    await fetchData();
}