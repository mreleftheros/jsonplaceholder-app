import { useRouteData, createRouteData } from "solid-start";
import Loading from "~/components/Loading";

export const routeData = ({ location }) => {
  return createRouteData(
    async key => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos?_page=${key[0] || 1}${
            key[1] ? `&q=${key[1]}` : ""
          }`
        );
        return await res.json();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    { initialValue: [], key: () => [location.query.page, location.query.q] }
  );
};

const Index = () => {
  const todos = useRouteData();

  return (
    <>
      <Switch fallback={<p>{todos.error}</p>}>
        <Match when={todos.loading}>
          <Loading />
        </Match>
        <Match when={!todos.error}>
          <For each={todos()}>{t => <div>{t.title}</div>}</For>
        </Match>
      </Switch>
    </>
  );
};

export default Index;
