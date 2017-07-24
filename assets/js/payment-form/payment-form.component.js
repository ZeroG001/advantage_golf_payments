angular.
	module('paymentForm').
	component('paymentForm', {
		templateUrl: 'assets/js/payment-form/payment-form.template.html',
		controller: function() {
			this.formElements = ["firstName", "lastName", "emailAddress"];
			this.test = "hello";
			this.poop = "Hello world";
		}
	});
