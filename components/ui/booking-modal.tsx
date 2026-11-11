"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;

  doctor?: {
    name: string;
  } | null;

  service?: {
    title: string;
  } | null;
};

const BOOKING_API_PATH = "/api/booking.php";
const CONSENT_VERSION = process.env.NEXT_PUBLIC_BOOKING_CONSENT_VERSION ?? "PENDING_APPROVAL";
const BOOKING_ENABLED = process.env.NEXT_PUBLIC_BOOKING_ENABLED === "true";
const ALLOWED_HOSTS = new Set(["olga-clinic-murino.ru", "www.olga-clinic-murino.ru"]);

function canSubmitRealBooking(): boolean {
  return BOOKING_ENABLED && CONSENT_VERSION !== "PENDING_APPROVAL"
    && typeof window !== "undefined"
    && window.location.protocol === "https:"
    && ALLOWED_HOSTS.has(window.location.hostname.toLowerCase());
}

const CLINIC_PHONE_DISPLAY = "+7 (812) 603-63-64";

const getPhoneDigits = (value: string) => {
  return value.replace(/\D/g, "");
};

const normalizePhoneDigits = (value: string) => {
  let digits = getPhoneDigits(value);

  if (!digits) return "";

  // 8 999 123 45 67 -> 7 999 123 45 67
  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  // 999 123 45 67 -> 7 999 123 45 67
  if (digits.startsWith("9")) {
    digits = `7${digits}`;
  }

  // Российский формат: 7 + 10 цифр
  return digits.slice(0, 11);
};

const formatPhoneFromDigits = (digits: string) => {
  if (!digits) return "";

  const country = digits[0];
  const operator = digits.slice(1, 4);
  const first = digits.slice(4, 7);
  const second = digits.slice(7, 9);
  const third = digits.slice(9, 11);

  let result = `+${country}`;

  if (operator) {
    result += ` (${operator}`;
  }

  if (operator.length === 3) {
    result += ")";
  }

  if (first) {
    result += ` ${first}`;
  }

  if (second) {
    result += `-${second}`;
  }

  if (third) {
    result += `-${third}`;
  }

  return result;
};

const formatPhone = (value: string) => {
  const digits = normalizePhoneDigits(value);
  return formatPhoneFromDigits(digits);
};

const isValidRussianPhone = (value: string) => {
  const digits = normalizePhoneDigits(value);
  return digits.length === 11 && digits.startsWith("7");
};

export function BookingModal({
  open,
  onClose,
  doctor,
  service,
}: Props) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [demoSuccess, setDemoSuccess] = useState(false);

  const openedAtRef = useRef(0);

  const contextLabel = doctor?.name
    ? `Врач: ${doctor.name}`
    : service?.title
    ? `Услуга: ${service.title}`
    : null;

  const source = doctor?.name
    ? "doctor"
    : service?.title
    ? "service"
    : "general";

  useEffect(() => {
    if (!open) return;

    openedAtRef.current = Date.now();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSent(false);
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const closeSafely = () => {
    const diff = Date.now() - openedAtRef.current;

    if (diff < 350) return;

    setSent(false);
    setErrorMessage("");
    setDemoSuccess(false);
    onClose();
  };

  const handlePhoneChange = (value: string) => {
    setPhone(formatPhone(value));
  };

  const handlePhoneKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key !== "Backspace") return;

    const input = e.currentTarget;

    const hasSelection =
      input.selectionStart !== input.selectionEnd;

    const isCursorAtEnd =
      input.selectionStart === phone.length &&
      input.selectionEnd === phone.length;

    if (hasSelection || !isCursorAtEnd) return;

    e.preventDefault();

    const digits = normalizePhoneDigits(phone);

    if (digits.length <= 1) {
      setPhone("");
      return;
    }

    const nextDigits = digits.slice(0, -1);

    if (nextDigits.length <= 1) {
      setPhone("");
      return;
    }

    setPhone(formatPhoneFromDigits(nextDigits));
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    if (!name.trim() || !isValidRussianPhone(phone)) {
      setErrorMessage("Укажите имя и корректный номер телефона.");
      return;
    }
    if (!consent) {
      setErrorMessage("Для отправки заявки необходимо отдельное согласие на обработку данных.");
      return;
    }

    // Preview/demo: form feedback only, absolutely no transmission.
    if (!canSubmitRealBooking()) {
      setDemoSuccess(true);
      setSent(true);
      return;
    }

    const cooldown = localStorage.getItem("bookingCooldown");
    if (cooldown && Date.now() - Number(cooldown) < 15000) {
      setErrorMessage("Подождите немного перед повторной отправкой.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(BOOKING_API_PATH, {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: formatPhone(phone),
          source,
          doctor: doctor?.name || "",
          service: service?.title || "",
          consent: true,
          consent_version: CONSENT_VERSION,
          website: "",
        }),
      });
      const payload: { success?: boolean; message?: string } = await response.json();
      if (!response.ok || !payload.success) throw new Error("Booking failed");

      localStorage.setItem("bookingCooldown", String(Date.now()));
      window.ym?.(105008013, "reachGoal", "booking_success");
      setDemoSuccess(false);
      setSent(true);
      window.setTimeout(() => {
        setSent(false);
        setName("");
        setPhone("");
        setConsent(false);
        onClose();
      }, 2400);
    } catch {
      setErrorMessage("Не удалось отправить заявку. Пожалуйста, позвоните в клинику.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[200000]
        flex
        items-center
        justify-center
        px-4
      "
      onClick={closeSafely}
    >
      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/50
          backdrop-blur-md
        "
      />

      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          z-[200001]
          max-h-[92vh]
          w-full
          max-w-lg
          overflow-y-auto
          overflow-x-hidden
          rounded-[32px]
          border
          border-[var(--accent-light)]/20
          bg-[var(--card)]
          p-6
          text-[var(--foreground)]
          shadow-[0_25px_80px_rgba(18,199,183,0.28)]
          backdrop-blur-2xl
          sm:p-8
        "
      >
        {/* GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            right-[-120px]
            top-[-120px]
            h-[260px]
            w-[260px]
            rounded-full
            bg-[var(--accent-light)]/15
            blur-3xl
          "
        />

        {!sent ? (
          <div className="relative z-10">
            <span
              className="
                inline-flex
                rounded-full
                border
                border-[var(--accent-light)]/20
                bg-[var(--accent-light)]/10
                px-4
                py-2
                text-xs
                font-medium
                uppercase
                tracking-[0.22em]
                text-[var(--accent)]
              "
            >
              Запись
            </span>

            <h2
              className="
                mt-6
                text-3xl
                font-semibold
                text-[var(--accent)]
              "
            >
              Запись на прием
            </h2>

            {contextLabel && (
              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-[var(--accent-light)]/15
                  bg-[var(--accent-light)]/5
                  p-4
                "
              >
                <div
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-[var(--text-muted)]
                  "
                >
                  Вы записываетесь
                </div>

                <div
                  className="
                    mt-1
                    font-medium
                    text-[var(--accent)]
                  "
                >
                  {contextLabel}
                </div>
              </div>
            )}

            <p
              className="
                mt-5
                text-sm
                leading-relaxed
                text-[var(--text-soft)]
              "
            >
              Оставьте данные, и администратор свяжется с вами для подтверждения
              записи.
            </p>

            <div className="mt-7 space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                maxLength={60}
                autoComplete="name"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[var(--accent-light)]/15
                  bg-[var(--glass)]
                  px-4
                  py-3.5
                  text-[var(--foreground)]
                  outline-none
                  transition
                  placeholder:text-[var(--text-muted)]
                  focus:border-[var(--accent-light)]
                  focus:ring-4
                  focus:ring-[var(--accent-light)]/10
                "
              />

              <input
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onKeyDown={handlePhoneKeyDown}
                placeholder="+7 (___) ___-__-__"
                inputMode="numeric"
                type="tel"
                autoComplete="tel"
                maxLength={18}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[var(--accent-light)]/15
                  bg-[var(--glass)]
                  px-4
                  py-3.5
                  text-[var(--foreground)]
                  outline-none
                  transition
                  placeholder:text-[var(--text-muted)]
                  focus:border-[var(--accent-light)]
                  focus:ring-4
                  focus:ring-[var(--accent-light)]/10
                "
              />

              <p className="rounded-2xl border border-[var(--accent-light)]/15 bg-[var(--accent-light)]/5 px-4 py-3 text-xs leading-relaxed text-[var(--text-soft)]">
                Для обратного звонка достаточно имени и телефона. Не указывайте диагнозы и сведения о здоровье: медицинские вопросы обсудите непосредственно с клиникой.
              </p>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--accent-light)]/20 bg-[var(--glass)] px-4 py-4 text-sm leading-relaxed text-[var(--text-soft)]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]"
                />
                <span>
                  Даю отдельное согласие ООО «ОРДВИК» на обработку имени и телефона для обратного звонка.{" "}
                  <Link href="/consent" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--accent)] underline underline-offset-2">
                    Текст согласия
                  </Link>{" · "}
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--accent)] underline underline-offset-2">
                    Политика обработки данных
                  </Link>
                </span>
              </label>
              {!canSubmitRealBooking() && (
                <p role="status" className="rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm leading-6 text-[var(--text-soft)]">
                  Тестовый режим. Данные не отправляются и не сохраняются. Подключение реальной записи ожидает юридического согласования и настройки Beget.
                </p>
              )}
              {errorMessage && <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-300">{errorMessage}</p>}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  onClose();
                }}
                disabled={loading}
                className="
                  flex-1
                  rounded-2xl
                  border
                  border-[var(--accent-light)]/20
                  bg-[var(--glass)]
                  py-3
                  text-sm
                  font-medium
                  text-[var(--accent)]
                  transition
                  hover:bg-[var(--accent-light)]/5
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                Отмена
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="
                  flex-1
                  rounded-2xl
                  bg-[var(--accent-light)]
                  py-3
                  text-sm
                  font-medium
                  text-[#071412]
                  shadow-lg
                  shadow-[var(--accent-light)]/30
                  transition
                  hover:-translate-y-[2px]
                  hover:brightness-110
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? "Отправка..." : canSubmitRealBooking() ? "Отправить заявку" : "Проверить форму"}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 py-16 text-center">
            <div
              className="
                mx-auto
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-[var(--accent-light)]/10
                text-4xl
                text-[var(--accent)]
              "
            >
              ✓
            </div>

            <h2
              className="
                mt-6
                text-3xl
                font-semibold
                text-[var(--accent)]
              "
            >
              Заявка отправлена
            </h2>

            <p className="mt-3 text-sm text-[var(--text-soft)]">
              {demoSuccess ? "Это демонстрация: заявка не отправлена, данные не сохранены." : "Мы свяжемся с вами в ближайшее время."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}