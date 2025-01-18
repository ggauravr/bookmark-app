<script>
	// SETUP: Add this to use Tailwind in your Svelte components
	import '../app.css';
	export let data;
	
	let showModal = false;
	let selectedArticle = null;
	let articleContent = '';
	let isLoading = false;

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

<table class="min-w-full divide-y divide-gray-200">
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
					<div class="text-sm text-gray-900">
						<button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" on:click={() => handleViewClick(bookmark.url)}>
							View
						</button>
						<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
							Edit
						</button>
						<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
							Delete
						</button>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

{#if showModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
		<div class="bg-white p-6 rounded-lg shadow-lg">
			<h2 class="text-2xl font-bold mb-4">Article Content</h2>
			<div class="text-lg">{articleContent}</div>
		</div>
	</div>
{/if}
