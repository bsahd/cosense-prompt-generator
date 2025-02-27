import * as cosense from "jsr:@cosense/types/rest";
const query = Deno.args[1];
const res = await (await fetch(
	"https://scrapbox.io/api/pages/"+Deno.args[0]+"/search/query?q=" + query,
)).json() as cosense.SearchResult;
let totalPrintLength = 0;
const PRINT_LIMIT = 2048;
function stringByteLength(str: string) {
	return (encodeURIComponent(str).replace(/%../g, "x").length);
}
function print(str:string){
    totalPrintLength += stringByteLength(str + "\n")
    console.log(str)
}
for (let index = 0; index < res.pages.length; index++) {
    if(totalPrintLength > PRINT_LIMIT){
        break;
    }
	const element = res.pages[index];
	print("======" + (index + 1) + "番目の関連ページ=====");
	print("ページ名: " + element.title);
	for (let index2 = 0; index2 < element.lines.length; index2++) {
		const elementline = element.lines[index2];
		print(elementline);
	}
	print("\n");
}

console.log("関連ページをまとめてください")
Deno.stderr.writeSync(new TextEncoder().encode(totalPrintLength+"bytes("+(totalPrintLength/3)+"chars in cjk)\n"))