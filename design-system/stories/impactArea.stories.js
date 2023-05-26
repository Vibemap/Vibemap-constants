
import ImpactArea from '../components/impactArea';

export default {
  title: 'Components/ImpactArea',
  component: ImpactArea,
};

const mockData = {
  impactArea: {
    hideImpactArea: false,
    vibeset: {
      slug: 'your-vibeset-slug',
    },
    city: 'Your City',
    heading: 'It’s free to be on Vibemap',
    backgroundColor: 'red',
    textColor: 'white',
    backgroundType: "image",
    backgroundImage: {
      sourceUrl: 'https://vibemap.wpengine.com/wp-content/uploads/2022/11/Alyce-on-Grand-3.jpg',
    },
    fullImageFields: {
      bodyText: 'Boost your online presence, promote your business, and attract new customers',
      links: [
        {
          linkType: "external",
          externalUrl: "https://www.example.com",
          linkText: "Get Started",
        }
      ]
    },    
  },
};

const Template = (args) => <ImpactArea {...args} />;

export const Default = Template.bind({});

Default.args = {
  data: mockData,
  showCityTitle: false,
};  