document.addEventListener('DOMContentLoaded', function () {
    // Auto-fill date field with today's date
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Initialize all sliders
    const sliders = [
        { slider: 'breakfast-portion-slider', label: 'breakfast-portion-text' },
        { slider: 'lunch-portion-slider', label: 'lunch-portion-text' },
        { slider: 'dinner-portion-slider', label: 'dinner-portion-text' },
        { slider: 'snack-portion-slider', label: 'snack-portion-text' }
    ];

    sliders.forEach(({ slider, label }) => {
        const sliderElement = document.getElementById(slider);
        const labelElement = document.getElementById(label);
        
        if (sliderElement && labelElement) {
            const updateLabel = () => {
                const val = parseInt(sliderElement.value, 10);
                if (val < 33) {
                    labelElement.textContent = 'kleine Portion';
                    sliderElement.classList.remove('danger');
                } else if (val < 80) {
                    labelElement.textContent = 'mittlere Portion';
                    sliderElement.classList.remove('danger');
                } else {
                    labelElement.textContent = 'zu viel';
                    sliderElement.classList.add('danger');
                }
            };
            
            sliderElement.addEventListener('input', updateLabel);
            updateLabel();
        }
    });

    // Initialize all ampel groups
    const ampelGroups = [
        'breakfastReflectionGroup', 'breakfastHealthGroup',
        'lunchReflectionGroup', 'lunchHealthGroup', 
        'dinnerReflectionGroup', 'dinnerHealthGroup',
        'snackReflectionGroup', 'snackHealthGroup'
    ];
    
    ampelGroups.forEach(setupAmpel);

    function setupAmpel(groupId) {
        const group = document.getElementById(groupId);
        if (!group) return;
        
        const buttons = group.querySelectorAll('.ampel-button');
        const hiddenInputId = group.getAttribute('data-input');
        const hiddenInput = document.getElementById(hiddenInputId);
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                
                if (hiddenInput) {
                    hiddenInput.value = button.getAttribute('data-value');
                }
            });
        });
    }
});
