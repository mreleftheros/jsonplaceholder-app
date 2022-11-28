import { useSearchParams, createRouteData, useRouteData } from "solid-start";

export const routeData = ({ location }) => {
  return createRouteData(
    async key => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${key[0]}`
      );
      return await res.json();
    },
    { key: () => [location.query.page || 1, "posts"] }
  );
};

const Index = () => {
  const posts = useRouteData();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <For each={posts()}>{p => <div>{p.title}</div>}</For>
      <button
        onClick={() =>
          setSearchParams(
            searchParams.page
              ? { page: +searchParams.page + 1 }
              : { page: 1 + 1 }
          )
        }
      >
        a
      </button>
      <p>page {searchParams.page || 1}</p>
    </>
  );
};

export default Index;
