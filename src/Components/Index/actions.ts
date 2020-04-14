
import fetchMock from 'fetch-mock';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import { createAction, createActions } from 'redux-actions';

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

// export class AddPostAction implements IAction<Post> {
//   readonly type = 'ADD_POST';

//   constructor (public payload: Post) {

//   }
// }

type Cms = {
  readonly a: number,
  b: number
}

type CmsExclude = Omit<Cms, 'b'> 

const WWW: Cms = {
  a: 10,
  b: 20,
}

const ddd: CmsExclude = {
  a: 222,
};

console.log(ddd);

class AddPostAction {
  readonly type = 'ADD_POST';

  constructor (public payload: Post) {}
}

class RemovePostAction {
  readonly type = 'REMOVE_POST';

  constructor (public payload: string) {}
}

class LoadPostsSuccessAction {
  readonly type = 'LOAD_ITEMS_SUCCESS';
  public payload: Post[];

  constructor (payload: Post[]) {
    this.payload = payload;
  }
}

// class ReverseItemsAction {
//   readonly type = 'REVERSE_ITEMS';
// }

type ReverseItemsAction = {
  type: 'REVERSE_ITEMS'
}

export type ActionType = RemovePostAction | AddPostAction | LoadPostsSuccessAction | ReverseItemsAction;

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

// export function loadPostsSuccessAction (payload: Array<Post>): LoadPostsSuccessAction {
//   return {
//     type: 'LOAD_ITEMS_SUCCESS',
//     payload,
//   }
// }
// export function addPostAction (payload: Post) : AddPostAction {
//   return {
//     type: 'ADD_POST',
//     payload
//   }
// }
// export function removePostAction (payload: string) : RemovePostAction {
//   return {
//     type: 'REMOVE_POST',
//     payload,
//   }
// }

export const addPostAction = createAction('ADD_POST');
export const removePostAction = createAction('REMOVE_POST');
export const loadPostsSuccessAction = createAction('LOAD_ITEMS_SUCCESS');

export function reverseItemsAction () : ReverseItemsAction {
  return {
    type: 'REVERSE_ITEMS',
  }
}
// export const reverseItemsAction = createAction('REVERSE_ITEMS');
