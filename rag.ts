import * as cosense from "jsr:@cosense/types/rest";
if (Deno.args.length != 2) {
	Deno.stderr.writeSync(
		new TextEncoder().encode(
			"Usage: rag.ts PROJECT_NAME SEARCH_QUERY\n",
		),
	);
	Deno.exit(1);
}
const query = Deno.args[1];
const fetchres = await fetch(
	"https://scrapbox.io/api/pages/" + Deno.args[0] + "/search/query?q=" +
		query,
);
if (!fetchres.ok) {
	Deno.stderr.writeSync(
		new TextEncoder().encode(
			"Response is " + fetchres.statusText +
				". Below is Response Text:\n" + (await fetchres.text()) + "\n",
		),
	);
	Deno.exit(1);
}
const res = await fetchres.json() as cosense.SearchResult;
let totalPrintLength = 0;
const PRINT_LIMIT = 4096;
if (res.pages.length == 0) {
	Deno.stderr.writeSync(
		new TextEncoder().encode(
			"Response is " + fetchres.statusText +
				". Below is Response Text:\n" + (await fetchres.text()) + "\n",
		),
	);
	Deno.exit(1);
}
function stringByteLength(str: string) {
	return (encodeURIComponent(str).replace(/%../g, "x").length);
}
function print(str: string) {
	totalPrintLength += stringByteLength(str + "\n");
	console.log(str);
}
for (let index = 0; index < res.pages.length; index++) {
	if (totalPrintLength > PRINT_LIMIT) {
		break;
	}
	const element = res.pages[index];
	print("====== #" + (index + 1) + " Related Page=====");
	print("Page Name: " + element.title);
	for (let index2 = 0; index2 < element.lines.length; index2++) {
		const elementline = element.lines[index2];
		print(elementline);
	}
	print("\n");
}

console.log("In what context is "+query+" used? Please answer based on the content of the related page.");
Deno.stderr.writeSync(
	new TextEncoder().encode(
		totalPrintLength + "bytes(" + (totalPrintLength / 3) +
			"chars in cjk)\n",
	),
);
