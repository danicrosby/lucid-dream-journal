import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import {
  Button,
  Card,
  CardTitle,
  Container,
  Row,
  Col,
  CardText,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deleteDream } from '../helpers/data/DreamData';
import DreamForm from './DreamForm';

const DreamCard = ({
  firebaseKey,
  name,
  entry,
  setDreams
}) => {
  const [editing, setEditing] = useState(false);
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteDream(firebaseKey)
          .then(setDreams);
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      case 'view':
        history.push(`/dreams/${firebaseKey}`);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
    <Container className="card-container">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card className="card-grey">
            <Card body className="card-white">
              <Row>
                <div className="top-text">
                  <CardTitle tag="h5">{name}</CardTitle>
                  <div><i className="material-icons dream-type-icon"> cloud </i></div>
                </div>
              </Row>
              <Row><div>_______________________________________________</div></Row>
              <Row>
                <CardText>november 11, 2011</CardText>
              </Row>
            </Card>
            <div>
              <Button id="PopoverClick" type="button">
                <i className="material-icons" id="expand-arrow"> keyboard_arrow_down </i>
              </Button>
              <UncontrolledPopover trigger="click" placement="bottom" target="PopoverClick">
                <PopoverHeader>Title</PopoverHeader>
                <PopoverBody>
                  <div className="card-link-wrapper">
                  <Button color="transparent" onClick={() => handleClick('view')}>
                      <Fab disabled aria-label="visibility"><VisibilityIcon /></Fab>
                    </Button>
                    <Button color="transparent" onClick={() => handleClick('delete')}>
                      <Fab disabled aria-label="delete"><DeleteIcon /></Fab>
                    </Button>
                    <Button color="transparent" style={{ marginBottom: '1rem' }} onClick={() => handleClick('edit')}>
                      <Fab disabled aria-label="edit"><EditIcon /></Fab>
                    </Button>
                    {
                      editing && <DreamForm
                        formTitle='Edit Dream'
                        setDreams={setDreams}
                        firebaseKey={firebaseKey}
                        name={name}
                        entry={entry}
                      />
                    }
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
            </div>
          </Card>
        </Col>
      </Row>

    </Container>

  );
};

DreamCard.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  entry: PropTypes.string.isRequired,
  setDreams: PropTypes.func
};

export default DreamCard;
