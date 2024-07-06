import { createRoute } from "honox/factory";
import BoxContainer from "../../components/boxtainer";
import UserPane from "../../components/user/userpane";

export default createRoute(async (c) => {
    return c.render(
        <BoxContainer>
            <UserPane c={c} view='login' />
        </BoxContainer>,
        { title: 'Login', inlineScript: `
window.onload = function() {
    const regElement = document.getElementById('reg');
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