import React, {useEffect} from 'react';
import { Spin, Row, Col, Button} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {loadPostsAction, addPostAction, Post, removePostAction} from './actions';
import {Dispatch} from 'redux';
import shortid from 'shortid';
import Diagram from './Diagram';

export default function Index () : JSX.Element {
  const dispatch: Dispatch<any> = useDispatch();
  const posts: Array<Post> = useSelector(({index: {posts}} : {index: {posts: Array<Post>}}) => posts);
  const postsLoader: boolean = useSelector(({index: {loaders: {posts}}} : {index: {loaders: {posts: boolean}}}) => posts);
  // const svgContainerRef: React.RefObject<Col> = useRef<Col>(null);

  useEffect((): void => {
    if (!postsLoader) {
      dispatch(loadPostsAction());
    }
  }, [dispatch, postsLoader]);

  function addPost (): void {
    const id: string = shortid();

    dispatch(addPostAction({
      name: `Item ${id}`,
      id,
      x: Math.round(Math.random() * 1400),
      y: Math.round(Math.random() * 1400),
    }))
  }

  function removePost (id: string) {
    return function () : void {
      dispatch(removePostAction(id));
    }
  }

  return (
    <div>
      <Row>
        <Col span={8}>
          <Button key="add" onClick={addPost}>Добавить элемент</Button>
          {
            !postsLoader ? (
              <Spin />
            ) : (
              <ul>
                {
                  posts.map(({name, id}: Post) : JSX.Element => (
                    <li key={id}>
                      {name}
                      <Button onClick={removePost(id)}>Remove</Button>
                    </li>
                  ))
                }
              </ul>
            )
          }
        </Col>
        <Col span={16}>
          {
            postsLoader ? (
              <Diagram
                posts={posts}
              />
            ) : null
          }
        </Col>
      </Row>
    </div>
  )
};