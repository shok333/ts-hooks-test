
import fetchMock from 'fetch-mock';
import {Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';

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
  posts: Array<Post>
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

export function loadPostsSuccessAction (posts: Array<Post>): LoadPostsSuccessAction {
  return {
    type: 'LOAD_ITEMS_SUCCESS',
    posts,
  }
}

export interface AddPostAction {
  type: string,
  post: Post
}

export function addPostAction (post: Post) : AddPostAction {
  return {
    type: 'ADD_POST',
    post
  }
}

export interface RemovePostAction {
  type: string,
  postId: string,
}

export function removePostAction (postId: string) : RemovePostAction {
  return {
    type: 'REMOVE_POST',
    postId,
  }
}