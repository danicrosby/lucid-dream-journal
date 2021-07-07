import React from 'react';
import { css } from '@emotion/css';
import {
  Card,
  CardTitle,
  CardBody,
  CardText
} from 'reactstrap';
import info from '../styles/Assets/info.png';

const easeSlow = css`
  transition: all 450ms ease-in-out;
`;

const menuBtn = css`
  z-index: 3;
  right: 35px;
  top: 35px;
  cursor: pointer;
  ${easeSlow};
  &.closer {
  }
`;

const menuOverlay = css`
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  background-color: #333;
  height: 100vh;
  width: 49vw;
  transform: translateX(100%);
  transition: all 900ms ease-in-out;
  &.show {
    background-color: #440D44;
    transform: translateX(0%); 
  }
  @media (max-width: 800px) {
    width: 100vw;
  }
`;

class Menu extends React.Component {
  state = {
    isMenuOpen: false
  };

  toggleMenu = () => this.setState(({ isMenuOpen }) => ({ isMenuOpen: !isMenuOpen }));

  render() {
    const { isMenuOpen } = this.state;
    return (
      <React.Fragment>
        <div className={`${menuBtn} ${isMenuOpen ? 'closer' : null}`} onClick={this.toggleMenu}>
          <div className={`${isMenuOpen ? 'closer' : null}`} />
          <img src={info} height={20} width={20} />
        </div>
        <div className={`${menuOverlay} ${isMenuOpen ? 'show' : null}`}>
          <Card className="menu-card">
            <CardBody className="menu-card-body">
              <div className="top-text mb-4">
                <h5 className="mb-3">Calming Techniques</h5>
              </div>
              <CardTitle><h6>Meditation</h6></CardTitle>
              <CardText className="card-text">
                Lucid dreams give you the ability to control your own dreams and steer them toward the direction you want. In the lucid state, you are more willing to confront threats and as a result, become more self confident. When you achieve lucidity, you can use it as a tool to improve your sports game, to rehearse for a speech,
                to fulfill your fantasies, or to solve a problem in your waking life.
              </CardText>
              <CardTitle><h6 className="mt-4">Controlled Breathing</h6></CardTitle>
              <CardText>
                Lucid dreams give you the ability to control your own dreams and steer them toward the direction you want. In the lucid state, you are more willing to confront threats and as a result, become more self confident. When you achieve lucidity, you can use it as a tool to improve your sports game, to rehearse for a speech,
                to fulfill your fantasies, or to solve a problem in your waking life. In fact, some athletes utilize their lucid dreams to practice their tennis serve, golf stroke or bat swing. Even in your day to day life, you can use lucid dreams to ask  the boss for a raise, prepare for a first date, overcome phobias,  get over writer block, etc.
              </CardText>
              <CardTitle><h6 className="mt-4">Calming Music</h6></CardTitle>
              <CardText>
                Lucid dreams give you the ability to control your own dreams and steer them toward the direction you want. In the lucid state, you are more willing to confront threats and as a result, become more self confident. When you achieve lucidity, you can use it as a tool to improve your sports game, to rehearse for a speech,
                to fulfill your fantasies, or to solve a problem in your waking life. In fact, some athletes utilize their lucid dreams to practice their tennis serve, golf stroke or bat swing. Even in your day to day life, you can use lucid dreams to ask  the boss for a raise, prepare for a first date, overcome phobias,  get over writer block, etc.
              </CardText>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default Menu;
