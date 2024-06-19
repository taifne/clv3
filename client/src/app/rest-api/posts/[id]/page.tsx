"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import useCallAPIState from "@/hooks/useCallAPIState";
import CommentService from "@/services/comment";
import PostService from "@/services/post";
import { CommentData } from "@/types/comment";
import Comment from "@/components/comentBox";
import { Post } from "@/types/post";
import PostCard from "@/components/postCard";
import { User } from "@/types/user";
import UserService from "@/services/user";
import UserComponent from "@/components/userIcon";
import RenderState from "@/components/ConditionRender/RenderState";
import Breadcrumbs from "@/components/BreadCrum/AutoMapBreadCrum";
import {
  Modal,
  Button,
  Text,
  ActionIcon,
  Input,
  Password,
  Checkbox,
} from "rizzui";
interface PostPageProps {
  params: {
    id: string;
  };
}
import { BsSendArrowDownFill } from "react-icons/bs";

const PostPage: React.FC<PostPageProps> = ({ params }) => {

  const [apiState, updateApiState] = useCallAPIState<CommentData>({ data: [] });
  const [postState, updatePostState] = useCallAPIState<Post>({ data: { id: 999, content: "", title: "", createdAt: "" } });
  const [userState, updateUserState] = useCallAPIState<User[]>({ data: [] });
  const [userId, setUserId] = useState<number | null>(null);
  const [parentId, setParentId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [deleteCommentState, setDeleteDecisionState] = useState(false);
  const [deleteCommentId, setDeletedCommentId] = useState(0);
  const handleUserClick = (userId: number) => {

    setUserId(userId);
  };

  const handleParentId = (parentId: number) => {
    setParentId(parentId);
  };

  const ReplieAComment = async () => {

    await CommentService.createAComment({ parentId: parentId, userId: userId, postId: postState.data?.id, content: replyContent });
    OnUpdateComment()
  };
  const CreateAComment = async () => {

    await CommentService.createAComment({ parentId: null, userId: userId, postId: postState.data?.id, content: newContent });
    OnUpdateComment()
  };
  const SetDeleteAComment = async (commentId: number) => {
    setDeletedCommentId(commentId);
    setDeleteDecisionState(true);

  };
  const DeleteAComment = async () => {
    setDeleteDecisionState(false);
    await CommentService.deleteMyComment(deleteCommentId);

    OnUpdateComment()
  };

  const handleChangeMessage = async (content: string) => {
    await setReplyContent(content);
  };
  const OnUpdateComment = async () => {
    try {
      updateApiState("start", []);
      const comments = await CommentService.getCommentsByPostId(Number(params.id));
      updateApiState("success", comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      updateApiState("error");
    }
  }

  useEffect(() => {
    setUserId(userState?.data[0]?.id ?? null);
    console.log(userId)
  }, [userState]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        updateApiState("start", []);
        const comments = await CommentService.getCommentsByPostId(Number(params.id));
        updateApiState("success", comments || []);

        updatePostState("start");
        const post = await PostService.getPostById(Number(params.id));
        updatePostState("success", post.data);

        updateUserState("start", []);
        const users = await UserService.getUsers();
        updateUserState("success", users.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        updateApiState("error");
        updatePostState("error");
        updateUserState("error");
      }
    };

    fetchData();
  }, [params.id, updateApiState, updatePostState, updatePostState]);
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && newContent !== "") {
        setNewContent("")
        CreateAComment();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [CreateAComment]);

  return (
    <>
      <div className="flex bg-white py-3 px-12 ">   <Breadcrumbs url={`rest-api/posts/${params.id}`} /></div>

      <div className="flex flex-row p-2 w-full select-none min-h-99 max-h-100">

        <div className="flex w-2/5 flex-col items-stretch h-50 max-h-96">
          <Modal className="select-none fixed top-0 left-0 w-full h-full flex justify-center items-center" isOpen={deleteCommentState} onClose={() => setDeleteDecisionState(false)}>
            <div className="m-auto bg-white w-80 h-52 border-2 rounded-2xl">
              <div className="mb-7 flex flex-col  justify-start h-full rounded-2xl ">
                <div className="w-full border-b border-gray text-center font-semibold h-4/5 p-4 rounded-t-2xl flex flex-col justify-center items-center">Delete Comment !!
                  <p className="text-sm font-extralight">are you sure you want to delete this comment from this post!</p>
                </div>

                <div className="flex justify-evenly w-full">
                  <ActionIcon
                    size="sm"
                    variant="text"
                    className="absolete top-0 right-0 hover:scale-110"
                    onClick={() => setDeleteDecisionState(false)}
                  >
                    Cancel
                  </ActionIcon>

                  <Button

                    size="lg"
                    className="col-span-2 mt-2 hover:text-red-600 border-hidden"
                    onClick={DeleteAComment}
                  >
                    Delete
                  </Button></div>

              </div>
            </div>
          </Modal>
          <RenderState
            loading={postState.loading}
            success={postState.success}
            error={postState.error}
          >
            {postState.success && (
              <div className="p-6 h-4/5">
                <PostCard key={postState.data?.id} {...postState.data} />
              </div>
            )}
          </RenderState>
          <RenderState
            loading={userState.loading}
            success={userState.success && userId !== null ? true : false}
            error={userState.error}
          >
            {userState.success && (
              <div className="p-6 flex flex-row">
                {userState.data.map((user) => (
                  <UserComponent
                    key={user.id}
                    highlight={user.id === userId}
                    user={user}
                    onUserClick={handleUserClick}
                  />
                ))}
              </div>
            )}
          </RenderState>
        </div>


        <div className="flex w-3/5 max-h-99 bg-white overflow-y-scroll p-3 rounded-lg">
          <RenderState
            loading={apiState.loading}
            success={apiState.success}
            error={apiState.error}
          >
            {apiState.success && (
              <div>
                {apiState.data.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    userId={userId}
                    OnUpdateComment={OnUpdateComment}
                    setParentID={handleParentId}
                    handleChangeMess={handleChangeMessage}
                    CreateAComment={ReplieAComment}
                    DeleteAComment={SetDeleteAComment}
                  />
                ))}
              </div>
            )}
          </RenderState>
        
        </div>  <div className="fixed bottom-0 right-0 h-12 w-3/5 bg-white rounded-md ">
            <div className="flex w-full  justify-center items-center">
              <div className="w-full">

                <input
                  id="comment"
                  autoComplete="off"
                  name="comment"
                  className="w-full h-full outline-none px-2"
                  value={newContent}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => { setNewContent(e.target.value) }}
                />
              </div>
              <button id="sent-btn" className="p-2 h-full flex items-center justify-end" onClick={CreateAComment} type="submit"><BsSendArrowDownFill className="text-xl h-full text-center hover:text-cyan-400" /></button>
            </div>
          </div>
      </div>
    </>

  );
};

export default PostPage;
