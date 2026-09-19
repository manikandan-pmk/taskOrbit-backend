interface WorkspaceTemplateProps {
  workspaceName: string;
  memberName: string;
  managerName: string;
  inviteLink: string;
  expiryTime: string;
}

const workSpaceTemplate = ({
  workspaceName,
  memberName,
  managerName,
  inviteLink,
  expiryTime,
}: WorkspaceTemplateProps): string => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Invitation to join ${workspaceName} on TaskOrbit</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">

  <!-- Hidden Preview Text (Inbox Snippet) -->
  <div style="display: none; font-size: 1px; color: #f8fafc; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    ${managerName} has invited you to collaborate in ${workspaceName} on TaskOrbit.
  </div>

  <!-- Background Wrapper -->
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 16px;">
    <tr>
      <td align="center">

        <!-- Email Container Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.04);">
          
          <!-- Brand Header -->
          <tr>
            <td style="padding: 36px 40px 24px 40px; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #0f172a; display: inline-flex; align-items: center;">
                      TaskOrbit<span style="color: #2563eb;">.</span>
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body Content -->
          <tr>
            <td style="padding: 36px 40px 28px 40px;">
              
              <!-- Badge -->
              <span style="display: inline-block; background-color: #eff6ff; color: #1d4ed8; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">
                Workspace Invite
              </span>

              <h1 style="margin: 0 0 16px 0; font-size: 22px; line-height: 30px; font-weight: 700; color: #0f172a;">
                Join ${workspaceName} on TaskOrbit
              </h1>

              <p style="margin: 0 0 16px 0; font-size: 15px; line-height: 24px; color: #475569;">
                Hi <strong>${memberName}</strong>,
              </p>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #475569;">
                <strong>${managerName}</strong> has invited you to collaborate in <strong>${workspaceName}</strong>. TaskOrbit helps teams centralize tasks, manage projects, and stay aligned seamlessly.
              </p>

              <!-- Details Card -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="4">
                      <tr>
                        <td width="30%" style="font-size: 13px; color: #64748b; font-weight: 500;">Workspace</td>
                        <td width="70%" style="font-size: 13px; color: #0f172a; font-weight: 600;">${workspaceName}</td>
                      </tr>
                      <tr>
                        <td width="30%" style="font-size: 13px; color: #64748b; font-weight: 500;">Invited By</td>
                        <td width="70%" style="font-size: 13px; color: #0f172a; font-weight: 600;">${managerName}</td>
                      </tr>
                      <tr>
                        <td width="30%" style="font-size: 13px; color: #64748b; font-weight: 500;">Expires In</td>
                        <td width="70%" style="font-size: 13px; color: #b45309; font-weight: 600;">${expiryTime}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Call to Action Button -->
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                <tr>
                  <td align="center" style="border-radius: 6px; background-color: #2563eb;">
                    <a href="${inviteLink}" target="_blank" style="display: inline-block; padding: 13px 28px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #2563eb; border: 1px solid #2563eb;">
                      Accept &amp; Join Workspace &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 16px 0; font-size: 13px; line-height: 20px; color: #64748b;">
                If you don't have a TaskOrbit account yet, you will be prompted to create one with the email address that received this invitation.
              </p>

              <!-- Fallback Direct URL -->
              <p style="margin: 0 0 24px 0; font-size: 12px; line-height: 18px; color: #94a3b8; word-break: break-all;">
                Button not working? Paste this URL into your browser:<br />
                <a href="${inviteLink}" style="color: #2563eb; text-decoration: underline;">${inviteLink}</a>
              </p>

              <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 24px 0;" />

              <p style="margin: 0; font-size: 14px; line-height: 22px; color: #475569;">
                Best regards,<br />
                <strong>The TaskOrbit Team</strong>
              </p>

            </td>
          </tr>

          <!-- Security & Legal Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8fafc; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0 0 8px 0; font-size: 12px; line-height: 18px; color: #94a3b8;">
                If you were not expecting an invitation from <strong>${managerName}</strong>, you can safely ignore or delete this email.
              </p>
              <p style="margin: 0; font-size: 12px; line-height: 18px; color: #cbd5e1;">
                &copy; ${new Date().getFullYear()} TaskOrbit Inc. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

export default workSpaceTemplate;