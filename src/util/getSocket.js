/**
 * Created by MingYin Lv on 17/1/5:下午3:53.
 */


export default function getSocket(action) {
  return new SocketIdentify(action);
}

export function SocketIdentify(action) {
  if (this.constructor === SocketIdentify) {
    this.action = action;
    return this;
  } else {
    return new SocketIdentify(action);
  }
}
