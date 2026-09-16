const workSpaceTemplate = ({
  workspaceName,
  memberName,
  managerName,
  inviteLink,
  expiryTime,
}: {
  workspaceName: string;
  memberName: string;
  managerName: string;
  inviteLink: string;
  expiryTime: string;
}) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">

    <h2>You're invited to join ${workspaceName}</h2>

    <p>Hi ${memberName},</p>

    <p>
      <strong>${managerName}</strong> has invited you to join
      <strong>${workspaceName}</strong> on TaskOrbit.
    </p>

    <p>
      TaskOrbit helps teams organize projects, manage tasks,
      and collaborate efficiently in one place.
    </p>

    <p>
      <strong>Workspace:</strong> ${workspaceName}<br>
      <strong>Invited by:</strong> ${managerName}
    </p>

    <div style="margin: 30px 0;">
      <a
        href="${inviteLink}"
        style="
          background: #2563eb;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
        "
      >
        Join Workspace
      </a>
    </div>

    <p>
      If you don't have a TaskOrbit account yet, create one using
      the same email address this invitation was sent to.
    </p>

    <p>
      This invitation will expire in ${expiryTime}.
    </p>

    <p>
      If you weren't expecting this invitation, you can safely ignore this email.
    </p>

    <br>

    <p>
      Thanks,<br>
      <strong>The TaskOrbit Team</strong>
    </p>

  </div>
`;


export default workSpaceTemplate;