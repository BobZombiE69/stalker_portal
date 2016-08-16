
<?php
$html = "";
$url = "http://www.hamshahrionline.ir/rss";
$xml = simplexml_load_file($url);
$html .= "<div class='title'><div id='sar_titr'>سر تیتر اخبار ایران و جهان </div><ul id='news_list'>";
for($i = 0; $i < 15; $i++){
	$title = $xml->channel->item[$i]->title;
	$link = $xml->channel->item[$i]->link;
	$description = $xml->channel->item[$i]->description;
	//$pubDate = $xml->channel->item[$i]->pubDate;
	
    //$html .= "<a href='$link'><h3>$title</h3></a>";
	$html .= "<li>$title</li>";
	//$html .= "<p>$description<p>";
	//$html .= " | ";
	//$html .= "<br />$pubDate<hr />";
}
$html .= "</ul></div>";
echo $html;


//echo "TITLE...";
?>
