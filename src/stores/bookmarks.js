import { writable } from 'svelte/store';

export const bookmarks = writable([]); 

bookmarks.set([
    { id: 1, title: 'Sample Bookmark 1', url: 'https://example.com/1', date: '2024-01-01', author: 'John Doe', site: 'Example', length: '100', readingTime: '5 minutes', tags: ['tag1', 'tag2'] },
    { id: 2, title: 'Sample Bookmark 2', url: 'https://example.com/2', date: '2024-01-02', author: 'Jane Doe', site: 'Example', length: '100', readingTime: '5 minutes', tags: ['tag1', 'tag2'] },
]); 