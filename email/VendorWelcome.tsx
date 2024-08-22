import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
  } from "@react-email/components";
  
  interface WelcomeEmailProps {
    email: string;
    password: string;
  }
  
  export default function VendorWelcome({ email, password }: WelcomeEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Welcome to Our Service!</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Welcome to our Dreamlegal, {email}!</Preview>
        <Section>
          <Row>
            <Heading as="h2">Hello {email},</Heading>
          </Row>
          <Row>
            <Text>
              Welcome to our service! We’re excited to have you on board. 
              Here at Dreamlegal, we strive to provide the best experience for our users.
            </Text>
          </Row>
          <Row>
            <Text>
              Here are your credentials to get started:
              <ul>
                <li><strong>Email:</strong> {email}</li>
                <li><strong>Password:</strong> {password}</li>
              </ul>
            </Text>
          </Row>
          <Row>
            <Text>
              To get started, you might want to check out the following:
              <ul>
                <li><a href="https://dreamlegal.in">Our Website</a></li>
              </ul>
            </Text>
          </Row>
          <Row>
            <Text>
              If you have any questions or need assistance, feel free to reply to this email or contact our support team.
            </Text>
          </Row>
          <Row>
            <Text>
              Best regards,<br />
              The Dreamlegal Team
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }
