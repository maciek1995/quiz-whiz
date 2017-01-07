/**
 * Created by maciejm on 06.01.17.
 */
$(function () {
    $('.avatar').click( function () {
        $('#avatar_path').val(this.src);
    });
});
