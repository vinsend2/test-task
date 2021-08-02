const API_KEY: string = 'cD7jqGNSMKTGMuW2mXdrktm3aNMPaLBi';

export async function getImg(tag: string, func: any, gerError?: any) {
	const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`
	let res = await fetch(url);

	if (res.ok) {
		let json = await res.json();
		func(json.data.image_url, tag);
	} else {
		gerError(res.status);
	}
}

  
