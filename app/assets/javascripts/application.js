
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require turbolinks
//= require react
//= require react_ujs
//= require components
//= require_tree .
//= require_tree ./channels

//= require bootstrap-sprockets


$(function () {
    $('.avatar').click( function () {
        $('#avatar_path').val(this.src);
    });
});
