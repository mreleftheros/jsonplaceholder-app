import {
  Title,
  createRouteData,
  useRouteData,
  useSearchParams
} from "solid-start";
import Content from "~/components/layout/Content";
import { TITLE } from "~/site";
import { createSignal, createEffect } from "solid-js";
import Post from "~/components/Post";
import Pagination from "~/components/Pagination";

export const routeData = ({ location }) => {
  return createRouteData(
    async key => {
      try {
        const urls = [
          `https://jsonplaceholder.typicode.com/posts?_page=${key[0] || 1}${
            key[1] ? `&q=${key[1]}` : ""
          }`,
          "https://jsonplaceholder.typicode.com/users"
        ];

        return await Promise.all(
          urls.map(u => fetch(u).then(res => res.json()))
        ).then(values =>
          values[0].map(p => ({
            ...p,
            userUsername: values[1].find(u => u.id === p.userId).username
          }))
        );
      } catch (err) {
        console.log(err);
        throw Error("Error fetching data.");
      }
    },
    {
      key: () => [location.query.page, location.query.q]
    }
  );
};

const Index = () => {
  const posts = useRouteData();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = () => +searchParams.page || 1;
  const [searchOpen, setSearchOpen] = createSignal(false);
  let searchInput;

  createEffect(() => searchOpen() && searchInput.select());

  const openSearch = () => setSearchOpen(true);

  const updatePage = val => setSearchParams({ page: page() + val });

  return (
    <>
      <Title>Posts | {TITLE}</Title>
      <Content>
        <div class="search" classList={{ toggle: searchOpen() }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            data-supported-dps="16x16"
            fill="currentColor"
            width="16"
            height="16"
            focusable="false"
            class="search-icon"
          >
            <path d="M14.56 12.44L11.3 9.18a5.51 5.51 0 10-2.12 2.12l3.26 3.26a1.5 1.5 0 102.12-2.12zM3 6.5A3.5 3.5 0 116.5 10 3.5 3.5 0 013 6.5z"></path>
          </svg>
          <input
            class="search-input pl-xl pr-xxl py-s bg-primary-500 rounded-l"
            type="text"
            value={searchParams.q || ""}
            onInput={({ target }) => setSearchParams({ q: target.value })}
            ref={searchInput}
            onClick={openSearch}
          />
          <p class="search-clear" onClick={() => setSearchParams({ q: "" })}>
            Reset
          </p>
        </div>
        <div class="flow">
          <Pagination page={page()} onPage={updatePage} />
          <Switch
            fallback={<p>Error fetching data...Please refresh your browser</p>}
          >
            {/* <Match when={posts.loading}>
              <Loading />
            </Match> */}
            <Match when={!posts.error}>
              <For each={posts()} fallback={<p>No matching results found.</p>}>
                {p => <Post {...p} />}
              </For>
            </Match>
          </Switch>
          <Pagination page={page()} onPage={updatePage} />
        </div>
      </Content>
    </>
  );
};

export default Index;
