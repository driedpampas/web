document.addEventListener('DOMContentLoaded', function() {
    const bodyScripts = document.body.getElementsByTagName('script');
    if (bodyScripts && bodyScripts.length > 0) {
        while (bodyScripts.length > 0) {
            bodyScripts[0].parentNode.removeChild(bodyScripts[0]);
        }
    }

    const headLinks = document.head.getElementsByTagName('link');
    if (headLinks && headLinks.length > 0) {
        const lastLink = headLinks[headLinks.length - 1];
        if (lastLink.getAttribute('type') === 'text/css') {
            lastLink.parentNode.removeChild(lastLink);
        }
    }
});