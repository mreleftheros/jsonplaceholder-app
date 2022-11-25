import { Title } from "solid-start";
import Hero from "~/components/Hero";
import { TITLE } from "~/site";

export default function Home() {
  return (
    <>
      <Title>Home | {TITLE}</Title>
      <Hero />
    </>
  );
}
