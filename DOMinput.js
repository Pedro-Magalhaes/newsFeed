

// default values
let selectedCountry = "br";
let selectedCategory = "general"
const pageSize = 20;
const basePage = 0;


function submit() {
	loadResults(selectedCountry,selectedCategory);
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
