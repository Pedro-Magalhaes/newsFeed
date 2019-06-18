

// default values
let selectedCountry = "br";
let selectedCategory = "general"
const pageSize = 12;
const basePage = 1;
let currentPage = basePage;

function changeSearch( type ) { // TODO fazer logica de mudança
	if( type == 'categoria' ) {
		document.getElementById('btn_categoria').classList.add("selecionado");
		document.getElementById('btn_busca').classList.remove("selecionado");
		document.getElementById('queryInput').style.display = 'none';
		document.getElementById('categoria').style.display = 'flex';
	} else if ( type == 'busca' ) {
		document.getElementById('btn_busca').classList.add("selecionado");
		document.getElementById('btn_categoria').classList.remove("selecionado");
		document.getElementById('categoria').style.display = 'none';
		document.getElementById('queryInput').style.display = 'flex';
	}
}

function submit() {
	currentPage = basePage;
	console.log(pageSize);
	loadResults(selectedCountry,selectedCategory, currentPage ,pageSize);
}

function submitSearch() {
	let query = getQueryInputText();
	currentPage = basePage;
	console.log(pageSize);
	searchByQuery(query,currentPage,pageSize);
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
loadResults(selectedCountry,selectedCategory,basePage, pageSize);


function getQueryInputText() {
	let term = document.getElementById('query');
	
	if( term ) {
		return term.value;
	}
	return '';
	
}