/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardText,
  CardBody,
  CardFooter
} from 'reactstrap';
// import { format } from 'date-fns';
// import { enGB } from 'date-fns/locale';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DreamForm from './DreamForm';
import { deleteDream } from '../helpers/data/DreamData';
import Things from '../helpers/data/Things';
import Emotions from '../helpers/data/Emotions';
import Colors from '../helpers/data/Colors';
import Places from '../helpers/data/Places';
import Actions from '../helpers/data/Actions';
import DreamType from '../helpers/data/DreamType';

const ModalForm = (props, dream) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [singleDream, setSingleDream] = useState(dream);
  const history = useHistory();

  const toggle = () => setModal(!modal);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteDream(singleDream.firebaseKey)
          .then(() => {
            history.push('/dreams');
          });
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
        <Card className="single-dream-card">
        <CardHeader className="header">
          <center>
            <h5>{singleDream.name}</h5>
          </center>
        </CardHeader>
        <CardBody className="add-dream-card-body">
          <CardText><h6 className="mb-2 mt-2">Overview</h6></CardText>
          <CardText className="intro">
            Hello, Dani. It looks like you had a {singleDream.dreamType} dream
            {/* on {format(new Date(singleDream.date), 'MMMM dd, yyyy', { locale: enGB })}, that made you feel {singleDream.emotion}. */}
            You dreamt of {singleDream.people}, the setting was {singleDream.place}.
            You remembered a few objects, more specifically a {singleDream.thing}.
            The overall abmience of this {singleDream.dreamType} dream was {singleDream.color}.
            Does this sound accurate?
          </CardText>
          <CardText><h6 className="mb-2 mt-2">Recorded Dream Story</h6></CardText>
          <CardText>{singleDream.entry}</CardText>
          <CardText><h6 className="mb-2 mt-2">Keywords</h6></CardText>
          <CardText className="keyword-bucket">
            <span>{singleDream.dreamType}</span>
            <span>{singleDream.emotion}</span>
            <span>{singleDream.people}</span>
            <span>{singleDream.place}</span>
            <span>{singleDream.thing}</span>
            <span>{singleDream.action}</span>
            <span>{singleDream.color}</span>
          </CardText>

          <CardText><h6 className="mb-3 mt-3">Dream Interpretation</h6></CardText>
          <CardText><h6>{singleDream.dreamType}</h6>{singleDream.dreamType} {DreamType[singleDream.dreamType].interpretation}</CardText>
          <CardText><h6>{singleDream.thing}</h6>To dream of a {singleDream.thing} indicates {Things[singleDream.thing]}</CardText>
          <CardText><h6>{singleDream.place}</h6>To dream of a {singleDream.place} indicates {Places[singleDream.place]}</CardText>
          <CardText><h6>{singleDream.emotion}</h6>To feel {singleDream.emotion} during your dream indicates {Emotions[singleDream.emotion]}</CardText>
          <CardText><h6>{singleDream.action}</h6>If you are {singleDream.action} during your dream it might indicate {Actions[singleDream.action]}</CardText>
          <CardText><h6>{singleDream.color}</h6>To dream of the color {singleDream.color} symbolizes {Colors[singleDream.color]}</CardText>
          <CardText><h6 className="mb-2 mt-2">Additional Details</h6></CardText>
          <CardText>{singleDream.realization}</CardText>
          <CardText><h6 className="mb-2 mt-2">Realizations or Follow Ups</h6></CardText>
          <CardText>{singleDream.addDetails}</CardText>
        </CardBody>
        <CardFooter className="card-footer">
          <Fab className="fab-icons" size="small" onClick={() => handleClick('edit')}><EditIcon /></Fab>
          <a href="/dreams"><Fab className="fab-icons mr-3 ml-3" size="small"><CheckIcon /></Fab></a>
          <Fab className="fab-icons" size="small" onClick={() => handleClick('delete')}><DeleteIcon /></Fab>
        </CardFooter>
        <ModalForm />
      </Card>
          <div>
            {
              editing && <DreamForm
                formTitle='Edit Dream'
                setSingleDream={setSingleDream}
                firebaseKey={dream.firebaseKey}
                name={singleDream.name}
                entry={singleDream.entry}
                date={singleDream.date}
                dreamType={singleDream.dreamType}
                emotion={singleDream.emotion}
                people={singleDream.people}
                place={singleDream.place}
                action={singleDream.action}
                thing={singleDream.thing}
                color={singleDream.color}
                addDetails={singleDream.addDetails}
                realization={singleDream.realization}
                setEditing={setEditing}
              />
            }
          </div>
        </ModalBody>
        <ModalFooter>
          <Fab className="fab-icons" size="small" onClick={() => handleClick('edit')}><EditIcon /></Fab>
          <a href="/dreams"><Fab className="fab-icons mr-3 ml-3" size="small"><CheckIcon /></Fab></a>
          <Fab className="fab-icons" size="small" onClick={() => handleClick('delete')}><DeleteIcon /></Fab>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalForm;

ModalForm.propTypes = {
  firebaseKey: PropTypes.string,
  dream: PropTypes.object,
};