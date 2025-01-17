export async function load() {
	// console.log('import.meta.env.VITE_SITE_URL', `${import.meta.env.VITE_SITE_URL}/api/posts`);
	try {
        console.log('fetching bookmarks', import.meta.env.VITE_SITE_URL);
		const response = await fetch(`${import.meta.env.VITE_SITE_URL}/api/bookmark`);
		const bookmarks = await response.json();

		return bookmarks;
	} catch (error) {
		console.error('Error fetching bookmarks:', error);
		return { bookmarks: [] };
	}
}