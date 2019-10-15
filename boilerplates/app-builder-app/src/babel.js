import menu from 'ui/common/LinkMenu';
import { APP_NAME as state } from 'state/rootReducer';
import { routes, routesDir } from 'ui/App';
import en from 'locales/en';
import it from 'locales/it';

const APP_NAME = {
  id: 'APP_NAME',
  menu,
  state,
  routes,
  routesDir,
  locales: {
    en,
    it,
  },
};

export default APP_NAME;
