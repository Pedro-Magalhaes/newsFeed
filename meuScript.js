var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let json = JSON.parse(xhttp.responseText);
       let text = json.totalResults + "  " + json.status;
       let content = "";
       for (let index = 0; index < json.articles.length; index++) {
        content = content + "<h2 class=\"article_title\">" + json.articles[index].title + 
            "</h2><br> <p class=\"article_description\">" + json.articles[index].description + "</p> <br><br> " ;
           
       }
       document.getElementById("mainDiv").innerHTML = content;
    }
};

xhttp.open("GET", "https://newsapi.org/v2/top-headlines?country=br&category=business&apiKey=a36cd6c4d2034e688b4ecc8b0e22b548", true);

xhttp.send();