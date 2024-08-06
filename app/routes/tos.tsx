import { createRoute } from "honox/factory"
import BoxContainer from "../components/boxtainer"

export default createRoute((c) => {
    return c.render(
        <>
        <BoxContainer style={{ padding: '20px', maxWidth: '100vw', flexDirection: 'row' }}>
            <h1>Terms of Service (effective 07 Aug 2024)</h1>
            <pre className="service">
                <ul>
                <li>
                    <b>Termination</b><br />
                    We reserve the right to terminate or suspend your access to the Service at our sole discretion, without notice or liability, for any reason, including if you breach these Terms.
                </li>
                <li>
                    <b>Limitation of Liability</b><br />
                    In no event shall <a href="https://dry.nl.eu.org">dry.nl.eu.org</a>, its affiliates, or their respective directors, employees, or agents be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of the Service.
                </li>
                <li>
                    <b>Changes to Terms</b><br />
                    We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website. Your continued use of the Service after the changes take effect constitutes your acceptance of the new Terms.
                </li>
                {/* <li>
                    Contact Information<br />
                    If you have any questions about these Terms, please contact us at <a href="mailto:[Your Contact Information]">[Your Contact Information]</a>.
                </li> */}
                </ul>
            </pre>
        </BoxContainer>
        <BoxContainer style={{ padding: '20px', maxWidth: '100vw', flexDirection: 'row', marginTop: '0.5em'}} sibling>
            <h1>Privacy Policy (effective 07 Aug 2024)</h1>
            <pre className="service">
                <ul>
                <li>
                    <b>Information We Collect</b><br />
                    No personal information (e.g. email address) is collected at this time. However we use cookies to enhance your experience while interacting with your account.
                </li>
                <li>
                    <b>Information Sharing and Disclosure</b><br />
                    We do not share your personal information with third-party services. We may disclose information if required by law or in response to valid requests by public authorities.
                </li>
                <li>
                    <b>Changes to this Policy</b><br />
                    We reserve the right to modify this Policy at any time. We will notify you of any changes by posting it here on our website. Your continued use of the Service after the changes take effect constitutes your acceptance of the new Policy.
                </li>
                </ul>
            </pre>

        </BoxContainer>
        </>,
        { title: 'Terms of Service',
            css: 'tos' }
    )
})