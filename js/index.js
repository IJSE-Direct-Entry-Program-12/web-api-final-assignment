/* Enable Tooltip Texts */
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

$("#btn-new-employee").on('click', ()=>{
    $("form").trigger("reset");
    $("#txt-id").val(generateNewId());
    $("#txt-name").trigger("focus");
    $("#btn-save").prop("disabled", false);
});

function generateNewId(){
   return 'E-' + ((+$("#tbl-employee > tbody > tr:last-child > td:first-child")
        .text().replace('E-', '') + 1) + "").padStart(3, 0);
}

$("form").on('submit', (e)=>{
    e.preventDefault();


}).on('reset', ()=>{
   $("#btn-save").prop("disabled", true);
});