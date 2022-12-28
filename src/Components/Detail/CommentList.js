import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

import apiListComment from '../../services/api/listComment';
import CommentItem from './CommentItem';

const CommentList = ({index, setSpinner}) => {
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
    const indexList = Array.from(new Set(data.map(item => item.idx)));
    const reducedData = indexList.map(index =>
      data
        .filter(item => item.idx === index)
        .reduce(
          (sum, cur, idx) => {
            return (sum = {
              idx: cur.idx,
              inquiryIndex: cur.inquiryIndex,
              staffId: cur.staffId,
              content: cur.content,
              updateDate: cur.updateDate,
              name: cur.name,
              rankName: cur.rankName,
              departName: cur.departName,
              attachments: [
                ...sum.attachments,
                {
                  path: cur.imagePath,
                  name: cur.imageName,
                  type: cur.imageType,
                },
              ],
            });
          },
          {attachments: []},
        ),
    );

    setCommentList(reducedData);
    // console.log('reducedData:', JSON.stringify(reducedData, null, '\t'));
  };

  return commentList.map(item => (
    <CommentItem key={item.idx} data={item} setSpinner={setSpinner} />
  ));
  // return <Text>parkcom</Text>;
};

export default CommentList;
