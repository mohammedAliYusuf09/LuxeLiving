export const DB_NAME = 'luxeLiving';

export const emailFormat = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f6f6f6;
        padding: 20px;
        margin: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        padding: 30px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }
      .title {
        font-size: 22px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 20px;
      }
      .otp {
        font-size: 28px;
        font-weight: bold;
        color: #4caf50;
        margin: 20px 0;
        letter-spacing: 4px;
      }
      .info {
        font-size: 16px;
        color: #555555;
        margin-bottom: 20px;
      }
      .footer {
        font-size: 14px;
        color: #888888;
        margin-top: 40px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="title">Password Reset Request</div>
      <div class="info">
        You recently requested to reset your password. Use the OTP below to proceed:
      </div>
      <div class="otp">123456</div>
      <div class="info">
        This OTP is valid for the next 10 minutes. Do not share it with anyone. If you did not request a password reset, please ignore this email or contact our support team.
      </div>
      <div class="footer">
        &copy; 2025 Your Company Name. All rights reserved.
      </div>
    </div>
  </body>
</html>`;



