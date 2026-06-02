"use client";

import { useEffect, useRef, useState } from "react";

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

const WEB3FORMS_ACCESS_KEY =
  "5e0ecef0-6e5d-42ae-b425-f50a7e1a395a";

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
  const [comment, setComment] = useState("");

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
    try {
      if (!name.trim()) {
        alert("Введите имя");
        return;
      }

      if (!phone.trim()) {
        alert("Введите телефон");
        return;
      }

      if (!isValidRussianPhone(phone)) {
        alert("Введите корректный номер телефона");
        return;
      }


      const cooldown = localStorage.getItem("bookingCooldown");

      if (cooldown) {
        const diff = Date.now() - Number(cooldown);

        if (diff < 15000) {
          alert("Подождите немного перед повторной отправкой");
          return;
        }
      }

      setLoading(true);

      const formattedPhone = formatPhone(phone);
      const phoneDigits = normalizePhoneDigits(phone);

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,

            subject: "Новая заявка OLGA Dental Clinic",

            from_name: "OLGA Dental Clinic",

            name: name.trim(),
            phone: formattedPhone,
            phone_digits: phoneDigits,
            comment: comment.trim() || "—",

            source,
            doctor: doctor?.name || "—",
            service: service?.title || "—",

            message: `
Новая заявка с сайта OLGA Dental Clinic

Имя: ${name.trim()}
Телефон: ${formattedPhone}
Телефон только цифры: ${phoneDigits}

Источник заявки: ${source}
Врач: ${doctor?.name || "—"}
Услуга: ${service?.title || "—"}

Комментарий:
${comment.trim() || "—"}
            `.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Не удалось отправить заявку"
        );
      }

      localStorage.setItem("bookingCooldown", String(Date.now()));

      setSent(true);

      setTimeout(() => {
        setSent(false);
        setName("");
        setPhone("");
        setComment("");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("BOOKING ERROR:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Не удалось отправить заявку");
      }
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

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Комментарий"
                rows={4}
                maxLength={1000}
                className="
                  w-full
                  resize-none
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
                {loading ? "Отправка..." : "Отправить"}
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
              Мы свяжемся с вами в ближайшее время
            </p>
          </div>
        )}
      </div>
    </div>
  );
}