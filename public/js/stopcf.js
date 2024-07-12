document.addEventListener('DOMContentLoaded', function() {
    const bodyScripts = document.body.getElementsByTagName('script');
    if (bodyScripts && bodyScripts.length > 0) {
        while (bodyScripts.length > 0) {
            bodyScripts[0].parentNode.removeChild(bodyScripts[0]);
        }
    }
});