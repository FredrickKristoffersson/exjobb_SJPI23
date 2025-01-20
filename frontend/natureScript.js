// Hitta elementet för ikonen
const icon = document.getElementById('icon');

// Lägg till eventlyssnare för att hantera hover
icon.addEventListener('mouseenter', () => {
    const light = document.querySelector('.right-light');
    light.style.opacity = '1'; // Visa orange ljus när man hovrar
});

icon.addEventListener('mouseleave', () => {
    const light = document.querySelector('.right-light');
    light.style.opacity = '0'; // Dölja ljuset när muspekaren lämnar
});


const saveButton = document.getElementById('savePost');
const allPostsDiv = document.getElementById('allPosts');

saveButton.addEventListener('click', async () => {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;

    if (!title || !content || !author) {
        alert('Alla fält måste fyllas i!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, author }),
        });

        if (response.ok) {
            alert('Inlägget har sparats!');
            loadPosts();
        } else {
            alert('Kunde inte spara inlägget');
        }
    } catch (error) {
        console.error('Error saving post:', error);
    }
});

async function loadPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts');
        const posts = await response.json();

        allPostsDiv.innerHTML = '';
        posts.forEach((post) => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <p><em>Författare: ${post.author}</em></p>
                <p><small>Skapad: ${new Date(post.createdAt).toLocaleString()}</small></p>
            `;
            allPostsDiv.appendChild(postDiv);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

loadPosts();
