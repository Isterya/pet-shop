document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const phoneInput = document.getElementById('phone');
  const weightInput = document.getElementById('weight');
  const emailInput = document.getElementById('email');
  const submitButton = document.querySelector('.submit__btn');
  const triggersDiv = document.querySelector('.submit__triggers');

  const statusMessage = document.createElement('div');
  statusMessage.classList.add('status-message');
  triggersDiv.appendChild(statusMessage);

  // Input mask for the phone
  const createPhoneMask = (input) => {
    const matrix = '+380 (___) ___ __ __';
    input.addEventListener('input', () => {
      let i = 0;
      const def = matrix.replace(/\D/g, '');
      let val = input.value.replace(/\D/g, '');
      if (def.length >= val.length) val = def;

      input.value = matrix.replace(/./g, (char) =>
        /[_\d]/.test(char) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ''
          : char
      );
    });
  };
  createPhoneMask(phoneInput);

  // Weight validation
  weightInput.addEventListener('input', () => {
    if (weightInput.value <= 0 || weightInput.value > 50) {
      weightInput.setCustomValidity('Вес должен быть от 1 до 50 кг');
    } else {
      weightInput.setCustomValidity('');
    }
  });

  // Email validation
  emailInput.addEventListener('input', () => {
    if (!emailInput.validity.valid) {
      emailInput.setCustomValidity('Введите корректный email');
    } else {
      emailInput.setCustomValidity('');
    }
  });

  // Showing the message
  const showMessage = (message, isSuccess) => {
    statusMessage.textContent = message;
    statusMessage.style.color = isSuccess ? 'green' : 'red';
    statusMessage.style.opacity = '1';

    setTimeout(() => {
      statusMessage.style.opacity = '0';
    }, 3000);
  };

  // Form submission processing
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    submitButton.disabled = true;
    showMessage('Отправка...', true);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        showMessage('Форма успешно отправлена!', true);
        form.reset();
      } else {
        showMessage('Ошибка отправки. Попробуйте снова.', false);
      }
      submitButton.disabled = false;
    }, 2000);
  });
});
