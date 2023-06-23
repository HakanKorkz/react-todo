<?php

namespace Korkz\todoBackEnd\config;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Token\Builder;

class JWToken
{
    public function encrypt()
    {
        $signer=new Sha256();
        $token = (new Builder())
            ->setIssuer('http://example.com') // İmzalayan
            ->setAudience('http://example.org') // Alıcı
            ->setId('4f1g23a12aa', true) // Token ID (doğrulama amacıyla kullanılabilir)
            ->setIssuedAt(time()) // Verilme zamanı
            ->setExpiration(time() + 3600) // Geçerlilik süresi
            ->set('uid', 1) // Kendi özelleştirdiğimiz veri
            ->sign($signer, 'my-secret') // JWT'yi imzala
            ->getToken(); // JWT'yi al
    }
}