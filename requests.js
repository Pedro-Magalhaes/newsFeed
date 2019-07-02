const xhttp = new XMLHttpRequest();
// https://newsapi.org/docs/endpoints descrição da api
const baseUrl = "https://newsapi.org/v2/top-headlines";
const apiKey = "a36cd6c4d2034e688b4ecc8b0e22b548";
const everythingUrl = "https://newsapi.org/v2/everything";
let global_append = false;

/*
	Listener que recebe a resposta da chamada à API
	PRÉ: resposta da chamada à API em xhttp.responseText (um array de elementos jsons)
	PÓS: chamada à função buildView, passando como parâmetro um array de jsons das notícias
*/
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let json = JSON.parse(xhttp.responseText);
       let text = json.totalResults + "  " + json.status;
       buildView(json.articles, global_append);
	}
};

/*
	Monta uma string com base nos parâmetros e url base fornecidos
	PRÉ: base é uma string e parametersArray é um array de strings
	PÓS: uma string concatenando a string 'base' com a chave da API (global) ou
		o array de parâmetros separados pelo caractere '&'
*/
function buildUrl(base, parametersArray) {
    base = base || baseUrl;
    if( !parametersArray ) {
        return base + "?" + apiKey;
    } else {
        return base + "?" + parametersArray.join("&");
    }
}


/*
	Recebe o país, a categoria, a página e o tamanho de página e realiza a chamada à API
	PRÉ: country é uma string com a sigla do país (dentre os permitidos pela API),
		category é uma categoria dentre as permitidas pela API,
		page é um inteiro maior que zero,
		pageSize é um inteiro maior que zero
	PÓS: é realizada a chamada à API conforme as variáveis entradas
*/
function loadResults(country, category, page, pageSize, append = false) {
	global_append = append;
    country = country || selectedCountry;
    category = category || selectedCategory;
    page = page || basePage;
    const UrlParametersArray =  [`country=${country}`, `category=${category}`,
                                 `page=${page}`, `apiKey=${apiKey}`,`pageSize=${pageSize}`]
    
    const url = buildUrl( baseUrl, UrlParametersArray );
    xhttp.open("GET", url , true);
    xhttp.send();
}

/*
	Recebe uma busca, a página e o tamanho de página e realiza a chamada à API
	PRÉ: query é uma string de busca para a chamada à API
		page é um inteiro maior que zero,
		pageSize é um inteiro maior que zero
	PÓS: é realizada a chamada à API conforme as variáveis entradas
*/
function searchByQuery(query, page, pageSize, append = false) {
	global_append = append;
	const UrlParametersArray =  [`q=${query}`,
                                 `page=${page}`, `apiKey=${apiKey}`,
								 `pageSize=${pageSize}`]
	const url = buildUrl( everythingUrl, UrlParametersArray );
    xhttp.open("GET", url , true);
    xhttp.send();
	
}