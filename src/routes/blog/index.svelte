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
    return new Date(post2.metadata.date) - new Date(post1.metadata.date)
  })
</script>

<!-- {JSON.stringify(posts)} -->

<ul class="space-y-3">
  {#each dateSortedPosts as { path, metadata: { title, tags, date } }}
    <li>
      <p class="text-xs font-medium">{new Date(date).toLocaleDateString('ru')}</p>
      <a
        class="text-xl font-bold text-red-500 block mb-2"
        href={`/blog/${path.replace(".md", "")}`}>{title}</a
      >
      <div class="space-x-2">
        {#each tags as tag}
          <a
            class="text-xs uppercase px-2 py-0 bg-gray-500 rounded text-gray-100"
            href={`/tags/${tag}`}>{tag}</a
          >
        {/each}
      </div>
    </li>
  {/each}
</ul>
