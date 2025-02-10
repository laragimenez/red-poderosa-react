import 'bootstrap/dist/css/bootstrap.min.css'; //importamos la hoja de stylo de bootstrap
import './MyInput.css';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function MyInput({count}) {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={count}
        />
      </InputGroup>;
      </>
  );
}

export default MyInput;