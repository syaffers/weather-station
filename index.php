<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim(array('debug' => true));
$app->view->setTemplatesDirectory("./views");

$app->get('/', function () use ($app) {
	$app->render("home.html");
});

$app->get('/:from/:to', function($from, $to) use ($app) {
	$app->render("date.html");
});

$app->get('/all.json', function () use ($app) {
	$db = new PDO("mysql:host=127.0.0.1;dbname=wstation", "syaffers", "pizza");
	$sql = "SELECT * FROM readings WHERE id > (SELECT MAX(id) - 680 FROM readings)";
	$rows = $db->query($sql);

	$readings = array();
	$stmt = $db->prepare($sql);
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach ($results as $row) {
	 	$row['id'] = intval($row['id']);
	 	$row['temperature'] = floatval($row['temperature']);
	 	$row['humidity'] = floatval($row['humidity']);
		if (!is_null($row['illuminance']))
	 		$row['illuminance'] = floatval($row['illuminance']);
	 	array_push($readings, $row);
	}

	$app->response->headers->set('Content-Type', 'application/json');
	echo(json_encode($readings));
});

$app->get('/temp.json', function () use ($app) {
	$db = new PDO("mysql:host=127.0.0.1;dbname=wstation", "syaffers", "pizza");
	$sql = "SELECT id,created_on,temperature FROM readings WHERE id > (SELECT MAX(id) - 680 FROM readings)";
	$rows = $db->query($sql);

	$readings = array();
	$stmt = $db->prepare($sql);
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach ($results as $row) {
	 	$row['id'] = intval($row['id']);
	 	$row['temperature'] = floatval($row['temperature']);
	 	array_push($readings, $row);
	}

	$app->response->headers->set('Content-Type', 'application/json');
	echo(json_encode($readings));
});

$app->get('/hum.json', function () use ($app) {
	$db = new PDO("mysql:host=127.0.0.1;dbname=wstation", "syaffers", "pizza");
	$sql = "SELECT id,created_on,humidity FROM readings WHERE id > (SELECT MAX(id) - 680 FROM readings)";
	$rows = $db->query($sql);

	$readings = array();
	$stmt = $db->prepare($sql);
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach ($results as $row) {

	 	$row['id'] = intval($row['id']);
	 	$row['humidity'] = floatval($row['humidity']);
	 	array_push($readings, $row);
	}

	$app->response->headers->set('Content-Type', 'application/json');
	echo(json_encode($readings));
});

$app->get('/lux.json', function () use ($app) {
	$db = new PDO("mysql:host=127.0.0.1;dbname=wstation", "syaffers", "pizza");
	$sql = "SELECT id,created_on,illuminance FROM readings WHERE id > (SELECT MAX(id) - 680 FROM readings)";
	$rows = $db->query($sql);

	$readings = array();
	$stmt = $db->prepare($sql);
	$stmt->execute();
	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach ($results as $row) {
	 	$row['id'] = intval($row['id']);
		if (!is_null($row['illuminance']))
	 		$row['illuminance'] = floatval($row['illuminance']);
	 	array_push($readings, $row);
	}

	$app->response->headers->set('Content-Type', 'application/json');
	echo(json_encode($readings));
});

$app->get('/all/:from/:to', function ($from, $to) use ($app) {
	$db = new PDO("mysql:host=127.0.0.1;dbname=wstation", "syaffers", "pizza");
        $sql = "SELECT * FROM readings WHERE created_on > '$from' AND created_on < '$to'";
        $rows = $db->query($sql);

        $readings = array();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($results as $row) {
		$row['id'] = intval($row['id']);
		$row['temperature'] = floatval($row['temperature']);
		$row['humidity'] = floatval($row['humidity']);
		if (!is_null($row['illuminance']))
        		$row['illuminance'] = floatval($row['illuminance']);
                array_push($readings, $row);
        }

        $app->response->headers->set('Content-Type', 'application/json');
        echo(json_encode($readings));
});

$app->get('/all_0.json', function () use ($app) {
        $db = new PDO("mysql:host=127.0.0.1;dbname=wstation", "syaffers", "pizza");
        $sql = "SELECT * FROM readings";
        $rows = $db->query($sql);

        $readings = array();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($results as $row) {
		$row['id'] = intval($row['id']);
		$row['temperature'] = floatval($row['temperature']);
		$row['humidity'] = floatval($row['humidity']);
		if (!is_null($row['illuminance']))
        		$row['illuminance'] = floatval($row['illuminance']);
                array_push($readings, $row);
        }

        $app->response->headers->set('Content-Type', 'application/json');
        echo(json_encode($readings));
});

$app->run();
