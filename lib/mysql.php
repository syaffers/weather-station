function connect_db() {
	$server = '127.0.0.1'; // this may be an ip address instead
	$user = 'root';
	$pass = 'TONYHAWK';
	$database = 'wstation';
	$connection = new mysqli($server, $user, $pass, $database);

	return $connection;
}
