

// assertiva de entrada, recebe um elemento json
function buildView(elements, append = false) {
	  let content = "";
	  if(append == true){
		  content = document.getElementById("mainDiv").innerHTML
	  } 
	  if ( elements.length < 12) { // desabilitar "ver mais"
		  document.getElementById("btn_see_more").classList.add("disabled");
	  } else {
		  document.getElementById("btn_see_more").classList.remove("disabled");
	  }
	 for (let index = 0; index < elements.length; index++) {
		content = content + "<div class='article'> " + `<a class="article_link" target="_blank" href=${elements[index].url}>`+ 
							"<h2 class=\"article_title\">" + elements[index].title + 
							"</h2> <p class=\"article_description\">" + elements[index].description +
							"</p> </a> </div> "
		   
	   }
	   document.getElementById("mainDiv").innerHTML = content;
}