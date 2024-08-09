export const prerender = true;
export const ssr = false;

export function load({ url }) {
	const path = url.pathname.split("/").filter((s) => s != "");
	if (path.length == 0) path.push("");

	return {
		path,
	};
}
