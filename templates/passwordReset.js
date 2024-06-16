exports.passwordResetTemplate = (url) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; text-align: center; background-color: #f5f5f5; padding: 20px;">

            <h2 style="color: #333;">Password Reset</h2>

            <p style="color: #555; font-size: 16px;">You have requested to reset your password. Click the link below to proceed:</p>

            <a href="${url}" style="display: inline-block; margin: 15px 0; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>

            <p style="color: #555; font-size: 16px;">If you didn't request this password reset, please ignore this email. Your account's security is important to us.</p>

            <p style="color: #888; font-size: 14px;">Best regards,<br> The Support Team</p>

        </body>
        </html>
    `;
};
