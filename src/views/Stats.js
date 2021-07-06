import React from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardText
} from 'reactstrap';
import DreamTypeStats from '../styles/Assets/DreamTypeStats.png';
import Recurring from '../styles/Assets/RecurringStats.png';
import ColorStats from '../styles/Assets/ColorStats.png';

function Stats() {
  return (
    <div className="stats-sub-container">
      <div className="stats-card-container">
        <Card className="stats-card">
          <CardText>Dream Type Stats</CardText>
          <CardBody className="stats-card-body">
          <CardImg top width="100%" src={DreamTypeStats} />
          </CardBody>
        </Card>

        <Card className="stats-card ml-5 mr-5">
        <CardText>Recurring Dream Stats</CardText>
          <CardBody className="stats-card-body">
          <CardImg top width="100%" src={Recurring} />
          </CardBody>
        </Card>

        <Card className="stats-card">
        <CardText>Color Stats</CardText>
          <CardBody className="stats-card-body">
          <CardImg top width="100%" src={ColorStats} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Stats;
