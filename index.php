<?php
require 'vendor/autoload.php';

$app = new \Slim\Slim(array('debug' => true));
$app->view->setTemplatesDirectory("./views");

$app->get('/', function () use ($app) {
	$app->render("home.html");
});

$app->get('/all.json', function () use ($app) {
	$db = new PDO("mysql:host=127.0.0.1;dbname=wstation", "root", "TONYHAWK");
	$sql = "SELECT * FROM readings";
	$rows = $db->query($sql);

	$readings = array();
	$stmt = $db->prepare($sql);
	$stmt->execute();
	foreach ($stmt as $row) {
	 	unset($row[0]);
	 	unset($row[1]);
	 	unset($row[2]);
	 	unset($row[3]);
	 	unset($row[4]);

	 	$row['id'] = intval($row['id']);
	 	$row['temperature'] = floatval($row['temperature']);
	 	$row['humidity'] = floatval($row['humidity']);
	 	$row['illuminanace'] = floatval($row['humidity']);
	 	array_push($readings, $row);
	}

	$app->response->headers->set('Content-Type', 'application/json');
	echo(json_encode($readings));
});

$app->get('/temp.json', function () use ($app) {
	$db = new PDO("mysql:host=127.0.0.1;dbname=wstation", "root", "TONYHAWK");
	$sql = "SELECT created_on,temperature FROM readings";
	$rows = $db->query($sql);

	$readings = array();
	$stmt = $db->prepare($sql);
	$stmt->execute();
	foreach ($stmt as $row) {

	 	$row['id'] = intval($row['id']);
	 	$row['temperature'] = floatval($row['temperature']);
	 	array_push($readings, $row);
	}

	$app->response->headers->set('Content-Type', 'application/json');
	echo(json_encode($readings));
});

$app->get('/hum.json', function () use ($app) {
	$db = new PDO("mysql:host=127.0.0.1;dbname=wstation", "root", "TONYHAWK");
	$sql = "SELECT created_on,humidity FROM readings";
	$rows = $db->query($sql);

	$readings = array();
	$stmt = $db->prepare($sql);
	$stmt->execute();
	foreach ($stmt as $row) {

	 	$row['id'] = intval($row['id']);
	 	$row['humidity'] = floatval($row['humidity']);
	 	array_push($readings, $row);
	}

	$app->response->headers->set('Content-Type', 'application/json');
	echo(json_encode($readings));
});

$app->get('/lux.json', function () use ($app) {
	$db = new PDO("mysql:host=127.0.0.1;dbname=wstation", "root", "TONYHAWK");
	$sql = "SELECT created_on,illuminance FROM readings";
	$rows = $db->query($sql);

	$readings = array();
	$stmt = $db->prepare($sql);
	$stmt->execute();
	foreach ($stmt as $row) {

	 	$row['id'] = intval($row['id']);
	 	$row['luminance'] = floatval($row['humidity']);
	 	array_push($readings, $row);
	}

	$app->response->headers->set('Content-Type', 'application/json');
	echo(json_encode($readings));
});

$app->run();
