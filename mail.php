<?php
if (!empty($_POST)) {
    header("access-control-allow-credentials:true");
    header("access-control-allow-headers:Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token");
    header("access-control-allow-methods:POST, GET, OPTIONS");
    header("access-control-allow-origin:".$_SERVER['HTTP_ORIGIN']);
    header("access-control-expose-headers:AMP-Access-Control-Allow-Source-Origin");
    header("amp-access-control-allow-source-origin:https://".$_SERVER['HTTPS_HOST']);
    header("Content-Type: application/json");
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $output = ['email' => $email];
    header("Content-Type: application/json");
    echo json_encode($output);
    $post_data['email'] = urlencode($_POST['email']);
    foreach($post_data as $key => $value) {
        $post_items[] = $key.
        '='.$value;
    }
    $post_string = implode('&', $post_items);
    $curl_connection = curl_init('https://formspree.io/eugene@naprok.com');
    curl_setopt($curl_connection, CURLOPT_CONNECTTIMEOUT, 30);
    curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl_connection, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($curl_connection, CURLOPT_POSTFIELDS, $post_string);
    curl_exec($curl_connection);
    curl_close($curl_connection);
}
?>