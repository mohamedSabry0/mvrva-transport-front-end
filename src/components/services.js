import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/custom.css';

function BasicExample2() {
  return (
    <Card style={{ width: '18rem' }} className="service-card">
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default BasicExample2;
