import { createRouteData, useRouteData, A } from "solid-start";
import { createSignal } from "solid-js";

export const routeData = ({ params }) => {
  return createRouteData(
    async key => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${key}?_embed=comments`
        );
        return await res.json();
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    {
      key: () => params.id,
      initialValue: {}
    }
  );
};

const Index = () => {
  const post = useRouteData();
  const commentLen = () => post()?.comments?.length;
  const [showComments, setShowComments] = createSignal(false);

  return (
    <div class="flow text-primary-900">
      <button class="mx-s btn bg-primary-500 opaque rounded-s my-l">
        <A href="/posts">🠐 Back To Posts</A>
      </button>
      <div class="flow container bg-primary-400 p-s rounded-s">
        <h1 class="">{post().title}</h1>
        <p>{post().body}</p>
        <button
          class="btn bg-primary-500 rounded-s opaque"
          onClick={() => setShowComments(prev => !prev)}
        >
          Comments ({commentLen()}) {showComments() ? "⮝" : "⮟"}
        </button>
          <Show when={showComments()}>
            <div class="flow">
              <For each={post()?.comments}>
                {p => (
                  <div class="bg-primary-300 p-s rounded-l">
                    <h4>
                      <strong>{p.email}</strong>
                    </h4>
                    <p>{p.body}</p>
                  </div>
                )}
              </For>
            </div>
          </Show>
      </div>
    </div>
  );
};

export default Index;
