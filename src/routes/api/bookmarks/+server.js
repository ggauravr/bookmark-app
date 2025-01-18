import { json } from '@sveltejs/kit';
import fetch from 'node-fetch'; // Ensure you have node-fetch installed
import { JSDOM } from 'jsdom'; // Ensure you have jsdom installed
import { Readability } from '@mozilla/readability'; // Import Readability
import supabase from '../../../lib/supabase-client';

function camelToKebab(camelCase) {
    return camelCase
        .replace(/([a-z])([A-Z])/g, '$1_$2') // Insert a hyphen between lowercase and uppercase letters
        .toLowerCase(); // Convert the entire string to lowercase
}

function kebabToCamel(kebabCase) {
    return kebabCase
        .replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

export async function GET() {
    const { data, error } = await supabase.from('bookmarks').select('*');

    if (error) {
        console.error('Error fetching bookmarks:', error);
        return json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
    }

    console.log("fetched bookmarks", data);

    return json({ bookmarks: data });
}

// New POST endpoint to save a bookmark
export async function POST({ request }) {
    const { url } = await request.json();

    // Fetch the content from the URL
    const response = await fetch(url);
    const text = await response.text();
    const dom = new JSDOM(text);
    const document = dom.window.document;

    // Use Readability to parse the document
    const article = new Readability(document).parse();

    // Extract metadata from the parsed article
    const title = article.title || 'No title';
    const author = article.byline || 'Unknown';
    const description = article.excerpt || 'No description';
    const publishedDate = article.publishedTime;
    const wordCount = article.textContent.split(/\s+/).length;
    const site = `${new URL(url).protocol}//${new URL(url).hostname}`;
    const path = `${site}${new URL(url).pathname}`;
    const readingTime = Math.ceil(wordCount / 200); // Approximate reading time at 200 words per minute
    const content = article.content;
    const textContent = article.textContent;

    // Here you would save the bookmark to your database
    const newBookmark = {
        url,
        title,
        path,
        author,
        description,
        published_date: publishedDate,
        word_count: wordCount,
        saved_at: new Date().toISOString(),
        site,
    };

    console.log("saved bookmark", newBookmark);
    const { data, error } = await supabase.from('bookmarks').insert(newBookmark);

    if (error) {
        console.error('Error saving bookmark:', error);
        return json({ error: 'Failed to save bookmark' }, { status: 500 });
    }

    // Return the new bookmark as a response
    return json(newBookmark, { status: 201 });
}
