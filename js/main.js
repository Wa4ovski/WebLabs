let x, y, r;

function chooseX(element) {
    x = element.value;
    //console.log(x);
    [...document.getElementsByClassName("x-button")].forEach(function (btn) {
        btn.style.transform = "";
       // console.log("выбрал кнопку1");
    });
    element.style.transform = "scale(1.1)";
   // console.log("выбрал кнопку2");
}

function getR(){
    let rad=document.getElementsByClassName("r-radio");
    for (let i=0;i<rad.length; i++) {
        if (rad[i].checked)
            return rad[i].getAttribute("value");
    }
    return null;
}
function showError(message) {
    $('#errors').append('<li>'+ message + '</li>');
}

function reset(){
    let rad=document.getElementsByClassName("r-radio");
    for (let i=0;i<rad.length; i++) {
        if (rad[i].checked)
            rad[i].checked = false;
    }
    document.getElementById("y-textinput").value = "";
   // $("#y-textinput").value= "";

    //$(".r-radio").setAttribute("checked", "false");
}
$(":button[class='button']").click(function(){
    document.getElementById(setV).value = "0"
    // your code
})
function submit() {
    $('#errors').empty();
    if (validateData()) {
        $.get("php/script.php", {
            'x': x,
            'y': y,
            'r': r,
            'timezone': new Date().getTimezoneOffset()
        }).done(function (data) {

                let arr = (data.split(' '));
                if (arr[0] == '0') return;
                let lastId = arr.length-1;
                let newRow = arr[lastId] == '1' ? '<tr class="hit-yes">' : '<tr class="hit-no">';
                for(let i=1; i < arr.length-1; i++) {
                    newRow += '<td>' + arr[i] + '</td>';
                }

                 newRow += '<td>' + (arr[lastId] == '1' ? 'Да' : 'Нет') + '</td>';
            $('#result-table tr:first').after(newRow);
        }).fail(function (error) {
            alert(error);
        });
    }
}
function validateX() {
    if (x)
        return true;

    showError("Выберите X");
    return false;
}

function validateY() {
    y = document.querySelector("input[id=y-textinput]").value.replace(",", ".");
    if (!y){
        showError("Введите Y");
        return false;
    }
    if (isNaN(parseFloat(y))) {
        showError("Y не является числом");
        return false;
    }
    if (!((y > -3) && (y < 5))) {
        showError("Y не входит в область допустимых значений");
        return false;
    }
    return true;
}

function validateR() {
    r = getR();
    if (r)
        return true;

    showError("Выберите R");
    return false;
}

function validateData() {
    return validateX() & validateY() & validateR();
}

