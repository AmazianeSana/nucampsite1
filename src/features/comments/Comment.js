import React from 'react';
import { formatDate } from '../../utils/formatDate';

const Comment = ({comment}) => {
    const { text: commentText, rating, author, date } = comment;
     return (
        <p>{commentText}
           <be/>
           {rating}/5 stars -- {author}, {formatDate(date)}
        </p>
     )
};
export default Comment;