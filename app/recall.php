<?php
		
	//Get your email address
	$contact_email = 'aa.yaroshenko@gmail.com';
	
	//Enter your email address, email from contact form will send to this addresss. 
	define('DEST_EMAIL1', 'tripol.zp@gmail.com');
	define('DEST_EMAIL2', 'aa.yaroshenko@gmail.com');
	
	//Change email subject to something more meaningful
	define('SUBJECT_EMAIL', 'Заявка с сайта Струмко');
	
	
	//Error message when message can't send
	define('ERROR_MESSAGE', '<h4 class="form_thanks">Упс! Что то пошло не так. Попробуйте повторить позже.</h4>');
	//Success Message
	define('SUCCESS_MESSAGE', '<h4 class="form_thanks">Спасибо! Наша команда свяжется с Вами</h4>');
	
	/*
	|
	| Begin sending mail
	|
	*/
	
	$from_name = $_POST['name_recall'];			
	$from_phone = $_POST['phone_recall'];	
	$from_timeto = $_POST['time'];
	$from_email = 'rassvet-plus@ukr.net';
	$mime_boundary_1 = md5(time());
    $mime_boundary_2 = "1_".$mime_boundary_1;
    $mail_sent = false;
	
		
	
 
    # Common Headers
    $headers = "";    
          // these two to set reply address
    $headers .= "Message-ID: <".date('Y-m-d H:i:s')."webmaster@".$_SERVER['SERVER_NAME'].">";
    $headers .= "X-Mailer: PHP v".phpversion().PHP_EOL;                  // These two to help avoid spam-filters

    # Boundry for marking the split & Multitype Headers
    $headers .= 'MIME-Version: 1.0'.PHP_EOL;
    $headers .= 'Content-type: text/plain; charset=utf-8 '.PHP_EOL;
    $headers .= "   boundary=\"".$mime_boundary_1."\"".PHP_EOL;
	
	$message = 'Имя: '.$from_name.PHP_EOL;
	$message.= 'Телефон: '.$from_phone.PHP_EOL;	
	$message.= 'Заявка была принята в: '.$from_timeto.PHP_EOL;
	
	
	
	if(!empty($from_name) && !empty($message))
	{
		mail(DEST_EMAIL1, SUBJECT_EMAIL, $message, $headers);
		mail(DEST_EMAIL2, SUBJECT_EMAIL, $message, $headers);
		echo SUCCESS_MESSAGE;
	}
	else
	{
		echo ERROR_MESSAGE;
	}
	
	/*
	|
	| End sending mail
	|
	*/
?>