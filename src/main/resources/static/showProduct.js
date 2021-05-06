function clickImagesProduct() {
    $('#updateImages').click();
}

function clickModel(id, idModel, url) {
    var formData = new FormData();
    var token = $("meta[name='_csrf']").attr("content");
    formData.append('idModel', idModel);
    $.ajax({
        type: 'POST',
        url: url.toString() + id.toString(),
        cache: false,
        headers: {"X-CSRF-TOKEN": token},
        contentType: false,
        processData: false,
        data : formData,
        success: function () {
            if ($("#btnDelModel" + idModel).css("display") === "none") {
                $("#btnAddModel" + idModel).css("display", "none");
                $("#btnDelModel" + idModel).css("display", "block");
            } else {
                $("#btnDelModel" + idModel).css("display", "none");
                $("#btnAddModel" + idModel).css("display", "block");
            }
        }
    });
}