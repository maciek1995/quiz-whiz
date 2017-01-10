
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require react
//= require react_ujs
//= require components
//= require_tree .
//= require_tree ./channels

//= require bootstrap-sprockets


$(function () {
    $('.avatar').click( function () {
        console.log(this.src);
        $('#avatar_path').val(this.src);
    });
});
