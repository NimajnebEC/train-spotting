export const prerender = true;
export const ssr = false;

export function load({ url }) {
	const path = url.pathname.split("/");
	path.shift();

	return {
		path,
	};
}
