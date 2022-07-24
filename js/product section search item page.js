function Search__Products() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search__products");
    filter = input.value.toUpperCase();
    ul = document.getElementById("best__deal__products");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h2")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}