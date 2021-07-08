import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import {
  Card,
  CardHeader,
  CardText,
  CardBody,
  Button
} from 'reactstrap';
import DreamForm from './DreamForm';
import { deleteDream } from '../helpers/data/DreamData';
import Things from '../helpers/data/Things';
import Emotions from '../helpers/data/Emotions';
import Colors from '../helpers/data/Colors';
import Places from '../helpers/data/Places';
import Actions from '../helpers/data/Actions';
import DreamType from '../helpers/data/DreamType';

export default function SingleDreamCard({ dream }) {
  const [editing, setEditing] = useState(false);
  const [singleDream, setSingleDream] = useState(dream);
  const history = useHistory();

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
    <div className="single-card-container">
      <Card className="single-card">
        <CardHeader className="header">
          <span>{singleDream.name}</span>
          <div className="edit-icons">
          <span><Button className="material-icons button" onClick={() => handleClick('edit')}>edit</Button></span>
          <span><Button className="material-icons button" onClick={() => handleClick('delete')}>delete</Button></span>
          <span><a href="/dreams"><Button className="material-icons submit-btn">done</Button></a></span>
          </div>
        </CardHeader>
        <CardBody className="card-body">
          <div><h6>Overview</h6></div>
          <CardText className="intro">
            Hello, Dani. It looks like you had a {singleDream.dreamType.toLowerCase()} dream
            on {format(new Date(singleDream.date), 'MMMM dd, yyyy', { locale: enGB })}, that made you feel {singleDream.emotion.toLowerCase()}.
            You dreamt of {singleDream.people}, the setting was {singleDream.place.toLowerCase()}.
            You remembered a few objects, more specifically a {singleDream.thing.toLowerCase()}.
            The overall abmience of this {singleDream.dreamType.toLowerCase()} dream was {singleDream.color.toLowerCase()}.
            Does this sound accurate?
          </CardText>
          <div><h6>Recorded Story</h6></div>
          <CardText>{singleDream.entry}</CardText>
          <div><h6>Keywords</h6></div>
          <CardText className="keyword-bucket">
            <span>{singleDream.dreamType}</span>
            <span>{singleDream.emotion}</span>
            <span>{singleDream.people}</span>
            <span>{singleDream.place}</span>
            <span>{singleDream.thing}</span>
            <span>{singleDream.action}</span>
            <span>{singleDream.color}</span>
          </CardText>

          <div><h6 className="mb-3 mt-4">Dream Interpretation</h6></div>
          <CardText><h6>{singleDream.dreamType}</h6>{singleDream.dreamType} {DreamType[singleDream.dreamType].interpretation}</CardText>
          <CardText><h6>{singleDream.thing}</h6>To dream of a {singleDream.thing.toLowerCase()} indicates {Things[singleDream.thing]}</CardText>
          <CardText><h6>{singleDream.place}</h6>To dream of a {singleDream.place.toLowerCase()} indicates {Places[singleDream.place]}</CardText>
          <CardText><h6>{singleDream.emotion}</h6>To feel {singleDream.emotion.toLowerCase()} during your dream indicates {Emotions[singleDream.emotion]}</CardText>
          <CardText><h6>{singleDream.action}</h6>If you are {singleDream.action.toLowerCase()} during your dream it might indicate {Actions[singleDream.action]}</CardText>
          <CardText><h6>{singleDream.color}</h6>To dream of the color {singleDream.color.toLowerCase()} symbolizes {Colors[singleDream.color]}</CardText>
          <CardText><h6>Additional Details</h6></CardText>
          <CardText>{singleDream.realization}</CardText>
          <CardText><h6>Realizations or Follow Ups</h6></CardText>
          <CardText>{singleDream.addDetails}</CardText>
        </CardBody>
      </Card>
      <div className="mt-3">
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
    </div>
  );
}

SingleDreamCard.propTypes = {
  firebaseKey: PropTypes.string,
  dream: PropTypes.object,
};
