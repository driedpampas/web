import { createRoute } from "honox/factory";
import BoxContainer from "../../components/boxtainer";
import UserPane from "../../components/user/userpane";

export default createRoute(async (c) => {
    return c.render(
        <BoxContainer>
            <UserPane c={c} view='register' />
        </BoxContainer>,
        { title: 'Register',
            css: 'Account',
            inlineScript: `
window.onload = function() {
    const regElement = document.querySelector('.reg');
    if (regElement) {
        const parentElement = regElement.parentNode;

        if (parentElement) {
            const regHeight = regElement.offsetHeight;
            parentElement.style.paddingBottom = (regHeight + 10) + 'px';
        }
    }
};` }
    );
});