<script context="module">
  const allPosts = import.meta.glob("./**/*.{md,svx}");

  let body = [];
  for (let path in allPosts) {
    body.push(
      allPosts[path]().then(({ metadata }) => {
        return { path, metadata };
      })
    );
  }

  export const load = async () => {
    const posts = await Promise.all(body);
    return {
      props: {
        posts,
      },
    };
  };
</script>

<script>
  export let posts;
  const dateSortedPosts = posts.slice().sort((post1, post2) => {
    return new Date(post2.metadata.date) - new Date(post1.metadata.date);
  });
</script>

<!-- {JSON.stringify(posts)} -->

<div class="space-y-3">
  {#each dateSortedPosts as { path, metadata: { title, tags, date } }}
    <p>{new Date(date).toLocaleDateString("ru")}</p>
    <h1><a href={`/blog/${path.replace(".md", "")}`}>{title}</a></h1>
    <div class="space-x-2">
      {#each tags as tag}
        <a href={`/tags/${tag}`}>{tag}</a>
      {/each}
    </div>
  {/each}
</div>
