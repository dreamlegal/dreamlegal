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

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
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
      <Preview>Welcome to Dreamlegal, {name}!</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {name},</Heading>
        </Row>
        <Row>
          <Text>Excited for you to use our platform.</Text>
        </Row>
        <Row>
          <Text>
            You can view detailed legal tech product profiles across multiple
            categories.
          </Text>
          <Text>
            Check on the exhaustive product features, user and Industry-specific
            use cases.
          </Text>
        </Row>

        <Row>
          <Text>
            Log in to compare, save , share, and review your favorite products.
          </Text>
          <Text>
            P.S. We love hearing from users, hit me (or support) up with
            feedback or questions anytime.
          </Text>
        </Row>
        <Row>
          <Text>
            Ranjan Singhania
            <br />
            Co-Founder, DreamLegal
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
