import Breadcrumbs, { BreadStyle, Props } from './Breadcrumbs';

const routesExample = [
  {
    route: '/',
    text: 'Home'
  },
  {
    route: '/page',
    text: 'Page'
  },
  {
    route: '/nested-1',
    text: 'Nested-1'
  },
  {
    route: '/nested-2',
    text: 'Nested-2'
  }
];

export default { title: 'components/Breadcrumbs' };

export const Default = (args: Props) => <Breadcrumbs {...args} />;
Default.args = {
  breadStyle: BreadStyle.FORWARD,
  routes: routesExample
};

export const BreadStyleAll = (args: Props) => <Breadcrumbs {...args} />;
BreadStyleAll.args = {
  breadStyle: BreadStyle.ALL,
  routes: routesExample
};

export const BreadStyleCurrent = (args: Props) => <Breadcrumbs {...args} />;
BreadStyleCurrent.args = {
  breadStyle: BreadStyle.CURRENT,
  routes: routesExample
};
