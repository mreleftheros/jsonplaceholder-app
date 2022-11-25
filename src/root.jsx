// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title
} from "solid-start";
import Nav from "./components/Nav";
import "./korg/index.scss";
import { TITLE } from "./site";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>{TITLE}</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <header className="header">
              <Nav />
            </header>
            <main className="main">
              <Routes>
                <FileRoutes />
              </Routes>
            </main>
            <footer className="footer bg-primary-900 text-primary-100">
              <p>
                Copyright &copy; {new Date().getFullYear()} {TITLE}
              </p>
            </footer>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
