import { createRoute } from "honox/factory"
import BoxContainer from "../components/boxtainer"

export default createRoute((c) => {
    return c.render(
        <BoxContainer>
            <h1>Terms of Service</h1>
            <h3 style={{ color: "black" }}>
            Welcome to [dry.nl.eu.org] ("Service"). By using the Service, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.
            <ul>
                <li>Acceptance of Terms<br />
                By accessing or using the Service, you agree to be bound by these Terms. If you do not agree with these Terms, you must not use the Service.</li>
                
                <li>Description of Service<br />
                [dry.nl.eu.org] provides users with the ability to shorten URLs. The Service is provided on an "as is" and "as available" basis.</li>
                
                <li>User Responsibilities<br />
                    <ul>
                        <li>You agree to use the Service only for lawful purposes.</li>
                        <li>You are responsible for maintaining the confidentiality of your account information.</li>
                        <li>You must not misuse the Service by transmitting any malware, spam, or any other harmful or illegal content.</li>
                    </ul>
                </li>
                
                <li>Prohibited Uses<br />
                    <ul>
                        <li>Creating or linking to harmful, malicious, or illegal content.</li>
                        <li>Using the Service to violate any applicable local, state, national, or international law.</li>
                        <li>Interfering with or disrupting the Service or servers.</li>
                    </ul>
                </li>
                
                <li>Termination<br />
                We reserve the right to terminate or suspend your access to the Service at our sole discretion, without notice or liability, for any reason, including if you breach these Terms.</li>
                
                <li>Limitation of Liability<br />
                In no event shall [dry.nl.eu.org], its affiliates, or their respective directors, employees, or agents be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of the Service.</li>
                
                <li>Changes to Terms<br />
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our website. Your continued use of the Service after the changes take effect constitutes your acceptance of the new Terms.</li>
                
                {/*<li>Contact Information<br />
                If you have any questions about these Terms, please contact us at [Your Contact Information].</li>*/}
            </ul>
            </h3>
        </BoxContainer>
    )
})