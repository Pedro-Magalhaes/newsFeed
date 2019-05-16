var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       let json = JSON.parse(xhttp.responseText);
       let text = json.totalResults + "  " + json.status;
       let content = "";
       for (let index = 0; index < json.articles.length; index++) {
        content = content + "<p>" + json.articles[index].title + "</p><br> <p>" + json.articles[index].content + "</p> <br><br> " ;
           
       }
       document.getElementById("mainDiv").innerHTML = content;
    }
};

xhttp.open("GET", "https://newsapi.org/v2/top-headlines?country=br&category=business&apiKey=a36cd6c4d2034e688b4ecc8b0e22b548", true);

xhttp.send();