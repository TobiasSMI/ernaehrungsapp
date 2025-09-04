class FormSwiper {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 5;
        this.formSteps = document.querySelectorAll('.form-step');
        this.stepIndicators = document.querySelectorAll('.step');
        this.progressBar = document.getElementById('progressBar');
        this.nextBtn = document.getElementById('nextBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.formContainer = document.getElementById('formSteps');
        
        this.init();
    }

    init() {
        this.setupTouchEvents();
        this.setupButtonEvents();
        this.setupStepClickEvents();
        this.updateUI();
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let isDragging = false;
        let threshold = 50;

        this.formContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            this.formContainer.classList.add('touching');
        });

        this.formContainer.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const deltaX = currentX - startX;
            const deltaY = Math.abs(currentY - startY);
            
            // Nur horizontal scrollen wenn mehr horizontal als vertikal
            if (Math.abs(deltaX) > deltaY) {
                e.preventDefault();
            }
        });

        this.formContainer.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            this.formContainer.classList.remove('touching');
            
            const deltaX = currentX - startX;
            
            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0 && this.currentStep > 0) {
                    this.goToStep(this.currentStep - 1);
                } else if (deltaX < 0 && this.currentStep < this.totalSteps - 1) {
                    this.goToStep(this.currentStep + 1);
                }
            }
        });
    }

    setupButtonEvents() {
        this.nextBtn.addEventListener('click', () => {
            if (this.currentStep === this.totalSteps - 1) {
                document.getElementById('dailyForm').submit();
            } else {
                this.goToStep(this.currentStep + 1);
            }
        });

        this.prevBtn.addEventListener('click', () => {
            this.goToStep(this.currentStep - 1);
        });
    }

    setupStepClickEvents() {
        this.stepIndicators.forEach((step, index) => {
            step.addEventListener('click', () => {
                this.goToStep(index);
            });
        });
    }

    goToStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= this.totalSteps || stepIndex === this.currentStep) {
            return;
        }

        // Animation direction
        const direction = stepIndex > this.currentStep ? 'next' : 'prev';
        
        // Hide current step
        this.formSteps[this.currentStep].classList.remove('active');
        this.formSteps[this.currentStep].classList.add(direction);
        
        setTimeout(() => {
            this.formSteps[this.currentStep].classList.remove(direction);
            
            // Show new step
            this.currentStep = stepIndex;
            this.formSteps[this.currentStep].classList.add('active');
            
            this.updateUI();
        }, 100);
    }

    updateUI() {
        // Update progress bar
        const progress = ((this.currentStep + 1) / this.totalSteps) * 100;
        this.progressBar.style.width = `${progress}%`;
        
        // Update step indicators
        this.stepIndicators.forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index === this.currentStep) {
                step.classList.add('active');
            } else if (index < this.currentStep) {
                step.classList.add('completed');
            }
        });
        
        // Update navigation buttons
        this.prevBtn.style.display = this.currentStep === 0 ? 'none' : 'block';
        this.nextBtn.textContent = this.currentStep === this.totalSteps - 1 ? '✓ Fertig' : 'Weiter →';
    }
}

// Initialize swiper
document.addEventListener('DOMContentLoaded', () => {
    new FormSwiper();
});
