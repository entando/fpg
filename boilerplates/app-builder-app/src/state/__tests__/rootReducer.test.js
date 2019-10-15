import reducer from 'state/rootReducer';

const state = reducer();

describe('root reducer store', () => {
  it('contains the correct number of states', () => {
    expect(state).toBeInstanceOf(Object);
    expect(Object.keys(state)).toHaveLength(9);
  });

  it('contains the apps & APP_NAME state', () => {
    expect(state).toHaveProperty('apps');
    expect(state.apps).toHaveProperty('APP_NAME');
    expect(Object.keys(state.apps.APP_NAME)).toHaveLength(0);
  });

  it('contains the apimanager state', () => {
    expect(state).toHaveProperty('api');
  });

  it('contains the currentUser state', () => {
    expect(state).toHaveProperty('currentUser');
  });

  it('contains the redux form state', () => {
    expect(state).toHaveProperty('form', {});
  });

  it('contains the loading state', () => {
    expect(state).toHaveProperty('loading');
  });

  it('contains the locale state', () => {
    expect(state).toHaveProperty('locale');
  });

  it('contains the messages state', () => {
    expect(state).toHaveProperty('messages');
  });

  it('contains the modal state', () => {
    expect(state).toHaveProperty('modal');
  });

  it('contains the pagination state', () => {
    expect(state).toHaveProperty('pagination');
  });
});
