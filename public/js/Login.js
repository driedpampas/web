document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/login', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Replace the form div with a message
                form.innerHTML = '<h2>You have logged in</h2>';
        
                // Wait for 5 seconds before redirecting
                setTimeout(function() {
                const meta = document.createElement('meta');
                meta.httpEquiv = 'refresh';
                meta.content = "5; URL='https://dry.nl.eu.org/shorten'";
                document.head.appendChild(meta);
            });
            } else {console.error('Login failed')}
        };

        xhr.send(formData);
    });
})