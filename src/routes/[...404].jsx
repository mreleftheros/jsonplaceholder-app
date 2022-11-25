import { Title, A } from "solid-start";
import { HttpStatusCode } from "solid-start/server";
import { TITLE } from "~/site";
import notFound from "~/assets/not-found.svg";

export default function NotFound() {
  return (
    <div class="p-l flow flex-center">
      <Title>Not Found | {TITLE}</Title>
      <HttpStatusCode code={404} />
      <div>
        <h1>Oops...Page is missing!</h1>
        <A href="/">
          <button class="btn flex-center bg-primary-600 rounded-l p-m m-l text-primary-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              fill="currentColor"
              class="mercado-match"
              width="24"
              height="24"
              focusable="false"
            >
              <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"></path>
            </svg>
            <span>Go To Home</span>
          </button>
        </A>
      </div>
      <img src={notFound} alt="" />
    </div>
  );
}
