import Tabs, { Props } from './Tabs';

export default { title: 'components/Tabs' };

const commonStyles = {
  fontSize: '1.8rem',
  lineHeight: '2rem',
  letterSpacing: '0.1px'
};

export const Default = (args: Props) => (
  <Tabs {...args}>
    <div data-label="First" style={{ ...commonStyles }}>
      Move with Arrow Left, Right, Home and End
    </div>
    <div data-label="Second" style={{ ...commonStyles }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. A maxime maiores itaque. Autem amet minus sed vitae
      perferendis eligendi ratione facere, sit nisi nihil, nulla cupiditate earum, ducimus alias aperiam.
    </div>
    <div data-label="Third" style={{ ...commonStyles }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime omnis consequuntur, obcaecati reiciendis porro
      doloremque natus dolores eum consequatur delectus aspernatur est dignissimos cupiditate ex sequi laudantium facere
      qui? Maxime. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt officia odit possimus inventore quas
      doloremque quaerat porro quis, enim magnam natus tempore numquam quia veritatis, quae hic odio molestias iure.
    </div>
  </Tabs>
);
Default.args = {
  // add control data
};

export const OneItem = (args: Props) => (
  <Tabs {...args}>
    <p data-label="First" style={{ ...commonStyles }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime omnis consequuntur, obcaecati reiciendis porro
      doloremque natus dolores eum consequatur delectus aspernatur est dignissimos cupiditate ex sequi laudantium facere
      qui? Maxime. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt officia odit possimus inventore quas
      doloremque quaerat porro quis, enim magnam natus tempore numquam quia veritatis, quae hic odio molestias iure.
    </p>
  </Tabs>
);
OneItem.args = {};
