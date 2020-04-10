
import fetchMock from 'fetch-mock';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import { createAction } from 'redux-actions';

fetchMock.get('/items-list', [
  {name: 'item1', id: 1, x: 100, y:50},
  {name: 'item2', id: 2, x: 200, y:30},
  {name: 'item3', id: 3, x: 250, y:60},
  {name: 'item4', id: 4, x: 290, y:30}
], {
  delay: 2000,
});

export interface Post {
  name: string,
  id: string,
  x: number,
  y: number,
}

interface Action {
  type: string,
}

export interface LoadPostsSuccessAction extends Action {
  payload: Array<Post>
}

export type Thunk<ReturnedValue> = ThunkAction<ReturnedValue, {}, undefined, LoadPostsSuccessAction>;
// Первый параметр - значение, которое возвращается из этого Thunk (Возиожно вернуть Promise и отработать then после dispatch этого thunk action)
// Второй параметр - это тип структуры Store
// Третий параметр - extraArgument (возможно задатся при вызове extraArgument в качестве аргумента, но это не точно)
// Четвертый параметр - какие экшены будут диспатчится при успехе (можно перечислить несколько через "|")

// export function loadPostsAction () : ThunkAction<void, {}, Store, LoadPostsSuccessAction> {
//   return (dispatch : Dispatch) : void => {
//     dispatch({
//       type: 'LOAD_ITEMS',
//     });

//     fetch ('/items-list')
//       .then((response) => response.json())
//       .then((posts: Array<Post>) => {
//         dispatch(loadPostsSuccessAction(posts));
//       })
//       .catch(() => {
//         console.log(222);
//       })
//   } 
// }

// const create = actionCreatorFactory();
// const createAsync = asyncFactory<{}>(create);

// export const loadPostsAction = createAsync(
// 	'LOAD_ITEMS',
// 	async (params, dispatch) => {
//     fetch ('/items-list')
//       .then((response) => response.json())
//       .then((posts: Array<Post>) => {
//         dispatch(loadPostsSuccessAction(posts));
//       })
//       .catch(() => {
//         console.log(222);
//       });
// 	}
// );

export class AddPostAction implements ActionTypeType<Post> {
  readonly type = 'ADD_POST';

  constructor (public payload: Post) {

  }
}

export class RemovePostAction implements ActionTypeType<string> {
  readonly type = 'REMOVE_POST';

  constructor (public payload: string) {

  }
}

export class LoadPostsSuccessAction implements ActionTypeType<Post[]> {
  readonly type = 'LOAD_ITEMS_SUCCESS';

  constructor (public payload: Post[]) {

  }
}
// export interface RemovePostAction {
//   type: string,
//   payload: string,
// }

export interface ActionTypeType<T> {
  readonly type: string;
  readonly payload: T;
}

export type ActionType = RemovePostAction | AddPostAction | LoadPostsSuccessAction;

export function loadPostsAction (): Thunk<void> {
  return (dispatch : Dispatch) : void => {
    dispatch({
      type: 'LOAD_ITEMS',
    });

    fetch ('/items-list')
      .then((response) => response.json())
      .then((posts: Array<Post>) => {
        dispatch(loadPostsSuccessAction(posts));
      })
      .catch(() => {
        console.log(222);
      })
  } 
}

export function loadPostsSuccessAction (payload: Array<Post>): ActionTypeType<Post[]> {
  return {
    type: 'LOAD_ITEMS_SUCCESS',
    payload,
  }
}

export function addPostAction (payload: Post) : ActionTypeType<Post> {
  return {
    type: 'ADD_POST',
    payload
  }
}

// export const addPostAction = createAction('ADD_POST', (post: Post) => ({post}));

// console.log(addPostAction({name: 'item1', id: '1', x: 100, y:50}));

export function removePostAction (payload: string) : ActionTypeType<string> {
  return {
    type: 'REMOVE_POST',
    payload,
  }
}

