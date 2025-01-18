import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	try {
		const { url } = await request.json();
		
		const response = await fetch(url);
		const html = await response.text();
		const dom = new JSDOM(html);
		const reader = new Readability(dom.window.document);
		const article = reader.parse();

		return json({
			content: article?.textContent || 'No content available'
		});
	} catch (error) {
		console.error('Error parsing article:', error);
		return json({
			content: 'Error loading article content'
		}, { status: 500 });
	}
} 