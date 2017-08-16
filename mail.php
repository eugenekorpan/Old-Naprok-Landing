<?
        $to = 'targonsky97@gmail.com'; 
        $subject = 'Message from Naprok'; 
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Name: '.$_POST['fullname'].'</p>
                        <p>Email: '.$_POST['email'].'</p>     
                        <p>Message: '.$_POST['message'].'</p>                    
                    </body>
                </html>'; 
        $headers  = "Content-type: text/html; charset=utf-8 \r\n";
        mail($to, $subject, $message, $headers); 
}
?>