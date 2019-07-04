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
	Justsificativa: foram passados os parâmetros adequados conforme requirido por buildView.
		O parâmetro json.articles é proveniente da definição da API como resposta e o global_append
		é uma booleana que indica se os artigos devem ser adicionados ao fim ("ver mais") ou
		substituídos (nova busca).
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
	PÓS: uma string concatenando a string 'base' com a chave da API (global) (linha 38) ou
		o array de parâmetros separados pelo caractere '&' (linha 40)
	Justificativa: a string base é substituída pela url padrão se não for informada.
		A concatenação das strings monta a string a ser retornada formatada
		conforme necessário para o funcionamento da API.
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
	PRÉ: country é uma string com a sigla do país dentre os disponíveis no site e na API,
		category é uma categoria dentre as disponíveis no site e na API,
		page é um inteiro maior que zero,
		pageSize é um inteiro maior que zero
	PÓS: é realizada a chamada à API conforme as variáveis entradas (chamada à buildUrl monta o URL,
		métodos de xhttp fazem a chamada)
	Justificativa: A função faz a verificação dos valores de entrada (country, category, 
		page e pageSize), informando o erro caso necessário ou utilizando o valor padrão.
		São informados os parâmetros através do UrlParametersArray e chamada a função
		buildUrl para montar o url e realizar a chamada à API.
*/
function loadResults(country, category, page, pageSize, append = false) {
	global_append = append;
	
	if(!possibleCountries.includes(country)) {
		let error = "O pais " + country + " não é uma é uma opção válida";
		console.error(error);
		showErrorInView(error);
		return;
	}
	
	if(!possibleCategories.includes(category)) {
		let error = "A categoria " + category + " não é uma opção válida";
		console.error(error);
		showErrorInView(error);
		return;
	}
	
	if(page < 1)
		page = basePage;
	
	if(pageSize < 1)
		pageSize = basePageSize;
	
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
	PÓS: é realizada a chamada à API conforme as variáveis entradas (chamada à buildUrl monta o URL,
		métodos de xhttp fazem a chamada)
	Justificativa: A função faz a verificação dos valores de entrada (query, page e pageSize),
		informando o erro caso necessário ou utilizando o valor padrão.
		São informados os parâmetros através do UrlParametersArray e chamada a função
		buildUrl para montar o url e realizar a chamada à API.
*/
function searchByQuery(query, page, pageSize, append = false) {
	global_append = append;
	
	if(query.length == 0) {
		let error = "O campo de busca está vazio";
		console.error(error);
		showErrorInView(error);
		return;
	}
	
	if(page < 1)
		page = basePage;
	
	if(pageSize < 1)
		pageSize = basePageSize;
	
	const UrlParametersArray =  [`q=${query}`,
                                 `page=${page}`, `apiKey=${apiKey}`,
								 `pageSize=${pageSize}`]
	const url = buildUrl( everythingUrl, UrlParametersArray );
    xhttp.open("GET", url , true);
    xhttp.send();
	
}