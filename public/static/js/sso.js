window.onload = function() {
    let Element = document.querySelector('.reg').parentNode;
    if (Element) {
        Element.style.paddingBottom = document.querySelector('.reg').offsetHeight + 'px';
    }
};