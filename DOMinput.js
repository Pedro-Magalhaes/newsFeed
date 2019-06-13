

// default values
let selectedCountry = "br";
let selectedCategory = "general"
const pageSize = 20;
const basePage = 1;
let currentPage = basePage;
let visibility = 'none';

function changeSearch( type ) { // TODO fazer logica de mudança
	document.getElementById('queryInput').style.display = visibility;
	if(visibility == 'none') {
		visibility = 'flex';		
	} else {
		visibility = 'none';
	}
}

function submit() {
	currentPage = basePage;
	loadResults(selectedCountry,selectedCategory);
}

function submitSearch() {
	let query = getQueryInputText();
	currentPage = basePage;
	searchByQuery(query,currentPage);
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
loadResults(selectedCountry,selectedCategory,"",basePage);


function getQueryInputText() {
	let term = document.getElementById('query');
	
	if( term ) {
		return term.value;
	}
	return '';
	
}