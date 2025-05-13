import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import Link from 'next/link';

const ConfirmOrderEmailTemplate = ({
  orderId,
}: {
  orderId: string;
}) => {

  return (
    <Html>
    <Head />
    <Preview>Потвърждение на поръчката</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src={`https://winetime.bg/wine-logo.jpg`}
            width="202"
            height="57"
            alt="winetime"
          />
        </Section>
        
        <Section style={heroSection}>
          <Heading style={heading}>Наздраве за вашата поръчка!</Heading>
          <Text style={subheading}>
            Вашето изискано вино скоро ще бъде на път към вас.
          </Text>
        </Section>
        
        <Section style={orderInfoSection}>
          <Row>
          <Column>
            <Text style={labelText}>Номер на поръчката</Text>
            <Link href={`https://winetime.bg/account/orders/${orderId}`} passHref>
              <Text style={valueText}>{orderId}</Text>
            </Link>
          </Column>
            <Column>
              <Img
                src={`https://winetime.bg/wine.png`}
                width="40"
                height="40"
                alt="winetime"
              />
            </Column>
          </Row>
        </Section>
        
        <Hr style={divider} />
        
        <Section style={wineJourneySection}>
          <Heading as="h2" style={sectionHeading}>Вашето винено пътешествие</Heading>
          <Row>
            <Column style={journeyStep}>
              <Img
                src={`https://winetime.bg/order-package.jpg`}
                width="80"
                height="80"
                alt="winetime"
              />
              <Text style={stepText}>Поръчка направена</Text>
            </Column>
            <Column style={journeyStep}>
              <Img
                src={`https://winetime.bg/wine.png`}
                width="80"
                height="80"
                alt="winetime"
              />
              <Text style={stepText}>Вино избрано</Text>
            </Column>
            <Column style={journeyStep}>
              <Img
                src={`https://winetime.bg/quality.png`}
                width="80"
                height="80"
                alt="winetime"
              />
              <Text style={stepText}>Проверка на качеството</Text>
            </Column>
            <Column style={journeyStep}>
              <Img
                src={`https://winetime.bg/courier.png`}
                width="60"
                height="40"
                alt="winetime"
              />
              <Text style={stepText}>Изпращане</Text>
            </Column>
          </Row>
        </Section>
        
        <Hr style={divider} />
        
        <Section style={ctaSection}>
          <Link href={`https://winetime.bg/account/orders/${orderId}`} style={ctaButton}>Проследете поръчката си</Link>
        </Section>
        
        <Hr style={divider} />
        
        <Section style={footerSection}>
          <Text style={footerText}>
            Имате въпроси? Не се колебайте да се свържете с нас.
          </Text>
          <Text style={footerText}>
            (Моля, не отговаряйте директно на този имейл.)
          </Text>
          <Text style={copyrightText}>
            © 2023 Winetime. Всички права запазени.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
  );
};

export default ConfirmOrderEmailTemplate;

const main = {
  backgroundColor: '#f9f9f9',
  fontFamily: 'Helvetica, Arial, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const logoSection = {
  padding: '20px 30px',
  textAlign: 'center' as const,
};

const heroSection = {
  backgroundColor: '#7e2e2e',
  color: '#ffffff',
  borderRadius: '4px 4px 0 0',
  padding: '35px 40px',
  textAlign: 'center' as const,
};

const heading = {
  fontSize: '30px',
  lineHeight: '1.3',
  fontWeight: '700',
  margin: '0 0 15px',
};

const subheading = {
  fontSize: '18px',
  lineHeight: '1.4',
  margin: '0',
};

const orderInfoSection = {
  backgroundColor: '#ffffff',
  padding: '30px 40px',
};

const labelText = {
  fontSize: '14px',
  color: '#666666',
  margin: '0 0 5px',
};

const valueText = {
  fontSize: '18px',
  fontWeight: '700',
  color: '#000000',
  margin: '0',
};

const wineBottleImage = {
  float: 'right' as const,
};

const divider = {
  borderColor: '#e6e6e6',
  margin: '0',
};

const wineJourneySection = {
  backgroundColor: '#ffffff',
  padding: '30px 40px',
  textAlign: 'center' as const,
};

const sectionHeading = {
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 20px',
};

const journeyStep = {
  padding: '0 10px',
};

const stepText = {
  fontSize: '14px',
  color: '#666666',
  margin: '10px 0 0',
};

const ctaSection = {
  backgroundColor: '#ffffff',
  padding: '30px 40px',
  textAlign: 'center' as const,
};

const ctaButton = {
  backgroundColor: '#7e2e2e',
  color: '#ffffff',
  fontSize: '16px',
  textDecoration: 'none',
  padding: '12px 30px',
  borderRadius: '4px',
  fontWeight: '700',
  display: 'inline-block',
};

const footerSection = {
  textAlign: 'center' as const,
  padding: '30px 40px',
};

const footerText = {
  fontSize: '14px',
  color: '#666666',
  margin: '0 0 10px',
};

const copyrightText = {
  fontSize: '12px',
  color: '#999999',
  margin: '20px 0 0',
};