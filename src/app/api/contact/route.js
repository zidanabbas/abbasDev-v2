import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { firstName, lastName, email, phone, service, message } =
      await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `Job Inquiry from Personal Website: ${firstName} ${lastName} - Interested in ${service}`,
      text: `
            Hello,

            You have received a new job inquiry from your personal website.

            Details:
            Name    : ${firstName} ${lastName}
            Email   : ${email}
            Phone   : ${phone}
            Service : ${service}

            Message from client:
            ${message}

            Please respond to this inquiry as soon as possible.

            Best regards,
            Your Website Notification System
                `,
      html: `
                    <h1>Hello,</h1>
                    <h2>You have received a new job inquiry from your personal website.</h2>
                    <h3>Details:</h3>
                    <ul>
                        <li><h4><strong>Name</strong>: <strong>${firstName} ${lastName}</strong></h4></li>
                        <li><h4><strong>Email</strong>: <strong>${email}</strong></h4></li>
                        <li><h4><strong>Phone</strong>: <strong>${phone}</strong></h4></li>
                        <li><h4><strong>Service</strong>: <strong>${service}</strong></h4></li>
                    </ul>
                    <h4><strong>Message from client:</strong></h4>
                    <h4>${message}</h4>
                    <p>Please respond to this inquiry as soon as possible.</p>
                    <p>Best regards,<br>Your Website Notification System</p>
                `,
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
