import React, { ChangeEvent, useEffect, useState } from 'react';
import { Comment } from '@/types/comment';
import LetterAvatar from '@/components/Avatar/LetterAvatar';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import CommentService from '@/services/comment';
import { calculateTimeAgo } from '@/untils/TimeUntils';
import {
  Modal,
  Button,
  Text,
  ActionIcon,
  Input,
  Password,
  Checkbox,
} from "rizzui";
interface CommentProps {
  comment: Comment;
  userId: number | null;
  setParentID: (parentId: number) => void;
  handleChangeMess: (content: string) => void;
  CreateAComment: () => void;
  OnUpdateComment: () => void;
  DeleteAComment: (commentId: number) => void;
}

const CommentComponent: React.FC<CommentProps> = ({ comment, userId, setParentID, handleChangeMess, CreateAComment, DeleteAComment, OnUpdateComment }) => {
  const [replying, setReplying] = useState(false);
  const [liked, setLiked] = useState(false);
  const handleLike = async () => {

    const isIncluded = comment.likes.map(like => like.id).includes(userId ? userId : 0);

    if (isIncluded && liked) {
      const updated = comment.likes.map(like => like.id).filter(item => item !== userId);
      //  console.log(userId,updated)
      await CommentService.likeComment({ likes: updated }, comment.id);
      OnUpdateComment();
    }

    if (!isIncluded && !liked) {
      const updated = [...comment.likes.map(like => like.id), userId ? userId : 0];

      await CommentService.likeComment({ likes: updated }, comment.id);
      OnUpdateComment();
    }

    setLiked(!liked);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeMess(e.target.value);
  };

  const handleReply = () => {
    setParentID(comment.id);
    setReplying(true);
  };

  const handleDelete = () => {
    DeleteAComment(comment.id);
    

  };

  const handleCancelReply = () => {
    setReplying(false);
  };

  const handlePostReply = () => {
    CreateAComment();
    OnUpdateComment();
  };

  useEffect(() => {
    const like = comment.likes.map(like => like.id ? like.id : null).includes(userId);
    setLiked(like);
    setReplying(false);
  }, [userId]);

  return (
    <div className="bg-white rounded  p-1  relative w-full">
      <div className="flex justify-start items-center mb-1 w-full">
        <div className="flex-grow flex-col ml-1 w-full">
          <span className="text-gray-600 font-bold text-sm">
            <LetterAvatar label={comment.user.username} size={26} />&nbsp;{comment.user.username}
          </span>
          {comment.deletedAt ? (
            <p className="text-gray-300 text-sm mb-1 ml-5">this  message have been delete</p>
          ) : (
            <p className="ml-6 text-gray-700 text-sm font-semibold mb-1 bg-gray-100 px-2 py-1 rounded-md w-fit">{comment.content}</p>
          )}

          <div className="flex flex-row justify-evenly w-full">
            <div className="flex flex-row justify- w-4/5 pl-6">
              <span className="text-gray-500 text-sm mx-1">{calculateTimeAgo(new Date(comment.createdAt))}</span>
              <button
                onClick={handleLike}
                className={`text-sm mx-1 font-semibold ${liked ? 'text-cyan-500' : 'text-gray-500 hover:text-cyan-500'
                  }`}
              >
                {liked ? 'Liked' : 'Like'}
              </button>
              {userId === comment.user.id && (
                <button onClick={handleDelete} className="text-sm font-semibold mx-1 text-gray-500 hover:text-red-700">Delete</button>
              )}

              {userId !== comment.user.id && (
                <>
                  <button onClick={handleReply} className="text-sm mx-1 text-gray-500 hover:text-cyan-900">Reply</button>

                </>
              )}
            </div>

            <div className="flex w-1/5 justify-end pr-4">
              <span className="text-gray-500 text-sm mx-1">{comment?.likes?.length}</span>
              {liked ? (<AiFillLike className='text-cyan-500' />) : (<AiOutlineLike />)}</div>





          </div>
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="ml-6 border-l border-gray-300 pl-1">
          {comment.replies.map(reply => (
            <CommentComponent key={reply.id} comment={reply} userId={userId} setParentID={setParentID} handleChangeMess={handleChangeMess} CreateAComment={CreateAComment} OnUpdateComment={OnUpdateComment} DeleteAComment={DeleteAComment} />
          ))}
        </div>
      )}

      {replying && (
        <div className="ml-10 mt-2">
          <input onChange={handleInputChange} className="border border-gray-300 rounded p-1 w-full" placeholder="Write your reply..." />
          <div className="mt-1 flex justify-end">
            <button onClick={handleCancelReply} className="mr-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
            <button onClick={handlePostReply} className="text-sm bg-cyan-300 text-white px-2 py-1 rounded hover:bg-cyan-500">Reply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentComponent;
