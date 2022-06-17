import { useState } from 'react';

import HambugerButton, { Props, State } from './HambugerButton';

export default { title: 'components/HambugerButton' };

let idleToCloseState = State.IDLE;
let idleToBackState = State.BACK;
let closeToBackState = State.CLOSE;

const HamburgerButtonTest = (props: Props) => {
  const [currentState, setCurrentState] = useState(props.currentState);

  return <HambugerButton currentState={currentState} onClick={() => setCurrentState(props.onClick?.())} />;
};

function onIdleClick() {
  idleToCloseState = idleToCloseState === State.IDLE ? State.CLOSE : State.IDLE;
  return idleToCloseState;
}

function onCloseClick() {
  closeToBackState = closeToBackState === State.CLOSE ? State.BACK : State.CLOSE;
  return closeToBackState;
}

function onBackClick() {
  idleToBackState = idleToBackState === State.BACK ? State.IDLE : State.BACK;
  return idleToBackState;
}

export const Default = (args: Props) => <HamburgerButtonTest {...args} />;
Default.args = {
  currentState: State.IDLE,
  onClick: onIdleClick
};

export const CloseToBack = (args: Props) => <HamburgerButtonTest {...args} />;
CloseToBack.args = {
  currentState: State.CLOSE,
  onClick: onCloseClick
};

export const BackToIdle = (args: Props) => <HamburgerButtonTest {...args} />;
BackToIdle.args = {
  currentState: State.BACK,
  onClick: onBackClick
};
