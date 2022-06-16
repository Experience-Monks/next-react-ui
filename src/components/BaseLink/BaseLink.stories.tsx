import BaseLink, { Props } from './BaseLink';

function generateImage() {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  ctx!.fillStyle = '#D46A6A';
  ctx!.fillRect(100, 75, 200, 250);
  return canvas.toDataURL();
}

export default { title: 'components/BaseLink' };

export const Default = (args: Props) => <BaseLink {...args}>{args.title}</BaseLink>;

Default.args = {
  text: 'External link (new tab)',
  title: 'Go to Google',
  href: 'https://www.google.com',
  onClick: () => console.log('clicked')
};

export const SameTab = (args: Props) => <BaseLink {...args}>{args.title}</BaseLink>;
SameTab.args = {
  text: 'External link (same tab)',
  title: 'Open Storybook',
  target: '_self',
  href: 'https://storybook.js.org/docs/react/configure/features-and-behavior',
  onClick: () => console.log('clicked')
};

export const TelLink = (args: Props) => <BaseLink {...args}>{args.title}</BaseLink>;
TelLink.args = {
  text: 'Tel Link',
  title: 'Call +11111111111',
  href: 'tel:+11111111111'
};

export const EmailLink = (args: Props) => <BaseLink {...args}>{args.title}</BaseLink>;
EmailLink.args = {
  className: 'email-link',
  text: 'Email Link',
  title: 'Send a message to someone@yoursite.com',
  href: 'mailto:someone@yoursite.com'
};

export const DownloadLink = (args: Props) => <BaseLink {...args}>{args.title}</BaseLink>;
DownloadLink.args = {
  text: 'Download Image (named)',
  title: 'Download rectangle.png',
  href: generateImage(),
  download: 'rectangle.png'
};

export const RelativeLink = (args: Props) => <BaseLink {...args}>{args.title}</BaseLink>;
RelativeLink.args = {
  text: 'Relative link to a page',
  title: 'About Page',
  href: '/about'
};
