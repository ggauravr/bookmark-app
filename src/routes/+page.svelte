<script>
	// SETUP: Add this to use Tailwind in your Svelte components
	import '../app.css';
	export let data;

	import { Avatar } from '@skeletonlabs/skeleton';
  import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
  import 'iconify-icon';

	let showModal = false;
	let selectedArticle = null;
	let articleContent = '';
	let isLoading = false;
  let value = 0;

	async function handleViewClick(url) {
		alert("viewing article", url);
		isLoading = true;
		showModal = true;
		try {
			const response = await fetch('/api/bookmark', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ url })
			});
			
			const data = await response.json();
			articleContent = data.content || 'No content available';
		} catch (error) {
			console.error('Error fetching article:', error);
			articleContent = 'Error loading article content';
		} finally {
			isLoading = false;
		}
	}

	function handleEditClick(url) {
		console.log("editing article", url);
	}

	function closeModal() {
		showModal = false;
		selectedArticle = null;
		articleContent = '';
	}
</script>

<div class="container mx-auto p-8 space-y-8">
  <div class="flex justify-start items-end">
    <h1 class="h1 mr-5">context.app</h1>
    <p class="text-lg text-gray-500">| Your context on the web</p>
  </div>
	
  <section class="flex justify-end items-center">
		<!-- <a class="btn variant-soft-primary" href="https://kit.svelte.dev/">SvelteKit</a>
		<a class="btn variant-soft-secondary" href="https://tailwindcss.com/">Tailwind</a>
		<a class="btn variant-soft-tertiary" href="https://github.com/">GitHub</a> -->


    <RadioGroup>
      <RadioItem bind:group={value} name="justify" value={0}>
        <!-- <iconify-icon icon="material-symbols:table-outline-sharp" width="24" height="24"></iconify-icon> -->Table
      </RadioItem>
      <RadioItem bind:group={value} name="justify" value={1}>
        <!-- <iconify-icon icon="material-symbols:table-rows-narrow-rounded" width="24" height="24"></iconify-icon> --> List
      </RadioItem>
      <RadioItem bind:group={value} name="justify" value={2}>
        <!-- <iconify-icon icon="material-symbols:table-outline-sharp" width="24" height="24"></iconify-icon> --> Gallery
      </RadioItem>
    </RadioGroup>

	</section>

  <div class="table-container">
    <table class="table table-hover">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date Published
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Author
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Site
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Length
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Reading Time
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Tags
          </th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each data.bookmarks.slice(0, 20) as bookmark (bookmark.id)}
          <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                <a href={bookmark.url} target="_blank">{bookmark.title}</a>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{bookmark.date}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{bookmark.author}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{bookmark.site}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{bookmark.length}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{bookmark.reading_time}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {#each bookmark.tags as tag}
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{tag}</span>
                {/each}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">            
              <div class="btn-group variant-filled">
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    
  </div>
</div>

<Avatar src="https://i.pravatar.cc/" />

{#if showModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
		<div class="bg-white p-6 rounded-lg shadow-lg">
			<h2 class="text-2xl font-bold mb-4">Article Content</h2>
			<div class="text-lg">{articleContent}</div>
		</div>
	</div>
{/if}
