exports.secretTemplate = (imageUrl, secretText) => {
    return imageUrl?`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Secret Message</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; text-align: center; background-color: #f5f5f5; padding: 20px;">

        <h2 style="color: #333;">Secret Message</h2>

        <img src="${imageUrl}" alt="Secret Image" style="max-width: 100%; height: auto; margin: 15px;">

        <p style="color: #555; font-size: 16px;">You've received a secret message:</p>

        <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 15px; border-radius: 5px;">
            <p style="color: #333; font-size: 16px;">${secretText}</p>
        </div>

        <p style="color: #555; font-size: 16px;">Enjoy the mystery!</p>

        <p style="color: #888; font-size: 14px;">Best regards,<br> The Secret Message Team</p>

    </body>
    </html>
`:`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secret Message</title>
</head>
<body style="font-family: 'Arial', sans-serif; text-align: center; background-color: #f5f5f5; padding: 20px;">

    <h2 style="color: #333;">Secret Message</h2>

    <p style="color: #555; font-size: 16px;">You've received a secret message:</p>

    <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 15px; border-radius: 5px;">
        <p style="color: #333; font-size: 16px;">${secretText}</p>
    </div>

    <p style="color: #555; font-size: 16px;">Enjoy the mystery!</p>

    <p style="color: #888; font-size: 14px;">Best regards,<br> The Secret Message Team</p>

</body>
</html>
`;
};
