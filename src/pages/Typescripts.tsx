import React from 'react';

interface Interface {
  x: number,
  y: number,
}
interface Interface2 {
  z: number,
}
type Type = {
  x: number,
  y: number
}

export const Typescripts: React.FC = () => {
  const getX = (obj: {[key: string]: number}): string => {
    return JSON.stringify(obj);
  }
  const getY = (obj: Interface): string => {
    return JSON.stringify(obj);
  }
  const getZ = (obj: Interface2): string => {
    return JSON.stringify(obj);
  }
  const base = {x: 1, y: 3};
  const iFace: Interface = Object.assign({}, base);
  const iFace2: Interface2 = Object.assign({}, base, {z:3});
  const t: Type = Object.assign({}, base);
  return (
    <div>
      <div>=======================</div>
      <p>{`getX(iFace) is Error`}</p>
      {/* <p>{JSON.stringify(iFace2)}</p> */}
      <p>{`getX(iFace) is ${getX(t)}`}</p>
      <div>=======================</div>
      <p>{`getY(iFace) is ${getY(iFace)}`}</p>
      <p>{`getY(iFace2) is Error`}</p>
      <p>{`getY(t) is ${getY(t)}`}</p>
      <p>{`getZ(iFace2) is Error`}</p>
      <p>{`getZ(iFace2) is ${getZ(iFace2)}`}</p>
      <p>{`getZ(t) is Error (Property 'z' is missing in type 'Type')`}</p>
      <div>=======================</div>
    </div>
  )
}
