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

const NewOrderEmailTemplate = ({
  orderId,
}: {
  orderId: string;
}) => {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://winetime.bg';

  return (
    <Html>
      <Head />
      <Preview>Нова поръчка</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={message}>
            <Img
              src={`${baseUrl}/wine-logo.jpg`}
              width='202'
              height='57'
              alt='winetime'
              style={{ margin: 'auto' }}
            />
            <Heading style={global.heading}>Имате нова поръчка!</Heading>
            <Text style={{ ...global.text, marginTop: 24 }}>
              Вие получихте нова поръчка, която е готова за обработка.
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row style={{ display: 'inline-flex gap-16', marginBottom: 40 }}>
              <Column style={{ width: 170 }}>
                <Text style={global.paragraphWithBold}>Номер на поръчката</Text>
                <a 
                  href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/orders/${orderId}`} 
                  style={track.number}
                >
                  {orderId}
                </a>
              </Column>
            </Row>
          </Section>

          <Hr style={global.hr} />

          <Section style={paddingY}>
            <Row>
              <Text
                style={{
                  ...footer.text,
                  paddingTop: 30,
                  paddingBottom: 30,
                }}
              >
                Моля, обработете поръчката възможно най-скоро.
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                 Winetime © Всички права запазени.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewOrderEmailTemplate;

const paddingX = {
  paddingLeft: '40px',
  paddingRight: '40px',
};

const paddingY = {
  paddingTop: '22px',
  paddingBottom: '22px',
};

const paragraph = {
  margin: '0',
  lineHeight: '2',
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
  heading: {
    fontSize: '32px',
    lineHeight: '1.3',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '-1px',
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: '#747474',
    fontWeight: '500',
  },
  button: {
    border: '1px solid #929292',
    fontSize: '16px',
    textDecoration: 'none',
    padding: '10px 0px',
    width: '220px',
    display: 'block',
    textAlign: 'center',
    fontWeight: 500,
    color: '#000',
  } as React.CSSProperties,
  hr: {
    borderColor: '#E5E5E5',
    margin: '0',
  },
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '10px auto',
  width: '600px',
  maxWidth: '100%',
  border: '1px solid #E5E5E5',
};

const track = {
  container: {
    padding: '22px 40px',
    backgroundColor: '#F7F7F7',
  },
  number: {
    margin: '12px 0 0 0',
    fontWeight: 500,
    lineHeight: '1.4',
    color: '#6F6F6F',
  },
};

const message = {
  padding: '40px 74px',
  textAlign: 'center',
} as React.CSSProperties;

const footer = {
  policy: {
    width: '166px',
    margin: 'auto',
  },
  text: {
    margin: '0',
    color: '#AFAFAF',
    fontSize: '13px',
    textAlign: 'center',
  } as React.CSSProperties,
};
