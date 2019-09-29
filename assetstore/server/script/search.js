$(document).ready(function () {
    var search_form = $("#search");
    login_form.submit(function (e) {
        var search_data = {content: $('#searchcontent').val()};
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'http://localhost/searchresult',
            contentType: "application/json; charset=utf-8",
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            data: JSON.stringify(search_data),
            dataType: "json",
            success: function (data) {
                if (data.status == 'OK') {
                    window.location.href='/search';
                } else {
                    console.log(data);
                }
            }
        })
    })
});