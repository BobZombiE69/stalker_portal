<?php

	// Prayer Times Calculator, Sample Usage
	// By: Hamid Zarrabi-Zadeh
	// Inputs : $method, $year, $latitude, $longitude, $timeZone
	
	//Bobi
	//import_request_variables("p");
	//extract($_REQUEST, EXTR_PREFIX_ALL|EXTR_REFS, 'v');
	include('PrayTime.php');

	list($method, $year, $latitude, $longitude, $timeZone) = array(7, 2016, 26, 54, 4.5);
?>

<?php

	$prayTime = new PrayTime($method);
	$date = strtotime(date("Y-m-d"));
	$times = $prayTime->getPrayerTimes($date, $latitude, $longitude, $timeZone);
	$day = date('Y M d', $date);
	//print $day. "\t". implode("\t", $times). "\n";
	

    $prayTime->setCalcMethod($prayTime->Tehran);
    $times = $prayTime->getPrayerTimes(time(), 26, 54, 4.5);
    print('   Fajr    = '. $times[0]);

    //print('Sunrise = '. $times[1]);

    print('   Dhur    = '. $times[2]);

    //print('Asr     = '. $times[3]);

    //print('Sunset  = '. $times[4]);

    print('   Maghrib = '. $times[5]);

    //print('Isha    = '. $times[6]);




?>


