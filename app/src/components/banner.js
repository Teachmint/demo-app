import React from 'react';
import Banner from 'react-js-banner';
import info from '../assets/info.svg';
import './banner.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const banner = () => {
  const contentStyle = {
    background: '#FFF',
    color: '#354c74',
    width: '40%',
    fontFamily: 'Lato',
  };
  const arrowStyle = { color: '#FFF' };
  return (
    <Banner
      title={
        <div>
          <span
            style={{
              color: '#FFF',
              fontFamily: 'Lato',
            }}
          >
            This is beta environment and we are currently testing a new feature:
          </span>
          <span> </span>
          <span>
            <Popup
              trigger={
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Lato',
                    textDecoration: 'underline',
                  }}
                >
                  Unstable Network Notification
                </span>
              }
              {...{
                contentStyle,
                arrowStyle,
              }}
              position={'bottom center'}
              on={['hover', 'focus']}
            >
              <ul
                style={{
                  paddingRight: '15px',
                }}
              >
                <li>You get a notification when network fluctuates</li>
                <li>
                  Check network related data from "more option" (three dots on
                  bottom panel) &#8594; Network &amp; Device stats
                </li>
              </ul>
            </Popup>
          </span>
        </div>
      }
      image={info}
      imageClass="banner-class"
    />
  );
};

export default banner;
