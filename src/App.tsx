import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'react-bootstrap';

function App() {
  let [night, changeNight] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  let [selecting, changeSelecting] = useState<number>(0);

  return (
    <div className="App">
      <div className="grid-container">
        {[...Array(9)].map((_, i: number): JSX.Element => {
          return (
            <Select
              night={night}
              changeNight={changeNight}
              selecting={selecting}
              changeSelecting={changeSelecting}
              key={i}
            ></Select>
          );
        })}
      </div>
      <h2>beta 입니다.</h2>
      <p>초기화는 새로고침</p>
    </div>
  );
}

function Select(props: {
  night: boolean[];
  changeNight: React.Dispatch<React.SetStateAction<boolean[]>>;
  selecting: number;
  changeSelecting: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const smallIcon: string[] = [
    process.env.PUBLIC_URL + '/small/s_bed.png',
    process.env.PUBLIC_URL + '/small/s_chest.png',
    process.env.PUBLIC_URL + '/small/s_clock.png',
    process.env.PUBLIC_URL + '/small/s_closet.png',
    process.env.PUBLIC_URL + '/small/s_mirror.png',
    process.env.PUBLIC_URL + '/small/s_musicbox.png',
    process.env.PUBLIC_URL + '/small/s_piano.png',
    process.env.PUBLIC_URL + '/small/s_sofa.png',
    process.env.PUBLIC_URL + '/small/s_statue.png',
  ];

  let [select, changeSelect] = useState<string>('');

  return (
    <div className="container">
      <img
        className={`overlay ${select ? 'show' : ''}`}
        src={select}
        alt={select}
        onClick={() => {
          const selTemp = smallIcon.indexOf(select);
          let temp = [...props.night];
          temp[selTemp] = false;
          props.changeNight(temp);
          changeSelect('');
          props.changeSelecting(props.selecting - 1);
        }}
      ></img>
      <div
        className={`btn-grid-container ${props.selecting >= 5 ? 'sel_5' : ''} ${
          props.selecting >= 8 ? 'sel_8' : ''
        }`}
      >
        {smallIcon.map((value: string, i: number): JSX.Element | null => {
          if (props.night[i]) {
            return null;
          }
          return (
            <Button
              className="btn"
              disabled={select ? true : false}
              variant="light"
              key={i}
              onClick={() => {
                let temp = [...props.night];
                temp[i] = true;
                changeSelect(value);
                props.changeNight(temp);
                props.changeSelecting(props.selecting + 1);
              }}
            >
              <img className="icon" src={value} alt={value} />
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
