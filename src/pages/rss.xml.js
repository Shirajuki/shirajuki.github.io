import rss from '@astrojs/rss';
import { SITE_AUTHOR, SITE_DESCRIPTION } from '../consts';
import { getAllPosts } from '@/lib/posts';

export async function GET(context) {
	const posts = await getAllPosts();
	return rss({
		title: SITE_AUTHOR,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
