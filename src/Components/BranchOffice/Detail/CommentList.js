import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';

import apiCommentList from '../../../services/api/comment/list';
import CommentItem from './CommentItem';

const CommentList = ({index, qnaIndex, qnaStatus}) => {
  const [commentList, setCommentList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getCommentList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const getCommentList = async () => {
    await apiCommentList(index, onSuccessListComment);
  };

  const onSuccessListComment = data => {
    const indexList = Array.from(new Set(data.map(item => item.idx)));
    // console.log('indexList:', indexList);
    const reducedData = indexList.map(id =>
      data
        .filter(item => item.idx === id)
        .reduce(
          (sum, cur, idx) => {
            sum = {
              idx: cur.idx,
              inquiryIndex: cur.inquiryIndex,
              staffId: cur.staffId,
              content: cur.content,
              updateDate: cur.updateDate,
              name: cur.name,
              rankName: cur.rankName,
              departName: cur.departName,
              attachments: [...sum.attachments],
            };
            if (cur.imagePath) {
              sum.attachments.push({
                path: cur.imagePath,
                name: cur.imageName,
                type: cur.imageType,
              });
            }

            return sum;
          },
          {attachments: []},
        ),
    );

    setCommentList(reducedData);
    // console.log('reducedData:', JSON.stringify(reducedData, null, '\t'));
  };

  return commentList.map(item => (
    <CommentItem
      key={item.idx}
      commentData={item}
      commentList={commentList}
      setCommentList={setCommentList}
      qnaIndex={qnaIndex}
      qnaStatus={qnaStatus}
    />
  ));
  // return <Text>parkcom</Text>;
};

export default CommentList;
