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
    $('.remove-team').on('click', function(e){
      $target = $(e.target);
      const id = $target.attr('data-id');
      $.ajax({
        type: 'DELETE',
        url: '/lists/'+id,
        success: function(response){
          alert('Removing Team from Lists');
          window.location.href='/lists';
        },
        error: function(err){
            console.log(err);
        }
      });
    });
    $('.delete-user').on('click', function(e){
      $target = $(e.target);
      const id = $target.attr('data-id');
      $.ajax({
        type: 'DELETE',
        url: '/admin/'+id,
        success: function(response){
          alert('Removing User from Users List');
          window.location.href='/admin';
        },
        error: function(err){
            console.log(err);
        }
      });
    });
});
