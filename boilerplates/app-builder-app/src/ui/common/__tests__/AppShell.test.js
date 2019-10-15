import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

import { BrandMenu } from '@entando/menu';
import AppShell from 'ui/common/AppShell';

configEnzymeAdapter();

describe('ui/common/AppShell', () => {
  const component = shallow(<AppShell />);

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('has class AppShell', () => {
    expect(component.hasClass('AppShell')).toBe(true);
  });

  it('Renders BrandMenu', () => {
    expect(component.find(BrandMenu).exists()).toBe(true);
  });
});
