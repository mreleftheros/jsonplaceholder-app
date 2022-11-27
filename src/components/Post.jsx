import { A } from "solid-start";

const Post = props => {
  return (
    <div class="post rounded-l bg-primary-200">
      <A href={`/posts/${props.id}`} class="p-m post-link">
        <div className="post-inner">
          <h2>{props.title}</h2>
          <p class="mt-auto opaque">
            <A href={`/users/${props.userId}`}><em>By {props.userUsername}</em></A>
          </p>
        </div>
      </A>
    </div>
  );
};

export default Post;
