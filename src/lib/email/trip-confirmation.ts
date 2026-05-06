export interface TripEmailData {
  recipientName: string;
  recipientEmail: string;
  planId: string;
  specialty: string;
  urgency: string;
  triageSummary?: string | null;
  hospitalName: string;
  hospitalAddress?: string | null;
  packageName?: string | null;
  hospitalCost: number;
  hotelName: string;
  hotelAddress?: string | null;
  hotelStars: number;
  pricePerNight: number;
  nights: number;
  hotelCost: number;
  transportName: string;
  transportCost: number;
  events: { name: string; price: number }[];
  eventsCost: number;
  serviceFee: number;
  totalCost: number;
  travelDate?: string | null;
  paymentMethod?: string | null;
}

function esc(s: string | null | undefined) {
  return (s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    });
  } catch {
    return iso;
  }
}

const PAYMENT_LABELS: Record<string, string> = {
  pay_on_arrival: "Pay on Arrival",
  bank_transfer: "Bank Transfer",
  online: "Online Payment",
};

const URGENCY_COLORS: Record<string, string> = {
  low: "#16a34a",
  moderate: "#d97706",
  high: "#f97316",
  emergency: "#dc2626",
};

const URGENCY_BG: Record<string, string> = {
  low: "#f0fdf4",
  moderate: "#fffbeb",
  high: "#fff7ed",
  emergency: "#fef2f2",
};

function mapsSearchUrl(name: string, suffix = "Al-Ahsa, Saudi Arabia") {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${suffix}`)}`;
}

function staticMapUrl(name: string): string | null {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return null;
  const q = encodeURIComponent(`${name}, Al-Ahsa, Saudi Arabia`);
  return `https://maps.googleapis.com/maps/api/staticmap?center=${q}&zoom=14&size=560x160&scale=2&maptype=roadmap&markers=color:red%7C${q}&key=${encodeURIComponent(key)}`;
}

function locationCard(name: string, address: string | null | undefined, label: string) {
  const mapLink = mapsSearchUrl(name);
  const staticImg = staticMapUrl(name);

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      <tr><td style="padding:0 0 8px;">
        <span style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">${esc(label)}</span>
      </td></tr>
    </table>
    <table width="100%" cellpadding="0" cellspacing="0"
      style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;">
      <tr><td>
        ${staticImg
          ? `<img src="${esc(staticImg)}" alt="Map" width="560" style="width:100%;max-width:560px;height:160px;object-fit:cover;display:block;" />`
          : `<div style="background:#dbeafe;padding:20px 24px;text-align:center;">
               <span style="font-size:28px;">📍</span>
               <p style="margin:8px 0 0;font-size:12px;color:#1d4ed8;font-weight:600;">Al-Ahsa, Saudi Arabia</p>
             </div>`
        }
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:16px 20px;">
          <tr><td>
            <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#1e293b;">${esc(name)}</p>
            ${address ? `<p style="margin:0 0 12px;font-size:13px;color:#64748b;">${esc(address)}</p>` : `<p style="margin:0 0 12px;font-size:13px;color:#64748b;">Al-Ahsa, Saudi Arabia</p>`}
            <a href="${mapLink}" target="_blank"
              style="display:inline-block;background:#1d4ed8;color:#ffffff;font-size:13px;font-weight:600;
                     padding:8px 16px;border-radius:8px;text-decoration:none;">
              View on Google Maps →
            </a>
          </td></tr>
        </table>
      </td></tr>
    </table>`;
}

export function buildTripConfirmationEmail(data: TripEmailData): {
  subject: string;
  html: string;
} {
  const planRef = `WIS-${data.planId.slice(-8).toUpperCase()}`;
  const urgencyColor = URGENCY_COLORS[data.urgency] ?? "#3d2e1e";
  const urgencyBg = URGENCY_BG[data.urgency] ?? "#f8fafc";
  const urgencyLabel =
    data.urgency === "low" ? "Low" :
    data.urgency === "moderate" ? "Moderate" :
    data.urgency === "high" ? "High" : "Emergency";

  const paymentLabel = data.paymentMethod
    ? (PAYMENT_LABELS[data.paymentMethod] ?? data.paymentMethod)
    : "To be confirmed";

  const usdAmount = Math.round(data.totalCost / 3.75).toLocaleString();

  const eventRows = data.events
    .map(
      (e) =>
        `<tr>
          <td style="padding:6px 0;font-size:13px;color:#475569;">• ${esc(e.name)}</td>
          <td style="padding:6px 0;font-size:13px;color:#475569;text-align:right;">
            ${e.price === 0 ? '<span style="color:#16a34a;font-weight:600;">Free</span>' : `${e.price.toLocaleString()} SAR`}
          </td>
        </tr>`
    )
    .join("");

  const subject = `Your Wisal Journey Plan – ${planRef}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr><td align="center">
      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0"
        style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;
               box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- ── Header ── -->
        <tr><td style="background:linear-gradient(135deg,#1e3a5f 0%,#1d4ed8 100%);padding:36px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:1px;">WISAL</p>
                <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">Medical Tourism Platform</p>
              </td>
              <td align="right">
                <p style="margin:0;font-size:11px;font-weight:700;color:rgba(255,255,255,0.9);">${esc(planRef)}</p>
                <p style="margin:4px 0 0;font-size:10px;color:rgba(255,255,255,0.6);">
                  ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- ── Destination ribbon ── -->
        <tr><td style="background:#dbeafe;padding:10px 40px;">
          <p style="margin:0;font-size:12px;font-weight:700;color:#1d4ed8;">
            📍&nbsp; Destination: Al-Ahsa, Saudi Arabia
          </p>
        </td></tr>

        <!-- ── Greeting ── -->
        <tr><td style="padding:32px 40px 24px;">
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1e293b;">
            Your journey plan is ready!
          </h1>
          <p style="margin:0;font-size:15px;color:#475569;line-height:1.6;">
            Dear ${esc(data.recipientName)}, thank you for choosing Wisal.
            Here is your complete medical journey itinerary for Al-Ahsa, Saudi Arabia.
          </p>
        </td></tr>

        <!-- ── Medical Assessment ── -->
        <tr><td style="padding:0 40px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0"
            style="border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
            <tr><td style="padding:16px 20px;background:#f8fafc;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Medical Assessment</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:8px;">
                    <span style="display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:12px;font-weight:700;
                                 padding:4px 10px;border-radius:6px;">${esc(data.specialty)}</span>
                  </td>
                  <td>
                    <span style="display:inline-block;background:${esc(urgencyBg)};color:${esc(urgencyColor)};
                                 font-size:12px;font-weight:700;padding:4px 10px;border-radius:6px;">
                      ${esc(urgencyLabel)} Urgency
                    </span>
                  </td>
                </tr>
              </table>
              ${data.triageSummary
                ? `<p style="margin:12px 0 0;font-size:13px;color:#475569;line-height:1.6;">${esc(data.triageSummary)}</p>`
                : ""}
            </td></tr>
          </table>
        </td></tr>

        <!-- ── Hospital ── -->
        <tr><td style="padding:0 40px 24px;">
          ${locationCard(data.hospitalName, data.hospitalAddress, "Hospital")}
        </td></tr>

        <!-- ── Hotel ── -->
        <tr><td style="padding:0 40px 24px;">
          ${locationCard(data.hotelName, data.hotelAddress, "Hotel")}
        </td></tr>

        <!-- ── Journey Breakdown ── -->
        <tr><td style="padding:0 40px 24px;">
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Journey Breakdown</p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">

            <!-- Hospital row -->
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">${esc(data.hospitalName)}</p>
                <p style="margin:2px 0 0;font-size:12px;color:#64748b;">
                  ${esc(data.packageName ?? "Initial consultation")}
                </p>
              </td>
              <td style="padding:12px 16px;text-align:right;white-space:nowrap;">
                <span style="font-size:14px;font-weight:700;color:#1e293b;">${data.hospitalCost.toLocaleString()} SAR</span>
              </td>
            </tr>

            <!-- Hotel row -->
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">
                  ${esc(data.hotelName)}&nbsp;${"★".repeat(data.hotelStars)}
                </p>
                <p style="margin:2px 0 0;font-size:12px;color:#64748b;">
                  ${data.nights} nights × ${data.pricePerNight.toLocaleString()} SAR/night
                </p>
              </td>
              <td style="padding:12px 16px;text-align:right;white-space:nowrap;">
                <span style="font-size:14px;font-weight:700;color:#1e293b;">${data.hotelCost.toLocaleString()} SAR</span>
              </td>
            </tr>

            <!-- Transport row -->
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">${esc(data.transportName)}</p>
                <p style="margin:2px 0 0;font-size:12px;color:#64748b;">Airport transfers &amp; hospital trips</p>
              </td>
              <td style="padding:12px 16px;text-align:right;white-space:nowrap;">
                <span style="font-size:14px;font-weight:700;color:#1e293b;">${data.transportCost.toLocaleString()} SAR</span>
              </td>
            </tr>

            <!-- Events rows -->
            ${data.events.length > 0
              ? `<tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:12px 16px;">
                    <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">Activities (${data.events.length})</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px;">${eventRows}</table>
                  </td>
                  <td style="padding:12px 16px;text-align:right;white-space:nowrap;vertical-align:top;">
                    ${data.eventsCost === 0
                      ? '<span style="font-size:14px;font-weight:700;color:#16a34a;">Free</span>'
                      : `<span style="font-size:14px;font-weight:700;color:#1e293b;">${data.eventsCost.toLocaleString()} SAR</span>`}
                  </td>
                </tr>`
              : ""
            }

            <!-- Service fee -->
            <tr style="border-bottom:1px solid #f1f5f9;">
              <td style="padding:12px 16px;">
                <p style="margin:0;font-size:14px;font-weight:600;color:#1e293b;">Wisal Coordination Fee</p>
                <p style="margin:2px 0 0;font-size:12px;color:#64748b;">Airport pickup, scheduling &amp; support</p>
              </td>
              <td style="padding:12px 16px;text-align:right;white-space:nowrap;">
                <span style="font-size:14px;font-weight:700;color:#1e293b;">${data.serviceFee.toLocaleString()} SAR</span>
              </td>
            </tr>

            <!-- Total row -->
            <tr>
              <td style="padding:16px;background:#eff6ff;">
                <p style="margin:0;font-size:14px;font-weight:700;color:#1e293b;">Total Estimated Cost</p>
                <p style="margin:4px 0 0;font-size:12px;color:#16a34a;font-weight:600;">Save 40–60% vs. home country prices</p>
              </td>
              <td style="padding:16px;background:#eff6ff;text-align:right;white-space:nowrap;vertical-align:top;">
                <p style="margin:0;font-size:22px;font-weight:800;color:#1d4ed8;">${data.totalCost.toLocaleString()} SAR</p>
                <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">≈ $${usdAmount} USD</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- ── Booking Details ── -->
        ${(data.travelDate || data.paymentMethod)
          ? `<tr><td style="padding:0 40px 24px;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Booking Details</p>
              <table width="100%" cellpadding="0" cellspacing="0"
                style="border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;overflow:hidden;">
                <tr><td style="padding:16px 20px;">
                  ${data.travelDate
                    ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                        <tr>
                          <td style="font-size:12px;color:#94a3b8;width:130px;">Travel Date</td>
                          <td style="font-size:13px;font-weight:600;color:#1e293b;">${esc(formatDate(data.travelDate))}</td>
                        </tr>
                      </table>`
                    : ""}
                  ${data.paymentMethod
                    ? `<table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:12px;color:#94a3b8;width:130px;">Payment Method</td>
                          <td style="font-size:13px;font-weight:600;color:#1e293b;">${esc(paymentLabel)}</td>
                        </tr>
                      </table>`
                    : ""}
                </td></tr>
              </table>
            </td></tr>`
          : ""}

        <!-- ── Next Steps ── -->
        <tr><td style="padding:0 40px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0"
            style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#1e293b;">What happens next?</p>
              <p style="margin:0 0 6px;font-size:13px;color:#475569;">✅&nbsp; Our team will contact you on WhatsApp within 24 hours</p>
              <p style="margin:0 0 6px;font-size:13px;color:#475569;">✅&nbsp; We'll confirm your appointment and arrange airport pickup</p>
              <p style="margin:0;font-size:13px;color:#475569;">✅&nbsp; You'll receive a detailed itinerary before your travel date</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- ── Footer ── -->
        <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1e293b;">Wisal Medical Tourism</p>
          <p style="margin:0 0 12px;font-size:12px;color:#64748b;">Al-Ahsa, Saudi Arabia</p>
          <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6;">
            All prices are estimates and subject to final confirmation at booking.<br/>
            This email was sent to ${esc(data.recipientEmail)} regarding plan ${esc(planRef)}.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;

  return { subject, html };
}
