document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('b1').addEventListener('click', function(event) {
        event.preventDefault();
        const username = window.username;
        fetch('/me/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(username)}`,
        });
    });
    
    document.getElementById('b2').addEventListener('click', function(event) {
        event.preventDefault();
        const username = window.username;
        fetch('/me/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `username=${encodeURIComponent(username)}`,
        });
    });
})