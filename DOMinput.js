

// default values
let selectedCountry = "br";
let selectedCategory = "general"
const basePageSize = 12;
const basePage = 1;
const possibleCountries = ["br", "ar", "us", "mx", "ve", "pt", "co"]
const possibleCategories = ["general", "business", "entertainment", "health", "science", "sports", "technology"]
let currentPage = basePage;
let searchType = 'categoria';
let query = "";

/*
	Recebe uma string e altera as propriedades de alguns elementos com base nisso
	PRÉ: type é uma string com valor 'categoria' ou 'busca'
		(Verificação: as condicionais só resultam em alguma ação nesses dois casos)
	PÓS: de acordo com o valor de type, altera a classe dos botões btn_categoria e btn_busca
		e esconde ou exibe as categorias e a barra de busca
*/
function changeSearch( type ) { // TODO fazer logica de mudança
	if( type == 'categoria' ) {
		searchType = 'categoria';
		document.getElementById('btn_categoria').classList.add("selecionado");
		document.getElementById('btn_busca').classList.remove("selecionado");
		document.getElementById('queryInput').style.display = 'none';
		document.getElementById('categoria').style.display = 'flex';
	} else if ( type == 'busca' ) {
		searchType = 'busca';
		document.getElementById('btn_busca').classList.add("selecionado");
		document.getElementById('btn_categoria').classList.remove("selecionado");
		document.getElementById('categoria').style.display = 'none';
		document.getElementById('queryInput').style.display = 'flex';
	}
}

function submit() {
	currentPage = basePage;
	loadResults(selectedCountry,selectedCategory, currentPage, basePageSize);
}

function submitSearch() {
	query = getQueryInputText();
	currentPage = basePage;
	searchByQuery(query, currentPage, basePageSize);
}

function change(selected) {
	if( selected.id == "categoria" ) {
		selectedCategory = selected.options[selected.selectedIndex].value;
	}
	else if( selected.id == "pais" ) {
		selectedCountry = selected.options[selected.selectedIndex].value;
	}
	else {
		console.log("ERRO");
	}
}
// chamada inicial
loadResults(selectedCountry, selectedCategory, basePage, basePageSize);


function getQueryInputText() {
	let term = document.getElementById('query');
	
	if( term ) {
		return term.value;
	}
	return '';
	
}

function seeMore() {
	currentPage = currentPage + 1;
	if(searchType == 'categoria') {
		loadResults(selectedCountry, selectedCategory, currentPage, basePageSize, true);
	} else {
		searchByQuery(query, currentPage, basePageSize, true);
	}	
}