const Content = props => {
  return (
    <div class="content py-xl">
      <aside class="content-child content-aside1">1</aside>
      <section class="content-child content-main flow">{props.children}</section>
      <aside class="content-child content-aside2">2</aside>
    </div>
  );
};

export default Content;
