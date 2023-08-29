import nodemailer from "nodemailer";

export const sendEmailUserLoginInfo = async ({ to, sub, msg }) => {
  // Transport
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `Ecommerce Pro <${process.env.MAIL_ID}>`,
      to: to,
      subject: sub,
      text: msg,
    });
  } catch (error) {
    console.log(error);
  }
};

// Password Reset Link
export const passwordResetMail = async (to, data) => {
  // Transport
  const transporter = nodemailer.createTransport({
    port: process.env.MAIL_PORT,
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `Facebook Pro <${process.env.MAIL_ID}>`,
      subject: `Reset password`,
      to: to,
      html: `<body style="padding:0;margin:0;">
          <center class="wrapper" style="width:100%;table-layout:fixed;background-color:#ddd;padding-top:30px;padding-bottom:30px;">
            <table class="main" style="background-color:#fff;color:rgb(37, 36, 36);width:100%;max-width:600px;margin:0 auto;border-spacing:0;font-family:sans-serif;padding: 20px;">
              <!-- Header section -->
              <tr>
                <td height="16" style="padding:0;background-color: #fff;" class="header-section">
                  <table width="100%" style="border-spacing:0;">
                    <tr>
                      <td class="two-collum" style="padding:0;text-align:left;">
                        <table width="100%" style="border-spacing:0;border-bottom: 1px solid #ddd;">
                          <tr>
                            <td class="colum1" style="padding:0;width:100%;max-width:60px;height:100%;display:inline-block;vertical-align:top;">
                              <a href="http://localhost:3000/" style="text-decoration:none;">
                                <img style="border:0;padding-top: 10px;" width="50"  src="https://i.ibb.co/YQDGnfX/Facebook-logo.png" alt="Facebook-logo" border="0">
                              </a>
                            </td>
                            <td class="colum2" style="padding:0;width:100%;max-width:400px;display:inline-block;vertical-align:top;">
                              <h4 style="color: #2377f2;" class="header-tittle">Facebook Pro</h4>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- body Section -->
              <tr>
                <td class="body-section" style="padding:0;background-color: #fff;">
                  <table width="100%" style="border-spacing:0;padding: 0 10px;">
                    <tr>
                      <td class="recever-name" style="padding:0;">
                        <p style="color: rgb(35, 35, 35);">Hi, ${data.name}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="body-section" style="padding:0;background-color: #fff;">
                  <table width="100%" style="border-spacing:0;padding: 0 10px;">
                    <tr>
                      <td class="message-name" style="padding:0;">
                        <p style="color: rgb(35, 35, 35); margin: 0;">We receved a request to reset your Facebook Pro password.</p>
                      </td>
                    </tr>
                    <tr>
                      <td class="message-name" style="padding:0;">
                        <p style="color: rgb(35, 35, 35); margin: 0;">Enter The Following password reset code:</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="body-section" style="padding:0;background-color: #fff;">
                  <table width="100%" style="border-spacing:0;padding: 30px 10px;">
                    <tr>
                      <td class="message-name" style="padding:0;">
                        <a href="#" style="text-decoration:none;"> <button style="padding: 10px; border: 1px solid #2377f2; background-color:#f1f2f4; color:rgb(7, 0, 0); outline: none; border-radius: 4px; cursor: pointer; font-size: 20px; letter-spacing: 3px;">${data.code}</button></a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="body-section" style="padding:0;background-color: #fff;">
                  <table width="100%" style="border-spacing:0;padding: 0 10px;">
                    <tr>
                      <td class="message-name" style="padding:0;">
                        <p style="color: rgb(93, 91, 91); font-weight: 300; margin: 0;">Alternatively, You can Directly Change Your Password.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td class="body-section" style="padding:0;background-color: #fff;">
                  <table width="100%" style="border-spacing:0;padding: 10px 10px;">
                    <tr>
                      <td class="message-name" style="padding:0;">
                        <a href="${data.link}" style="text-decoration:none; width: 100%;"> <button style="padding: 10px; width: 100%; border-radius: 5px; background-color:#2377f2; color:rgb(255, 255, 255); border: none; outline: none; cursor: pointer; font-size: 16px; letter-spacing: 2px;">Change Your Password</button></a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- body Section -->
              <!-- footer section -->
              <tr>
                <td class="body-section" style="padding:0;background-color: #fff;">
                  <table width="100%" style="border-spacing:0;padding: 0 10px; border-top: 1px solid #ddd; margin-top: 40px;">
                    <tr>
                      <td class="recever-name" style="padding:0;">
                        <p style="color: rgb(109, 109, 109); font-size: 13px; text-align: center;">From</p>
                        <p style="color: #2377f2; margin: 0; font-size: 23px; text-align: center;">Facebook Pro</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </center>
        </body>`,
    });
  } catch (error) {
    console.log(error);
  }
};
