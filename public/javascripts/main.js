$(function(){
	$('#application-form').on('click', '.submit-btn', function(event){
		event.preventDefault();
		var info = $('#application-form').serialize();
		$('#application-form').each(function(){
			this.reset();
		});
		$.post('/applicant', info, function(data){
				if(data['success']){
					$('#success-message').removeClass('hidden');
				}
		});
	});
});