
import {loadPostsAction, loadPostsSuccessAction, addPostAction, Post, removePostAction} from './actions';
import configureMockStore from 'redux-mock-store';
import {Store, AnyAction} from 'redux';
import thunk from "redux-thunk";
import {State as IndexState} from './reducer';

interface StoreType {
  index: IndexState,
}

const mockStore = configureMockStore([thunk]);

function findAction(store: Store<StoreType>, type: string) {
  return store.getActions().find(action => action.type === type);
}

export async function getAction(store: Store<StoreType>, type: string) {
  const action = findAction(store, type);

  if (action)
    return Promise.resolve(action);

  return new Promise(resolve => {
    store.subscribe(() => {
      const action = findAction(store, type);
      if (action) resolve(action);
    });
  });
}

test ('check loadPostsAction', async function () {
  const store: Store<StoreType, AnyAction> = mockStore();

  store.dispatch(loadPostsAction());

  expect(await getAction(store, "LOAD_ITEMS")).toEqual({type: "LOAD_ITEMS"});
  expect(await getAction(store, "LOAD_ITEMS_SUCCESS")).toEqual({
    type: 'LOAD_ITEMS_SUCCESS',
    posts: [{name: 'item1', id: 1}, {name: 'item2', id: 2}],
  });
});

test ('check loadPostsSuccessAction', () => {
  const posts: Array<Post> = [{name: 'first', id: '1'}, {name: 'second', id: '2'}];

  expect(loadPostsSuccessAction(posts)).toEqual({
    type: 'LOAD_ITEMS_SUCCESS',
    posts,
  })
});

test ('check addPostAction', () => {
  const post = {name: 'first', id: '1'};

  expect(addPostAction(post)).toEqual({
    type: 'ADD_POST',
    post,
  })
});

test ('check removePostAction', () => {
  const postId = 'postId';

  expect(removePostAction(postId)).toEqual({
    type: 'REMOVE_POST',
    postId,
  })
});