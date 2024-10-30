document.addEventListener("DOMContentLoaded", () => {
    const showAlert = () => {
        Swal.fire({
            title: 'Member has opted for RCI',
            text: 'Kindly contact support',
            icon: 'warning',
            customClass: {
                title: 'swal-title',
                htmlContainer: 'swal-text',
                confirmButton: 'swal-confirm-btn'
            },
            confirmButtonText: 'OK'
        });
    };

    let selectedOption = 'Phone Number';
    const phoneNumberInput = document.getElementById('inputField');
    const otpInput = document.getElementById('otpField');
    const sendOtpButton = document.getElementById('sendOtpButton');

    const handleCheckboxChange = (option) => {
        selectedOption = option;
        phoneNumberInput.value = ''; // Reset phone number when switching options
        phoneNumberInput.setAttribute('placeholder', `Enter ${selectedOption}`);
    };

    document.getElementById('phoneCheckbox').addEventListener('change', (event) => {
        if (event.target.checked) {
            handleCheckboxChange('Phone Number');
            document.getElementById('memberIdCheckbox').checked = false;
        }
    });

    document.getElementById('memberIdCheckbox').addEventListener('change', (event) => {
        if (event.target.checked) {
            handleCheckboxChange('Member ID');
            document.getElementById('phoneCheckbox').checked = false;
        }
    });

    phoneNumberInput.addEventListener('input', (e) => {
        const value = e.target.value;
        const phoneRegex = /^[0-9\b]+$/;

        if (value === '' || phoneRegex.test(value)) {
            phoneNumberInput.value = value;

            if (selectedOption === 'Phone Number' && value.length < 10) {
                // Show error message logic if needed
            } else if (selectedOption === 'Member ID' && value.length !== 16) {
                // Show error message logic if needed
            }
        }
    });

    sendOtpButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const phoneNumber = phoneNumberInput.value;

        const isValid =
            (selectedOption === 'Phone Number' && phoneNumber.length === 10) ||
            (selectedOption === 'Member ID' && phoneNumber.length === 16);

        if (!isValid) {
            alert(`Please enter a valid ${selectedOption === 'Phone Number' ? '10' : '16'}-digit ${selectedOption}.`);
            return;
        }

        const NumberDetails = {
            call_type: 1,
            call: '9207',
            reg_number: phoneNumber,
            number_type: selectedOption === 'Phone Number' ? 'phn_number' : 'card_id'
        };

        try {
            const numresponse = await axios.post('https://krushika.org/demo/sampath/apitest.php', NumberDetails);
            console.log(phoneNumber);
            console.log(numresponse);
            alert(`OTP sent successfully for ${selectedOption}!`);
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    });
});
