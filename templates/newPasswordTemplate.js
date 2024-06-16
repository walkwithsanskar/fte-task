exports.yourNewPassTemplate = (password) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your New Password</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; text-align: center; background-color: #f5f5f5; padding: 20px;">

            <h2 style="color: #333;">Your New Password</h2>

            <p style="color: #555; font-size: 16px;">Your password has been successfully reset. Below is your new password:</p>

            <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 15px; border-radius: 5px;">
                <h3 style="color: #333; font-size: 24px;">${password}</h3>
            </div>

            <p style="color: #555; font-size: 16px;">We recommend changing your password after logging in for security reasons.</p>

            <p style="color: #888; font-size: 14px;">Best regards,<br> The Security Team</p>

        </body>
        </html>
    `;
};
