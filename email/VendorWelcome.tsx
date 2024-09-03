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
    name: string;
  }
  
  export default function VendorWelcome({ name }: WelcomeEmailProps) {
    return (
      <Html lang="en" dir="ltr">
      <Head>
        <title>Welcome to DreamLegal {name}!</title>
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
      <Preview>Welcome to DreamLegal!</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello,</Heading>
        </Row>
        <Row>
          <Text>
            Excited for you to be listed on our platform.
          </Text>
        </Row>
        <Row>
          <Text>
            Now that you have logged in and created a profile, list your legal tech product through the "Add product" tab on your dashboard. (Add product guide attached for your reference)
          </Text>
        </Row>
        <Row>
          <Text>
            Check on the analytics and know user behavior for your product.
          </Text>
        </Row>
        <Row>
          <Text>
            Keep calm, we are coming up with more analytics soon!
          </Text>
        </Row>
        <Row>
          <Text>
            P.S. We love hearing from legal tech companies, hit me (or support) up with feedback or questions anytime.
          </Text>
        </Row>
        <Row>
          <Text>
            Best regards,<br />
            Ranjan Singhania<br />
            Co-Founder, DreamLegal<br />
            <a href="mailto:ranjan@dreamlegal.in">ranjan@dreamlegal.in</a>
          </Text>
        </Row>
      </Section>
    </Html>
    
    );
  }
