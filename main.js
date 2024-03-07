function calculateAge() {
    const day = document.getElementById('day').value.trim();
    const month = document.getElementById('month').value.trim();
    const year = document.getElementById('year').value.trim();
    
    const dayLabel = document.getElementById('dayLabel');
    const monthLabel = document.getElementById('monthLabel');
    const yearLabel = document.getElementById('yearLabel');
    
    const dayError = document.getElementById('dayError');
    const monthError = document.getElementById('monthError');
    const yearError = document.getElementById('yearError');

    const dayInput = document.getElementById('day'); 
    const monthInput = document.getElementById('month'); 
    const yearInput = document.getElementById('year'); 
    
    const today = new Date();
    const maxYear = today.getFullYear();
    const maxMonth = today.getMonth() + 1;
    const maxDay = today.getDate();

    
    let isValid = true;
  
    // Vérification des champs vides
    if (day === '') {
      dayLabel.style.color = 'hsl(0, 100%, 67%)';
      dayError.innerText = 'This field is required';
      dayInput.classList.add('input-error');
      isValid = false;
    }
    if (month === '') {
      monthLabel.style.color = 'hsl(0, 100%, 67%)';
      monthError.innerText = 'This field is required';
      monthInput.classList.add('input-error');
      isValid = false;
    }
    if (year === '') {
      yearLabel.style.color = 'hsl(0, 100%, 67%)';
      yearError.innerText = 'This field is required';
      yearInput.classList.add('input-error');
      isValid = false;
    }

    // Vérification des valeurs incorrectes
    if (isValid) {
      if (isNaN(day) || day < 1 || day > 31) {
        dayLabel.style.color = 'hsl(0, 100%, 67%)';
        dayError.innerText = 'Must be a valid day';
        dayInput.classList.add('input-error');
        isValid = false;
      } else {
        if ((month === '4' || month === '04'|| month === '6' || month === '06' || month === '9' || month === '09'|| month === '11') && day > 30) {
          dayLabel.style.color = 'hsl(0, 100%, 67%)';
          dayError.innerText = 'Must be a valid date';
          dayInput.classList.add('input-error');
          isValid = false;
        } else if (month === '2'|| month === '02') {
          const isLeapYear = (parseInt(year) % 4 === 0 && parseInt(year) % 100 !== 0) || parseInt(year) % 400 === 0;
          if ((isLeapYear && parseInt(day) > 29) || (!isLeapYear && parseInt(day) > 28)) {
            dayLabel.style.color = 'hsl(0, 100%, 67%)';
            dayError.innerText = 'Must be a valid date';
            dayInput.classList.add('input-error');
            isValid = false;
          }
        }
      }
    
      if (isNaN(month) || month < 1 || month > 12) {
        monthLabel.style.color = 'hsl(0, 100%, 67%)';
        monthError.innerText = 'Must be a valid month';
        monthInput.classList.add('input-error');
        isValid = false;
      }
      
      if (isNaN(year) || year < 1900 || year > maxYear) {
        yearLabel.style.color = 'hsl(0, 100%, 67%)';
        yearError.innerText = 'Must be in the past';
        yearInput.classList.add('input-error');
        isValid = false;
      }
    }
    
    if (isValid) {
      const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
      let ageYears = today.getFullYear() - birthDate.getFullYear();
      let ageMonths = today.getMonth() - birthDate.getMonth();
      let ageDays = today.getDate() - birthDate.getDate();
    
      if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
      }
    
      if (ageDays < 0) {
        const tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += tempDate.getDate();
        ageMonths--;
      }
    
      document.getElementById('years').innerText = ageYears;
      document.getElementById('months').innerText = ageMonths;
      document.getElementById('days').innerText = ageDays;
    
      // Réinitialiser les messages d'erreur et les couleurs des labels
      resetErrors();
    }
  }
    
  function resetErrors() {
    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
      label.style.color = '';
    });
    
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => {
      error.innerText = '';
    });
  }
