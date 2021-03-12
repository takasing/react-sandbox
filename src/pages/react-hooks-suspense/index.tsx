import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { Counter } from "./Counter";
import { listStyle, itemStyle } from '../../Navigation';
import Tilt from "./Tilt";
import { css } from "@emotion/css";
import { Stopwatch } from "./Stopwatch";
import ActivityDetector from "./ActivityDetector";
import Memo from "./Memo";

const tiltStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ReactHooksSuspense = () => {
  const { path, url } = useRouteMatch();
  const link = {
    color: 'white',
  }
  return (
    <div>
      <ul className={listStyle}>
        <li className={itemStyle}><Link to={`${url}/counter`} style={link}>Counter</Link></li>
        <li className={itemStyle}><Link to={`${url}/tilt`} style={link}>Tilt</Link></li>
        <li className={itemStyle}><Link to={`${url}/stopwatch`} style={link}>Stopwatch</Link></li>
        <li className={itemStyle}><Link to={`${url}/activityDetector`} style={link}>ActivityDetector</Link></li>
        <li className={itemStyle}><Link to={`${url}/memo`} style={link}>Memo</Link></li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>please select.</h3>
        </Route>
        <Route path={`${path}/counter`}><Counter /></Route>
        <Route path={`${path}/tilt`}>
          <Tilt>
            <div className={tiltStyle}>tilt</div>
          </Tilt>
        </Route>
        <Route path={`${path}/stopwatch`}><Stopwatch /></Route>
        <Route path={`${path}/activityDetector`}><ActivityDetector /></Route>
        <Route path={`${path}/memo`}><Memo /></Route>
      </Switch>
    </div>
  )
}
export default ReactHooksSuspense;
