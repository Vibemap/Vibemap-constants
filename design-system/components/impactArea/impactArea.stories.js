import React from 'react';

import { ImpactArea } from '../../stories/impactArea';


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
      sourceUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
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

export const Default = {
  args: {
    data: mockData,
    showCityTitle: false,
  },
};

const mockData2 = {
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


export const impactArea2 = {
  title: 'Components/ImpactArea2',
  args: {
    data: mockData2,
    showCityTitle: false,
  }
};



