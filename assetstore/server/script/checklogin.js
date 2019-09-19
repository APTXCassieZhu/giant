$(document).ready(function () {
    var login_form = $("#login");
    login_form.submit(function (e) {
        var login_data = {account: $('#account').val(), password: $('#password').val()};
        console.log(login_data.account, " ", login_data.password)
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'http://localhost/home',
            contentType: "application/json; charset=utf-8",
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            data: JSON.stringify(login_data),
            dataType: "json",
            success: function (data) {
                if (data.status == 'error') {
                    alert(data.error);
                } else {
                    console.log(data);
                }
            }
        })
    })
});