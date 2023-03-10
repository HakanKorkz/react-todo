<?php

namespace Korkz\todoBackEnd\config;

use Exception;
use Korkz\todoBackEnd\traits\Logs;
use Korkz\todoBackEnd\traits\TokenConfig;
use PDO;
use PDOException;
use Korkz\todoBackEnd\traits\ENVConfig;

class Connect
{


    use ENVConfig;
    use TokenConfig;
    use Logs;

    private string $host;
    private string $username;
    private string $password;
    private string $database;
    private string $request;
    private string $pathRoot;
    private string $hostPath;
    private string $location;
    private object $getAttribute;
    private string $path;
    private string $layout;
    private int $uniq;
    private string $token;

    /**
     * @throws Exception
     */
    public function __construct(string $request, object $route)
    {
        if ($route->attributeBoolean) {
            $getAttribute = $route->getAttribute;
        } else {
            $json = json_encode(["getAttribute" => "noData"]);

            $getAttribute = json_decode($json);

        }
        error_reporting(E_ALL);

        ini_set("display_errors", 1);

        @ob_start();

        @session_start();

        date_default_timezone_set('Europe/Istanbul');
        $ENV = $this->env();
        $this->setHost($ENV["HOST"]);
        $this->setUsername($ENV["USER"]);
        $this->setPassword($ENV["PASSWORD"]);
        $this->setDatabase($ENV["DATABASE_NAME"]);
        $this->setRequest($request);
        $this->setPathRoot("$route->pathRoot");
        $this->setHostPath("$route->hostPath");
        $this->setLocation("$route->location");
        $this->setGetAttribute($getAttribute);
        $this->setPath("$route->path");
        $this->setLayout("$route->layout");
        $this->setUniq(hexdec(uniqid()));
        $tokenCreate = $_SESSION["token"] ?? $this->locKey("key", $this->getUniq());
        $this->setToken($tokenCreate);
    }

    public function connect(): PDO
    {
        try {
            $connection = new PDO("mysql:host=$this->host;dbname=$this->database", $this->username, $this->password);
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $connection;
        } catch (PDOException $ex) {
            die("Error: " . $ex->getMessage());
        }
    }

    public function seo($str, array $options = array()): string
    {
        $version = phpversion();

        if ($version < 8) {

            $str = mb_convert_encoding((string)$str, 'UTF-8', mb_list_encodings());
        }

        $defaults = array(
            'delimiter' => '-',
            'limit' => null,
            'lowercase' => true,
            'replacements' => array(),
            'transliterate' => true
        );
        $options = array_merge($defaults, $options);
        $char_map = array(
// Latin
            '??' => 'A', '??' => 'A', '??' => 'A', '??' => 'A', '??' => 'A', '??' => 'A', '??' => 'AE', '??' => 'C',
            '??' => 'E', '??' => 'E', '??' => 'E', '??' => 'E', '??' => 'I', '??' => 'I', '??' => 'I', '??' => 'I',
            '??' => 'D', '??' => 'N', '??' => 'O', '??' => 'O', '??' => 'O', '??' => 'O', '??' => 'O', '??' => 'O',
            '??' => 'O', '??' => 'U', '??' => 'U', '??' => 'U', '??' => 'U', '??' => 'U', '??' => 'Y', '??' => 'TH',
            '??' => 'ss',
            '??' => 'a', '??' => 'a', '??' => 'a', '??' => 'a', '??' => 'a', '??' => 'a', '??' => 'ae', '??' => 'c',
            '??' => 'e', '??' => 'e', '??' => 'e', '??' => 'e', '??' => 'i', '??' => 'i', '??' => 'i', '??' => 'i',
            '??' => 'd', '??' => 'n', '??' => 'o', '??' => 'o', '??' => 'o', '??' => 'o', '??' => 'o', '??' => 'o',
            '??' => 'o', '??' => 'u', '??' => 'u', '??' => 'u', '??' => 'u', '??' => 'u', '??' => 'y', '??' => 'th',
            '??' => 'y',
// Latin symbols
            '??' => '(c)',
// Greek
            '??' => 'A', '??' => 'B', '??' => 'G', '??' => 'D', '??' => 'E', '??' => 'Z', '??' => 'H', '??' => '8',
            '??' => 'I', '??' => 'K', '??' => 'L', '??' => 'M', '??' => 'N', '??' => '3', '??' => 'O', '??' => 'P',
            '??' => 'R', '??' => 'S', '??' => 'T', '??' => 'Y', '??' => 'F', '??' => 'X', '??' => 'PS', '??' => 'W',
            '??' => 'A', '??' => 'E', '??' => 'I', '??' => 'O', '??' => 'Y', '??' => 'H', '??' => 'W', '??' => 'I',
            '??' => 'Y',
            '??' => 'a', '??' => 'b', '??' => 'g', '??' => 'd', '??' => 'e', '??' => 'z', '??' => 'h', '??' => '8',
            '??' => 'i', '??' => 'k', '??' => 'l', '??' => 'm', '??' => 'n', '??' => '3', '??' => 'o', '??' => 'p',
            '??' => 'r', '??' => 's', '??' => 't', '??' => 'y', '??' => 'f', '??' => 'x', '??' => 'ps', '??' => 'w',
            '??' => 'a', '??' => 'e', '??' => 'i', '??' => 'o', '??' => 'y', '??' => 'h', '??' => 'w', '??' => 's',
            '??' => 'i', '??' => 'y', '??' => 'y', '??' => 'i',
// Turkish
            '??' => 'S', '??' => 'I', '??' => 'C', '??' => 'U', '??' => 'O', '??' => 'G',
            '??' => 's', '??' => 'i', '??' => 'c', '??' => 'u', '??' => 'o', '??' => 'g',
// Russian
            '??' => 'A', '??' => 'B', '??' => 'V', '??' => 'G', '??' => 'D', '??' => 'E', '??' => 'Yo', '??' => 'Zh',
            '??' => 'Z', '??' => 'I', '??' => 'J', '??' => 'K', '??' => 'L', '??' => 'M', '??' => 'N', '??' => 'O',
            '??' => 'P', '??' => 'R', '??' => 'S', '??' => 'T', '??' => 'U', '??' => 'F', '??' => 'H', '??' => 'C',
            '??' => 'Ch', '??' => 'Sh', '??' => 'Sh', '??' => '', '??' => 'Y', '??' => '', '??' => 'E', '??' => 'Yu',
            '??' => 'Ya',
            '??' => 'a', '??' => 'b', '??' => 'v', '??' => 'g', '??' => 'd', '??' => 'e', '??' => 'yo', '??' => 'zh',
            '??' => 'z', '??' => 'i', '??' => 'j', '??' => 'k', '??' => 'l', '??' => 'm', '??' => 'n', '??' => 'o',
            '??' => 'p', '??' => 'r', '??' => 's', '??' => 't', '??' => 'u', '??' => 'f', '??' => 'h', '??' => 'c',
            '??' => 'ch', '??' => 'sh', '??' => 'sh', '??' => '', '??' => 'y', '??' => '', '??' => 'e', '??' => 'yu',
            '??' => 'ya',
// Ukrainian
            '??' => 'Ye', '??' => 'I', '??' => 'Yi', '??' => 'G',
            '??' => 'ye', '??' => 'i', '??' => 'yi', '??' => 'g',
// Czech
            '??' => 'C', '??' => 'D', '??' => 'E', '??' => 'N', '??' => 'R', '??' => 'S', '??' => 'T', '??' => 'U',
            '??' => 'Z',
            '??' => 'c', '??' => 'd', '??' => 'e', '??' => 'n', '??' => 'r', '??' => 's', '??' => 't', '??' => 'u',
            '??' => 'z',
// Polish
            '??' => 'A', '??' => 'C', '??' => 'e', '??' => 'L', '??' => 'N', '??' => 'o', '??' => 'S', '??' => 'Z',
            '??' => 'Z',
            '??' => 'a', '??' => 'c', '??' => 'e', '??' => 'l', '??' => 'n', '??' => 'o', '??' => 's', '??' => 'z',
            '??' => 'z',
// Latvian
            '??' => 'A', '??' => 'C', '??' => 'E', '??' => 'G', '??' => 'i', '??' => 'k', '??' => 'L', '??' => 'N',
            '??' => 'S', '??' => 'u', '??' => 'Z',
            '??' => 'a', '??' => 'c', '??' => 'e', '??' => 'g', '??' => 'i', '??' => 'k', '??' => 'l', '??' => 'n',
            '??' => 's', '??' => 'u', '??' => 'z'
        );
        $str = preg_replace(array_keys($options['replacements']), $options['replacements'], $str);
        if ($options['transliterate']) {
            $str = str_replace(array_keys($char_map), $char_map, $str);
        }
        $str = preg_replace('/[^\p{L}\p{Nd}]+/u', $options['delimiter'], $str);
        $str = preg_replace('/(' . preg_quote($options['delimiter'], '/') . '){2,}/', '$1', $str);
        $str = mb_substr($str, 0, ($options['limit'] ? $options['limit'] : mb_strlen($str, 'UTF-8')), 'UTF-8');
        $str = trim($str, $options['delimiter']);
        return $options['lowercase'] ? mb_strtolower($str, 'UTF-8') : $str;
    }

    protected function uniqControl($query, $uniq, string $where = ""): mixed
    {

        $db = $this->connect();
        if (!empty($where)) {
            $dbQuery = "$query where $where='$uniq'";
        } else {
            $dbQuery = $query;
        }

        $uniqQuery = $db->prepare("$dbQuery");

        $uniqQuery->execute();

        $uniqControl = $uniqQuery->rowCount();

        if ($uniqControl > 0) {
            $Uniq = hexdec(uniqid());

            $dbQuery = "$query where $where='$Uniq'";

            $result = $this->uniqControl($dbQuery, $Uniq);

        } else {

            $result = $uniq;

        }

        return $result;
    }

    /**
     * @return int
     */
    public function getUniq(): int
    {
        return $this->uniq;
    }

    /**
     * @param int $uniq
     */
    public function setUniq(int $uniq): void
    {
        $this->uniq = $uniq;
    }

    /**
     * @param string $host
     */
    private function setHost(string $host): void
    {
        $this->host = $host;
    }

    /**
     * @param string $username
     */
    private function setUsername(string $username): void
    {
        $this->username = $username;
    }

    /**
     * @param string $password
     */
    private function setPassword(string $password): void
    {
        $this->password = $password;
    }

    /**
     * @param string $database
     */
    private function setDatabase(string $database): void
    {
        $this->database = $database;
    }

    /**
     * @return string
     */
    public function getDatabase(): string
    {
        return $this->database;
    }

    /**
     * @return string
     */
    public function getToken(): string
    {
        return $this->token;
    }

    /**
     * @param string $token
     * @throws Exception
     */
    public function setToken(string $token): void
    {
        if (!isset($_SESSION["token"])) {
            $_SESSION["token"] = $token;
        }
        $this->token = $token;
    }


    /**
     * @return string
     */
    public function getRequest(): string
    {
        return $this->request;
    }

    /**
     * @param string $request
     * @return void
     */
    public function setRequest(string $request): void
    {
        $this->request = $request;
    }

    /**
     * @return string
     */
    public function getPathRoot(): string
    {
        return $this->pathRoot;
    }

    /**
     * @param string $pathRoot
     */
    public function setPathRoot(string $pathRoot): void
    {
        $this->pathRoot = $pathRoot;
    }

    /**
     * @return string
     */
    public function getLocation(): string
    {
        return $this->location;
    }

    /**
     * @param string $location
     */
    public function setLocation(string $location): void
    {
        $this->location = $location;
    }

    /**
     * @return object
     */
    public function getGetAttribute(): object
    {
        return $this->getAttribute;
    }

    /**
     * @param object $getAttribute
     */
    public function setGetAttribute(object $getAttribute): void
    {
        $this->getAttribute = $getAttribute;
    }

    /**
     * @return string
     */
    public function getHostPath(): string
    {
        return $this->hostPath;
    }

    /**
     * @param string $hostPath
     */
    public function setHostPath(string $hostPath): void
    {
        $this->hostPath = $hostPath;
    }




    /**
     * @return string
     */
    public function getPath(): string
    {
        return $this->path;
    }

    /**
     * @param string $path
     */
    public function setPath(string $path): void
    {
        $this->path = $path;
    }

    /**
     * @return string
     */
    public function getLayout(): string
    {
        return $this->layout;
    }

    /**
     * @param string $layout
     */
    public function setLayout(string $layout): void
    {
        $this->layout = $layout;
    }

}
