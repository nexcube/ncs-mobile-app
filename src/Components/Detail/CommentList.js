import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import apiListComment from '../../services/api/listComment';
import CommentItem from './CommentItem';

const CommentList = ({index}) => {
  const navigation = useNavigation();
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCommentList();
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCommentList = async () => {
    await apiListComment(index, onSuccessListComment);
  };

  const onSuccessListComment = data => {
    setCommentList(data);
    // console.log(JSON.stringify(data, null, '\t'));
  };

  return commentList.map(item => <CommentItem key={item.idx} data={item} />);
};

export default CommentList;
