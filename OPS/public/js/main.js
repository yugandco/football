$(document).ready(function(){
    $('.delete-match').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/matches/'+id,
            success: function(response){
                alert('Deleting Matches');
                window.location.href='/matches';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});
