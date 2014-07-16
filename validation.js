function validateRequired(element)
{
	if(element.attr('type') == 'checkbox' || element.attr('type') == 'radio')
	{
		if(element.prop('checked'))
		{
			return true;
		}
	}
	else
	{
		var value = element.val();
		
		if(typeof value == 'string')
		{
			value = value.trim();
		}
		
		if(value && value.length > 0)
		{
			return true;
		}
	}
	
	return false;
}

function validateNumeric(element)
{
	var value = element.val().trim();
	
	if(value.length > 0)
	{
		if(!isNaN(value))
		{
			return true;
		}
		
		return false;
	}
	
	return true;
}

function validateInteger(element)
{
	var value = element.val().trim();
	
	if(value.length > 0)
	{
		if(parseFloat(value) == parseInt(value))
		{
			return true;
		}
		
		return false;
	}
	
	return true;
}

function validateAlphabetic(element)
{
	var value = element.val().trim();
	
	if(value.length > 0)
	{
		return /^[a-zA-Z]*$/.test(value);
	}
	
	return true;
}

function validateAlphanumeric(element)
{
	var value = element.val().trim();
	
	if(value.length > 0)
	{
		return /^[0-9a-zA-Z]*$/.test(value);
	}
	
	return true;
}

function validateAlphanumericWithSpace(element)
{
	var value = element.val().trim();
	
	if(value.length > 0)
	{
		return /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(value);
	}
	
	return true;
}

function validateMinLength(element, minLength)
{
	var value = element.val().trim();
	
	if(value.length > 0)
	{
		if(value.length >= minLength)
		{
			return true;
		}
		
		return false;
	}
	
	return true;
}

function validateMaxLength(element, maxLength)
{
	var value = element.val().trim();
	
	if(value.length > 0)
	{
		if(value.length <= maxLength)
		{
			return true;
		}
		
		return false;
	}
	
	return true;
}

function validateLessThan(element, lessThanValue)
{
	var value = element.val().trim();
	
	if(value.length > 0)
	{
		value = parseInt(value);
		
		if(!isNaN(value) && value < lessThanValue)
		{
			return true;
		}
		
		return false;
	}
	
	return true;
}

function validateGreaterThan(element, greaterThanValue)
{
	var value = element.val().trim();
	
	if(value.length > 0)
	{
		value = parseInt(value);
		
		if(!isNaN(value) && value > greaterThanValue)
		{
			return true;
		}
		
		return false;
	}
	
	return true;
}

function validateEmail(element)
{
	var value = element.val().trim();
	
	if(value.length > 0)
	{
		return /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum|in|ru|uk)\b$/.test(value);
	}
	
	return true;
}

function validateUrl(element)
{
	var value = element.val().trim();
	
	if(value.length > 0)
	{
		return /^((https?:)?\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(value);
	}
	
	return true;
}

function validateMatch(element, matchValue)
{
	var value = element.val();
	
	if(value == matchValue)
	{
		return true;
	}
	
	return false;
}

function validate(containerId)
{
	var validated = true;
	var validationSelector = '[data-validation]';
	var validationErrorSources = new Array();
	
	if(containerId)
	{
		validationSelector = '#' + containerId + ' ' + validationSelector;
	}
	
	$(validationSelector).each(function (index) {
		var validate = ($(this).attr('data-validation-do') == '0') ? false : true;
		var validationDependsOn = $(this).attr('data-validation-depends-on');
		
		if(validate && validationDependsOn)
		{
			validationDependsOn = validationDependsOn.split('|');
			
			var validationDependsOnField = $('#'+validationDependsOn[0]);
			
			var validationDependsOnValues = new Array();
			if(validationDependsOn.length > 1)
			{
				validationDependsOnValues = validationDependsOn[1].split(',');
			}
			else
			{
				validationDependsOnValues.push('');
			}
			
			validate = false;
			for(var index = 0; index < validationDependsOnValues.length; index++)
			{
				if(validationDependsOnField.val() == validationDependsOnValues[index])
				{
					validate = true;
					break;
				}
			}
		}
		
		if(validate)
		{
			var validation = $(this).attr('data-validation');
			
			if(validation)
			{
				var validationRules = validation.split('|');
				
				for(var validationRuleIndex in validationRules)
				{
					var validationRule = validationRules[validationRuleIndex].trim();
					
					if(validationRule == 'required' && !validateRequired($(this)))
					{
						validationErrorSources.push($(this));
						break;
					}
					
					if(validationRule == 'numeric' && !validateNumeric($(this)))
					{
						validationErrorSources.push($(this));
						break;
					}
					
					if(validationRule == 'integer' && !validateInteger($(this)))
					{
						validationErrorSources.push($(this));
						break;
					}
					
					if(validationRule == 'alphabetic' && !validateAlphabetic($(this)))
					{
						validationErrorSources.push($(this));
						break;
					}
					
					if(validationRule == 'alphanumeric' && !validateAlphanumeric($(this)))
					{
						validationErrorSources.push($(this));
						break;
					}
					
					if(validationRule == 'alphanumericwithspace' && !validateAlphanumericWithSpace($(this)))
					{
						validationErrorSources.push($(this));
						break;
					}
					
					if(validationRule.indexOf('min-') > -1)
					{
						var minLength = validationRule.replace('min-', '');
						
						if(!validateMinLength($(this), minLength))
						{
							validationErrorSources.push($(this));
							break;
						}
					}
					
					if(validationRule.indexOf('max-') > -1)
					{
						var maxLength = validationRule.replace('max-', '');
						
						if(!validateMaxLength($(this), maxLength))
						{
							validationErrorSources.push($(this));
							break;
						}
					}
					
					if(validationRule.indexOf('lt-') > -1)
					{
						var lessThanValue = validationRule.replace('lt-', '');
						
						if(!validateLessThan($(this), lessThanValue))
						{
							validationErrorSources.push($(this));
							break;
						}
					}
					
					if(validationRule.indexOf('gt-') > -1)
					{
						var greaterThanValue = validationRule.replace('gt-', '');
						
						if(!validateGreaterThan($(this), greaterThanValue))
						{
							validationErrorSources.push($(this));
							break;
						}
					}
					
					if(validationRule == 'email' && !validateEmail($(this)))
					{
						validationErrorSources.push($(this));
						break;
					}
					
					if(validationRule == 'url')
					{
						if(validateUrl($(this)))
						{
							var value = $(this).val().trim();
							
							if(value != '' && value.indexOf('http://') != 0 && value.indexOf('https://') != 0 && value.indexOf('//') != 0)
							{
								value = '//' + value;
								$(this).val(value);
							}
						}
						else
						{
							validationErrorSources.push($(this));
							break;
						}
					}
					
					if(validationRule.indexOf('match-') > -1)
					{
						var matchValue = $('#'+validationRule.replace('match-', '')).val();
						
						if(!validateMatch($(this), matchValue))
						{
							validationErrorSources.push($(this));
							break;
						}
					}
					
					// for custom callback function
					if(validationRule.length > 8 && validationRule.substr(0, 8) == 'validate')
					{
						var validateFunction = window[validationRule];
						
						if(typeof validateFunction === 'function')
						{
							var validationErrorSource = validateFunction($(this));
							
							if(typeof validationErrorSource == 'object')
							{
								validationErrorSources.push(validationErrorSource);
								break;
							}
						}
					}
				}
			}
		}
	});
	
	return validationErrorSources;
}

function setValidationErrors(validationErrorSources)
{
	for(var validationErrorSourceIndex = 0; validationErrorSourceIndex < validationErrorSources.length; validationErrorSourceIndex++)
	{
		var validationErrorSource = validationErrorSources[validationErrorSourceIndex];
		var validationError = validationErrorSource.attr('data-validation-message');
		
		validationErrorSource.addClass('validation-error-source').after('<span class="validation-error-message">'+validationError+'</span>');
	}
}

function clearValidationErrors()
{
	$('.validation-error-source').removeClass('validation-error-source');
	$('.validation-error-message').remove();
}
