import { mergeProps } from "solid-js";

const Pagination = props => {
  const merged = mergeProps({ page: 1, onPage: null, end: 9 }, props);

  console.log(merged);

  return (
    <div class="pagination flex-center">
      <button
        class={`pagination-btn btn bg-primary-400 rounded-s ${
          merged.page === 1 ? "" : "opaque"
        }`}
        disabled={merged.page === 1}
        onClick={[merged.onPage, -1]}
      >
        ⮜
      </button>
      <p>Page {merged.page}</p>
      <button
        class={`pagination-btn btn bg-primary-400 rounded-s ${
          merged.page > merged.end ? "" : "opaque"
        }`}
        disabled={merged.page > merged.end}
        onClick={[merged.onPage, 1]}
      >
        ⮞
      </button>
    </div>
  );
};

export default Pagination;
