window.onload = function() {
    const regElement = document.querySelector('.reg');
    const parentElement = regElement.parentNode;
    if (regElement && parentElement) {
        const regHeight = regElement.offsetHeight;
        parentElement.style.paddingBottom = (regHeight + 10) + 'px';
    }
};