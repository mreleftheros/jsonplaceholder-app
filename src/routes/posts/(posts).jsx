import { Title, createRouteData, useRouteData } from "solid-start";
import Loading from "~/components/Loading";
import { TITLE } from "~/site";

export const routeData = ({ location }) => {
  return createRouteData(
    async () => {
      const page = +location.query.page || 1;
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`);
      return await res.json();
    },
    {
      
      initialValue: []
    }
  );
};

const Index = () => {
  const posts = useRouteData();

  return (
    <>
      <Title>Posts | {TITLE}</Title>
      <Switch
        fallback={<p>Error fetching data...Please refresh your browser</p>}
      >
        <Match when={posts.loading}>
          <Loading />
        </Match>
        <Match when={!posts.error}>
          <For each={posts()}>{p => <div>{p.title}</div>}</For>
        </Match>
      </Switch>
    </>
  );
};

export default Index;
