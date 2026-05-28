import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const bookingEmail = process.env.BOOKING_EMAIL;

if (!apiKey) {
  throw new Error("RESEND_API_KEY is missing");
}

if (!bookingEmail) {
  throw new Error("BOOKING_EMAIL is missing");
}

const resend = new Resend(apiKey);

/* =========================================================
   SIMPLE RATE LIMIT
========================================================= */

const requests = new Map<
  string,
  {
    count: number;
    time: number;
  }
>();

export async function POST(req: Request) {
  try {
    /* =========================================================
       RATE LIMIT
    ========================================================= */

    const ip =
      req.headers.get("x-forwarded-for") ||
      "unknown";

    const now = Date.now();

    const limit = requests.get(ip);

    if (!limit) {
      requests.set(ip, {
        count: 1,
        time: now,
      });
    } else {
      // RESET AFTER 10 MINUTES
      if (now - limit.time > 25 * 60 * 1000) {
        requests.set(ip, {
          count: 1,
          time: now,
        });
      } else {
        limit.count++;

        if (limit.count > 2) {
          return Response.json(
            {
              success: false,
              error:
                "Слишком много заявок. Попробуйте позже.",
            },
            {
              status: 429,
            }
          );
        }

        requests.set(ip, limit);
      }
    }

    /* =========================================================
       BODY
    ========================================================= */

    const body = await req.json();

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const comment = String(body.comment || "").trim();

    const doctor = body.doctor
      ? String(body.doctor).trim()
      : "";

    const service = body.service
      ? String(body.service).trim()
      : "";

    /* =========================================================
       VALIDATION
    ========================================================= */

    if (!name || !phone) {
      return Response.json(
        {
          success: false,
          error: "Имя и телефон обязательны",
        },
        {
          status: 400,
        }
      );
    }

    if (name.length > 60) {
      return Response.json(
        {
          success: false,
          error: "Слишком длинное имя",
        },
        {
          status: 400,
        }
      );
    }

    if (phone.length > 30) {
      return Response.json(
        {
          success: false,
          error: "Некорректный телефон",
        },
        {
          status: 400,
        }
      );
    }

    if (comment.length > 1000) {
      return Response.json(
        {
          success: false,
          error: "Комментарий слишком длинный",
        },
        {
          status: 400,
        }
      );
    }

    /* =========================================================
       EMAIL
    ========================================================= */

    const result = await resend.emails.send({
      from: "OLGA Clinic <onboarding@resend.dev>",

      to: bookingEmail!,

      subject: "Новая заявка",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; color: #111827;">
          
          <h1 style="margin: 0 0 20px; color: #07c7b7;">
            Новый запрос на бронирование
          </h1>

          <div
            style="
              padding: 16px;
              border: 1px solid #d1f5f0;
              border-radius: 14px;
              background: #f4fffd;
            "
          >
            <p>
              <strong>Имя:</strong>
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>Телефон:</strong>
              ${escapeHtml(phone)}
            </p>

            <p>
              <strong>Сообщение:</strong>
              ${escapeHtml(comment || "—")}
            </p>
          </div>

          <div
            style="
              margin-top: 20px;
              padding: 16px;
              border: 1px solid #e5e7eb;
              border-radius: 14px;
            "
          >
            <p>
              <strong>Врач:</strong>
              ${escapeHtml(doctor || "—")}
            </p>

            <p>
              <strong>Услуга:</strong>
              ${escapeHtml(service || "—")}
            </p>
          </div>
        </div>
      `,
    });

    console.log("EMAIL SENT");

    return Response.json({
      success: true,
      result,
    });
  } catch (error) {
   if (
  !(error instanceof Error) ||
  !error.message.includes("Слишком много")
) {
  console.error("BOOKING ERROR:", error);
}

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      {
        status: 500,
      }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}