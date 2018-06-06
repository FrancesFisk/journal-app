$(function() {

let data = sessionStorage.getItem('authToken');
let badData = "234234432";

console.log("makeup.js ", data);
$.ajax({
    url: "/api/protected",
    method: "GET",
    headers: { 'Authorization': `Bearer ${data}`},
    success: function(data) {
        console.log(data);
    },
    error: function(err) {
        console.log(err.responseText);
        window.location = "index.html"
    }
})

});