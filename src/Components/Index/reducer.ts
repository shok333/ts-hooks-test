import produce from 'immer';

interface Post {
  name: string,
  id: string
}

interface Loaders {
  posts: boolean,
}

export interface State {
  posts: Array<Post>,
  loaders: Loaders,
}

interface Action {
  type: string,
  post: Post,
  postId: string,
  posts: Array<Post>
}

export function getInitialState() : State {
  return {
    posts: [],
    loaders: {
      posts: false,
    }
  }
} 

export function reducer (state : State = getInitialState() , action : Action) : State {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'LOAD_ITEMS_SUCCESS':
        draft.posts = action.posts;
        draft.loaders.posts = true;

        break;

      case 'ADD_POST':
        draft.posts.push(action.post);

        break;

      case 'REMOVE_POST':
        draft.posts = draft.posts.filter((post) => (post.id !== action.postId));

        break;
    }
  })
}