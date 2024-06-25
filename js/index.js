/* Enable Tooltip Texts */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const API_URL = 'http://localhost:3000/employees';

$("#btn-new-employee").on('click', () => {
    $("form").trigger("reset");
    $("#txt-id").val(generateNewId());
    $("#txt-name").trigger("focus");
    $("#btn-save").prop("disabled", false);
});

function generateNewId() {
    return 'E-' + ((+$("#tbl-employee > tbody > tr:last-child > td:first-child")
        .text().replace('E-', '') + 1) + "").padStart(3, 0);
}

$("form").on('submit', (e) => {
    e.preventDefault();

    if (!validateData()) return;
    saveEmployee();

}).on('reset', () => {
    $(".is-invalid").removeClass('is-invalid');
    $("#btn-save").prop("disabled", true);
});

async function saveEmployee(){

}

function validateData() {
    let valid = true;
    if ($("#cb-department").val() === 'no-department') {
        $("#cb-department").addClass('is-invalid')
            .trigger('focus');
        valid = false;
    }
    if (!$('input[name="gender"]:checked').length) {
        $('input[name="gender"]').addClass('is-invalid')
            .first().trigger('focus');
        valid = false;
    }
    if ($("#txt-address").val().trim().length < 3) {
        $("#txt-address").addClass('is-invalid')
            .trigger('focus').trigger('select');
        valid = false;
    }
    if (!/^[A-Za-z ]+$/.test($("#txt-name").val().trim())) {
        $("#txt-name").addClass('is-invalid')
            .trigger('focus')
            .trigger('select')
            .next().text(!$("#txt-name").val().trim() ?
            "Employee name can't be empty" :
            "Name contain only letters and spaces");
        valid = false;
    }
    return valid;
}

$('#txt-address, #cb-department, input[name="gender"], #txt-name')
    .on('input', (e) => {
        $(e.target.name === 'gender' ? 'input[name="gender"]' : e.target)
            .removeClass('is-invalid');
    });