const xhttp = new XMLHttpRequest();
// https://newsapi.org/docs/endpoints/top-headlines descrição da api
const baseUrl = "https://newsapi.org/v2/top-headlines"
const apiKey = "a36cd6c4d2034e688b4ecc8b0e22b548";


// declarando o listener da jamada http
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let json = JSON.parse(xhttp.responseText);
       let text = json.totalResults + "  " + json.status;
       buildView(json.articles);
	}
};

function buildUrl(base, parametersArray) {
    base = base || baseUrl;
    if( !parametersArray ) {
        return base + "?" + apiKey;
    } else {
        return base + "?" + parametersArray.join("&");
    }
}

// recebe o pais a categoria e a query para a chamada à Api
// se qualquer um deles for nulo utilizamos o default
// country sigla do pais, category string representando a categoria
// query String representando a keyword para busca
// page inteiro para paginação de 0 a (total result/ pageSize)
function loadResults(country, category, query, page) {
    country = country || selectedCountry;
    category = category || selectedCategory;
    page = page || basePage;

    const UrlParametersArray =  [`country=${country}`, `category=${category}`,
                                 `page=${page}`, `apiKey=${apiKey}`]
    if ( query ) {
        console.log(query);
        UrlParametersArray.push(`q=${query}`);
    } 
    const url = buildUrl( baseUrl, UrlParametersArray );
    xhttp.open("GET", url , true);
    xhttp.send();
}