import React from 'react';
import { mount, shallow } from 'enzyme';
import { configEnzymeAdapter, createMockHistory, mockRenderWithRouter } from 'testutils/helpers';
import { Route } from 'react-router-dom';
import { LinkMenuItem } from '@entando/menu';
import APP_NAME from 'babel';

configEnzymeAdapter();

describe('exports APP_NAME', () => {
  it('is an object', () => {
    expect(APP_NAME).toBeInstanceOf(Object);
  });

  describe('the id key', () => {
    it('is APP_NAME', () => {
      expect(APP_NAME).toHaveProperty('id', 'APP_NAME');
    });
  });

  describe('the state key', () => {
    const { state } = APP_NAME;

    it('contains the correct number of states', () => {
      expect(state).toBeInstanceOf(Function);
    });
  });

  describe('the routes key', () => {
    const history = createMockHistory();
    const component = mount(
      mockRenderWithRouter(<>{APP_NAME.routes}</>, history),
    );
    it('contains <Route> elements', () => {
      expect(component.find(Route).exists()).toBe(true);
    });
  });

  describe('the routesDir key', () => {
    it('is an array of routes definitions in object form', () => {
      const { routesDir } = APP_NAME;
      expect(Array.isArray(routesDir)).toBe(true);
      expect(routesDir).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: expect.any(String),
            component: expect.any(Function),
          }),
        ]),
      );
    });
  });

  describe('the menu key', () => {
    const Menu = APP_NAME.menu;
    const component = shallow(<Menu />);

    it('contains <LinkMenuItem> elements', () => {
      expect(component.find(LinkMenuItem).exists()).toBe(true);
    });
  });

  describe('the locales key', () => {
    it('contains the english locale', () => {
      expect(APP_NAME.locales).toHaveProperty('en');
    });

    it('contains the italian locale', () => {
      expect(APP_NAME.locales).toHaveProperty('it');
    });
  });
});
