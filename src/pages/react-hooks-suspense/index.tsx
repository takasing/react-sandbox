import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { Counter } from "./Counter";
import { listStyle, itemStyle, linkStyle } from '../../Navigation';
// import Tilt from "./Tilt";
// import { css } from "@emotion/css";
import { Stopwatch } from "./Stopwatch";
import ActivityDetector from "./ActivityDetector";
import Memo from "./Memo";
import Lazy from "./Lazy";
import { Artists } from "./Artists";

// const tiltStyle = css`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `

const ReactHooksSuspense = () => {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <ul className={listStyle}>
        <li className={itemStyle}><Link to={`${url}/counter`} style={linkStyle}>Counter</Link></li>
        {/* <li className={itemStyle}><Link to={`${url}/tilt`} style={linkStyle}>Tilt</Link></li> */}
        <li className={itemStyle}><Link to={`${url}/stopwatch`} style={linkStyle}>Stopwatch</Link></li>
        <li className={itemStyle}><Link to={`${url}/activityDetector`} style={linkStyle}>ActivityDetector</Link></li>
        <li className={itemStyle}><Link to={`${url}/memo`} style={linkStyle}>Memo</Link></li>
        <li className={itemStyle}><Link to={`${url}/lazy`} style={linkStyle}>Lazy</Link></li>
        <li className={itemStyle}><Link to={`${url}/artists`} style={linkStyle}>Artists</Link></li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>please select.</h3>
        </Route>
        <Route path={`${path}/counter`}><Counter /></Route>
        {/* コメントアウトしておかないと、Lazyが効かない */}
        {/* <Route path={`${path}/tilt`}>
          <Tilt>
            <div className={tiltStyle}>tilt</div>
          </Tilt>
        </Route> */}
        <Route path={`${path}/stopwatch`}><Stopwatch /></Route>
        <Route path={`${path}/activityDetector`}><ActivityDetector /></Route>
        <Route path={`${path}/memo`}><Memo /></Route>
        <Route path={`${path}/lazy`}><Lazy /></Route>
        <Route path={`${path}/artists`}><Artists /></Route>
      </Switch>
    </div>
  )
}
export default ReactHooksSuspense;
