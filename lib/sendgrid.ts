import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function sendReportEmail(opts: {
  to: string
  firstName: string
  reportId: string
  wallet: string
  riskScore: number
  riskLevel: string
  reportUrl: string
  pdfBuffer: Buffer
}) {
  await sgMail.send({
    to:   opts.to,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: `Your TRACR Forensic Report — ${opts.reportId}`,
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050608; color: #c8cdd8; padding: 40px 32px;">
        <div style="font-family: 'DM Mono', monospace; font-size: 22px; letter-spacing: 0.1em; color: #fff; margin-bottom: 32px;">
          TRA<span style="color: #d4a843;">C</span>R
        </div>
        <p style="font-size: 15px; line-height: 1.7; margin-bottom: 16px;">Dear ${opts.firstName},</p>
        <p style="font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
          Your blockchain forensic report is ready. Report ID: <strong style="color: #d4a843;">${opts.reportId}</strong>
        </p>
        <div style="background: #0d1018; border: 1px solid #222840; border-left: 4px solid #d4a843; padding: 20px 24px; margin-bottom: 32px;">
          <div style="font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #4a5468; margin-bottom: 8px;">Risk Assessment</div>
          <div style="font-size: 28px; font-weight: 700; color: #d4a843;">${opts.riskScore}/100</div>
          <div style="font-size: 14px; color: #c8cdd8; margin-top: 4px;">${opts.riskLevel} Risk</div>
        </div>
        <p style="font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
          Your full court-ready PDF report is attached to this email and available for download below.
        </p>
        <a href="${opts.reportUrl}"
           style="display: inline-block; background: #d4a843; color: #050608; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.05em; margin-bottom: 32px;">
          Download Report →
        </a>
        <div style="font-size: 11px; color: #4a5468; line-height: 1.6; border-top: 1px solid #181d2c; padding-top: 24px;">
          Report ID: ${opts.reportId}<br>
          Target: ${opts.wallet}<br><br>
          This report is for informational purposes only and does not constitute legal advice.
        </div>
      </div>
    `,
    attachments: [{
      content:     opts.pdfBuffer.toString('base64'),
      filename:    `${opts.reportId}.pdf`,
      type:        'application/pdf',
      disposition: 'attachment',
    }],
  })
}
