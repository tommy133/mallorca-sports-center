function buscarBarra() {
    $(document).ready(function() {
        $.ajaxSetup({
            cache: false
        });
        $('#search').keyup(function() {
            $('#result').html('');
            $('#state').val('');
            var searchField = $('#search').val();
            if ($('#search').val() != "") var searchField = $('#search').val();
            else var searchField = null;
            var expression = new RegExp(searchField, "i");
            $.getJSON('json/Sport_Center.json', function(data) {
                $.each(data, function(key, value) {
                    if (value.nom.search(expression) != -1) {
                        $('#result').append('<li class="list-group-item link-class">  <img src="' + value.image[0] + '" height="40" width="40" class="img-thumbnail " /> <a href="instalacions.html?" >' + value.name + ' </a> | <span class="text-muted"> </li>');
                    }
                });
            });
        });

        $('#result').on('click', 'li', function() {
            var click_text = $(this).text().split('|');
            $('#search').val($.trim(click_text[0]));
            $("#result").html('');
        });
    });
}

buscarBarra()