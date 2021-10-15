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

<div class="p-6">
  <h1>{tag}</h1>
</div>

<ul class="space-y-3">
  {#each filteredPosts as { path, metadata: { title, tags } }}
    <li>
      <a
        class="text-xl font-bold text-red-500 block mb-2"
        href={`/blog/${path.replace(".md", "")}`}>{title}</a
      >
      <div class="space-x-2">
        {#each tags as tag}
          <a class="text-xs uppercase px-2 py-0 bg-gray-500 rounded text-gray-100" href={`/tags/${tag}`}>{tag}</a>
        {/each}
      </div>
    </li>
  {/each}
</ul>

<!-- {JSON.stringify(filteredPosts)} -->
