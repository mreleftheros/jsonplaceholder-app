import { A } from "solid-start";

const Post = props => {
  return (
    <div class="post rounded-l bg-primary-700 text-primary-50">
      <A href={`/posts/${props.id}`}>
        <h2 class="p-m">{props.title}</h2>
        <p class="post-author p-m mt-auto opaque">
          <A href={`/users/${props.userId}`}>
            <em>By {props.userUsername}</em>
          </A>
        </p>
      </A>
    </div>
  );
};

export default Post;
