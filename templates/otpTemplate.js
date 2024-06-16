exports.otpTemplate = (otp) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>One-Time Password (OTP)</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; text-align: center; background-color: #f5f5f5; padding: 20px;">

            <h2 style="color: #333;">One-Time Password (OTP)</h2>

            <p style="color: #555; font-size: 16px;">Your One-Time Password (OTP) for authentication is:</p>

            <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 15px; border-radius: 5px;">
                <h3 style="color: #333; font-size: 24px;">${otp}</h3>
            </div>

            <p style="color: #555; font-size: 16px;">This OTP is valid for a short period. Please do not share it with anyone.</p>

            <p style="color: #888; font-size: 14px;">Best regards,<br> The Authentication Team</p>

        </body>
        </html>
    `;
};
