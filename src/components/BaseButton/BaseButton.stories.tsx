import BaseButton, { Props } from './BaseButton';

export default { title: 'components/BaseButton' };

export const Default = (args: Props) => <BaseButton {...args}>{args.title}</BaseButton>;
Default.args = {
  component: 'button',
  title: 'Hello',
  onClick: () => {
    console.log(' world!');
  }
};
