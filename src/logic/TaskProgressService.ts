import { fromEvent, interval, Observable, merge } from 'rxjs';
import { mapTo, map, scan, tap, filter, delay, bufferTime, distinctUntilChanged, pluck, startWith } from 'rxjs/operators';

// Observableは値が変わりうる変数
// 自分で0からObservableを作るパターンと、他のObservableを合成、加工するパターンがある
const taskStarts = new Observable<number>();
const taskCompletions = new Observable<number>();

// Observable.mapはArray.mapのように流れてきた値に対して適用し、再びObservableを返す
// mapToはmapと似ているが固定値を返したい場合
// +1, -1したいときに使う
// オペレーターはpipeの引数に渡す. pipeがやっているのははオペレーターにObservableを渡すこと
export const loadUp = taskStarts.pipe(mapTo(1));
export const loadDown = taskCompletions.pipe(mapTo(-1));
// mergeでObservableを結合
export const currentLoadCount = merge(loadUp, loadDown).pipe(
  // 初期値0
  startWith(0),
  // scanはreduceみたいなやつ
  scan((totalCurrentLoads, changeInLoads) => {
    console.log(`total: ${totalCurrentLoads}, change: ${changeInLoads}`)
    const newCount = totalCurrentLoads + changeInLoads;
    return newCount < 0 ? 0 : newCount;
  })
);

export const increment = (e: Observable<React.MouseEvent<HTMLHeadElement>>) => e.pipe(
  mapTo(1),
  scan((acc, cur) => acc + cur, 0),
)
export const delay2s = (e: Observable<React.MouseEvent<HTMLHeadElement>>) => e.pipe(
  // use tap when logging
  // .persist() is used when async access to React event object
  tap(e => {console.log(e.type); e.persist()}),
  filter(e => e.type === 'click'),
  delay(2000),
  map((e: React.MouseEvent<HTMLHeadElement>) => e.type),
)
export const stack = (e: Observable<React.MouseEvent<HTMLHeadElement>>) => e.pipe(
  bufferTime(3000),
  map(v => v.length),
  distinctUntilChanged(),
)
const arrows: {[k: string]: string} = {
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→"
}
export const keydowns = () =>
  fromEvent(document, 'keydown').pipe(
    tap(k => console.log(k)),
    pluck<Event, string>('key'),
    map(k => {
      if (arrows[k]) return arrows[k];
      if (k.length === 1) return k.toUpperCase()
      // cmd, altなどはスルー
      return null
    }),
    // filterだとうまく型付できなかった
    scan<string|null, string[]>((acc, cur) =>
      cur === null ? [...acc] : [...acc, cur], []),
    // 最後の5個を抽出
    map(arr => arr.slice(-5))
  )
