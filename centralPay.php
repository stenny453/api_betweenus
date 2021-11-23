<?php

if (isset($_GET['amount']) && isset($_GET['email'])) {

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://test-api.centralpay.net/v2/rest/paymentRequest');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    $post = array(
        'paymentMethod[]' => 'TRANSACTION',
        'currency' => 'EUR',
        'totalAmount' => $_GET['amount'],
        'breakdown[]' => '{"amount":' . $_GET['amount'] . ',"email":' . $_GET['email'] . '}'
    );
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_setopt($ch, CURLOPT_USERPWD, 'ff71e627-07d2-4a03' . ':' . '%Fn9njixhz');

    $result = curl_exec($ch);

    // $json_response = json_decode($result);

    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close($ch);

    echo $result;
}


if (isset($_GET['holderEmail']) && isset($_GET['lastname']) && isset($_GET['firstname']) && isset($_GET['number'])
&& isset($_GET['cvc']) && isset($_GET['expirationMonth']) && isset($_GET['expirationYear'])) {
    $holderEmail = $_GET['holderEmail'];
    $lastname = $_GET['lastname'];
    $firstname = $_GET['firstname'];
    $number = $_GET['number'];
    $cvc = intval($_GET['cvc']);
    $expirationMonth = $_GET['expirationMonth'];
    $expirationYear = $_GET['expirationYear'];
    $name = $lastname . ' ' . $firstname;

    echo $holderEmail;
    echo '----';
    echo $name;
    echo '----';
    echo $number;
    echo '----';
    echo $cvc;
    echo '----';
    echo $expirationMonth;
    echo '----';
    echo $expirationYear;
    echo '----';

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://test-api.centralpay.net/v2/rest/cardToken');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);

    curl_setopt($ch, CURLOPT_POSTFIELDS, "merchantPublicKey=100514aa5a51bd9f0c8b6fd8240148a0fa028c301551de371f690b2b55d89e60&card[holderEmail]=$holderEmail&card[number]=$number&card[cvc]=123&card[expirationMonth]=12&card[expirationYear]=2022&card[holderName]=$name");
    $headers = array();
    $headers[] = 'Content-Type: application/x-www-form-urlencoded';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error php :' . curl_error($ch);
    }
    curl_close($ch);

    echo $result;

}

?>