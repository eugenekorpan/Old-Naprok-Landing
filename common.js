$(document).ready(function() {
    $("#form").on('submit', function(event) {
        event.preventDefault(); 
        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: 'mail.php',
            dataType: "json",
            data: formData,
            success: function(response) { 
                alert(response.success); 
            },
            error: function(xhr, status, error){
                console.log(xhr); 
            }
        });
    });
});