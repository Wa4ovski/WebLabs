<?php
function validateX($xVal){
    return isset($xVal);
}

function validateY($yVal){
    $yMax=5; $yMin=-3;
    return is_numeric($yVal) && ($yMin < $yVal && $yVal< $yMax);
}

function validateR($rVal){
    return isset($rVal);
}

function validateData($xVal, $yVal, $rVal)
{
    return validateX($xVal) && validateY($yVal) && validateR($rVal);
}

function checkRectangle($xVal, $yVal, $rVal){
    return $xVal >= 0 && $yVal <= 0 && $xVal <= $rVal/2 && $yVal >= -$rVal;
}

function checkTriangle($xVal, $yVal, $rVal){
    return $xVal >= 0 && $yVal >= 0 && $xVal+$yVal <= $rVal/2;
}

function checkSector($xVal, $yVal, $rVal){
    return $xVal <= 0 && $yVal >= 0 &&
        pow($xVal, 2) +pow($yVal, 2) <= pow($rVal/2, 2);
}

function checkPoint($xVal, $yVal, $rVal)
{
    return checkTriangle($xVal, $yVal, $rVal) || checkRectangle($xVal, $yVal, $rVal) ||
        checkSector($xVal, $yVal, $rVal);
}

$xVal = $_GET['x'];
$yVal = $_GET['y'];
$rVal = $_GET['r'];
$timezone = $_GET['timezone'];

$isValid = validateData($xVal, $yVal, $rVal);
$isHit = checkPoint($xVal, $yVal, $rVal);
$currentTime = date('H:i:s', time() - $timezone * 60);
$executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 7);

$StringForCheck =
"isValid %b
x %d 
y %f
r %d
timezone %s
currentTime %s
executionTime %s
isHit %b";
$result = "%b %d %f %d %s %s %b";
echo sprintf($result, $isValid, $xVal, $yVal, $rVal,
    $currentTime, $executionTime, $isHit);
?>