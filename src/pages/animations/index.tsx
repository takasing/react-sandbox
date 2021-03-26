import React from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { itemStyle, linkStyle, listStyle } from "../../Navigation";
import { Rotate } from "./Rotate";
import { Scale } from "./Scale";

const Animations = () => {
  const { path, url } = useRouteMatch();
  return (
    <div>
      <ul className={listStyle}>
        <li className={itemStyle}><Link to={`${url}/scale`} style={linkStyle}>Scale</Link></li>
        <li className={itemStyle}><Link to={`${url}/rotate`} style={linkStyle}>Rotate</Link></li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>please select.</h3>
        </Route>
        <Route path={`${path}/scale`}><Scale/></Route>
        <Route path={`${path}/rotate`}><Rotate/></Route>
      </Switch>
    </div>
  )
}
export default Animations;
