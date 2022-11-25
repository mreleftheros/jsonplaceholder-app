import { A } from "solid-start";
import hero from "~/assets/hero.svg";

const Hero = () => {
  return (
    <section class="hero p-xxl text-primary-950">
      <figure class="container">
        <img src={hero} alt="woman with blog article" />
      </figure>
      <div class="flow container">
        <h1 class="hero-title">Welcome to Jsonplaceholder app</h1>
        <p class="hero-subtitle">
          Browse all users' amazing posts, todos and albums with one click!
        </p>
        <div class="hero-ctas mt-xxl">
          <A href="/posts">
            <button class="btn rounded-l bg-primary-700 text-primary-50">
              View Posts
            </button>
          </A>
          <A href="/todos">
            <button class="btn rounded-l bg-primary-700 text-primary-200">
              View Todos
            </button>
          </A>
          <A href="/users">
            <button class="btn rounded-l bg-primary-700 text-primary-200">
              View Users
            </button>
          </A>
        </div>
      </div>
    </section>
  );
};

export default Hero;
