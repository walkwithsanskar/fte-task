exports.welcomeTemplate = (fName, lName) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Anonymous Social Media</title>
        </head>
        <body style="font-family: 'Arial', sans-serif; text-align: center; background-color: #f5f5f5; padding: 20px;">

            <h2 style="color: #333;">Welcome, ${fName} ${lName}!</h2>

            <p style="color: #555; font-size: 16px;">Thank you for joining our anonymous social media platform. We're excited to have you on board!</p>

            <p style="color: #555; font-size: 16px;">With our platform, you can connect with others, share your thoughts, and engage in discussions while maintaining your privacy.</p>

            <p style="color: #555; font-size: 16px;">Feel free to explore and make the most of your anonymous social experience. If you have any questions or concerns, don't hesitate to reach out to our support team.</p>

            <p style="color: #555; font-size: 16px;">Once again, welcome aboard!</p>

            <p style="color: #888; font-size: 14px;">Best regards,<br> The Hush Mate Social Media Team</p>

        </body>
        </html>
    `;
};
