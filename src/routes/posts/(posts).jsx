import {
  Title,
  createRouteData,
  useRouteData,
  useSearchParams
} from "solid-start";
import Content from "~/components/layout/Content";
import Loading from "~/components/Loading";
import { TITLE } from "~/site";
import { createSignal } from "solid-js";

export const routeData = ({ location }) => {
  return createRouteData(
    async key => {
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
    },
    {
      initialValue: [],
      key: () => [location.query.page, location.query.q]
    }
  );
};

const Index = () => {
  const posts = useRouteData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchOpen, setSearchOpen] = createSignal(false);

  const toggleSearch = () => setSearchOpen(prev => !prev);

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
            class="search-input px-xl py-s bg-primary-400 rounded-l"
            type="text"
            value={searchParams.q || ""}
            onInput={({ target }) => setSearchParams({ q: target.value })}
            onClick={toggleSearch}
            onBlur={toggleSearch}
          />
        </div>
        <div class="bg-primary-300">
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
        </div>
      </Content>
    </>
  );
};

export default Index;