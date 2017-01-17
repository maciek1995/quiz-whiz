
//= require jquery
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
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#avatar_path').val(this.src);
    });
});
