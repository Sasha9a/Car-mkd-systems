function updateFirm(input) {
    var filter, div, a, i, count, isShow;
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdownFilterFirm");
    a = div.getElementsByTagName("a");
    count = 0;
    isShow = false;
    for (i = 0; i < a.length; i++) {
        if (a[i].textContent.toUpperCase().indexOf(filter) > -1 && count < 5) {
            a[i].style.display = "";
            count++;
            isShow = true;
        } else {
            a[i].style.display = "none";
        }
    }
    if (isShow && input.value.length > 0) {
        div.classList.add("show");
    } else {
        div.classList.remove("show");
    }
}

function updateModel(input) {
    var filter, div, a, i, count, isShow;
    filter = input.value.toUpperCase();
    div = document.getElementById("dropdownFilterModel");
    a = div.getElementsByTagName("a");
    count = 0;
    isShow = false;
    for (i = 0; i < a.length; i++) {
        if (a[i].textContent.toUpperCase().indexOf(filter) > -1 && count < 5) {
            a[i].style.display = "";
            count++;
            isShow = true;
        } else {
            a[i].style.display = "none";
        }
    }
    if (isShow && input.value.length > 0) {
        div.classList.add("show");
    } else {
        div.classList.remove("show");
    }
}