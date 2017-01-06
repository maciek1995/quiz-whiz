/**
 * Created by maciejm on 06.01.17.
 */
$(function () {
    $('.avatar').on('click', function () {
        $('#avatar_path').val(this.src);
    });
});
