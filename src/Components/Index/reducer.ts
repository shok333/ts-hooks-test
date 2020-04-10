import produce from 'immer';
import {ActionType, Post} from './actions';

// interface Post {
//   name: string,
//   id: string
// }

interface Loaders {
  posts: boolean,
}

export interface State {
  posts: Array<Post>,
  loaders: Loaders,
}

// interface Action {
//   type: string,
//   post: Post,
//   postId: string,
//   posts: Array<Post>
// }

export function getInitialState() : State {
  return {
    posts: [],
    loaders: {
      posts: false,
    }
  }
} 

export function reducer (state : State = getInitialState() , action : ActionType) : State {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'LOAD_ITEMS_SUCCESS':
        draft.posts = action.payload;
        draft.loaders.posts = true;

        break;

      case 'ADD_POST':
        draft.posts.push(action.payload);

        break;

      case 'REMOVE_POST':
        draft.posts = draft.posts.filter((post) => (post.id !== action.payload));

        break;
    }
  })
}