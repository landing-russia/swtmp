<script context="module">
  const allPosts = import.meta.glob("../blog/**/*.{md,svx}");

  let body = [];
  for (let path in allPosts) {
    body.push(
      allPosts[path]().then(({ metadata }) => {
        return { path, metadata };
      })
    );
  }

  export const load = async ({ page }) => {
    const posts = await Promise.all(body);
    const tag = page.params.tag;
    const filteredPosts = posts.filter((post) => {
      return post.metadata.tags.includes(tag);
    });
    return {
      props: {
        filteredPosts,
        tag,
      },
    };
  };
</script>

<script>
  export let filteredPosts;
  export let tag;
</script>

<div class="p-6 prose">
  <h1>{tag}</h1>

  <div class="space-y-3">
    {#each filteredPosts as { path, metadata: { title, tags } }}
      <a href={`/blog/${path.replace(".md", "")}`}><h3>{title}</h3></a>
      <div class="space-x-2">
        {#each tags as tag}
          <a href={`/tags/${tag}`}>{tag}</a>
        {/each}
      </div>
    {/each}
  </div>
</div>
<!-- {JSON.stringify(filteredPosts)} -->
