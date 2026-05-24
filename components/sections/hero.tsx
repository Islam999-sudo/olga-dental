"use client";

import { motion } from "framer-motion";

type Props = {
  onBook: () => void;
};

export function Hero({ onBook }: Props) {
  return (
    <section className="relative overflow-hidden pt-28">

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] animate-float rounded-full bg-white/40 blur-3xl" />
        <div className="absolute right-[-10%] top-[30%] h-[400px] w-[400px] animate-float-delayed rounded-full bg-white/30 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[30%] h-[450px] w-[450px] animate-float-slow rounded-full bg-white/20 blur-3xl" />
      </div>

      <div className="relative mx-auto grid min-h-[90vh] max-w-7xl items-center gap-20 px-6 lg:grid-cols-2">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >

          <span className="inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-soft">
            Премиальная стоматология
          </span>

          <h1 className="mt-6 text-5xl font-semibold leading-[1.05] text-zinc-900 md:text-7xl">
            Современная
            <br />
            стоматология
            <br />
            нового поколения
          </h1>

          <p className="mt-8 max-w-xl text-lg text-zinc-600">
            Эстетика, имплантация и цифровая диагностика с акцентом на комфорт и результат.
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">

            <button
              onClick={onBook}
              className="rounded-full bg-zinc-900 px-8 py-4 text-sm text-white shadow-soft hover:shadow-soft-lg hover:bg-zinc-700 hover:-translate-y-[3px] active:translate-y-0"
            >
              Записаться
            </button>

            <button
              onClick={() =>
                document.getElementById("services")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="rounded-full border border-zinc-200 bg-white px-8 py-4 text-sm text-zinc-900 shadow-soft hover:shadow-soft-lg hover:-translate-y-[3px]"
            >
              Услуги
            </button>

          </div>

          {/* PHONE */}
          <div className="mt-6 text-sm text-zinc-600">
            Или позвоните:{" "}
            <a
              href="tel:+78126026160"
              className="font-medium text-zinc-900 underline underline-offset-4"
            >
              +7 (812) 60-261-60
            </a>
          </div>

          {/* STATS */}
          <div className="mt-14 flex gap-10">
            <div>
              <div className="text-3xl font-semibold">15+</div>
              <div className="text-sm text-zinc-500">лет опыта</div>
            </div>
            <div>
              <div className="text-3xl font-semibold">12k+</div>
              <div className="text-sm text-zinc-500">пациентов</div>
            </div>
            <div>
              <div className="text-3xl font-semibold">4.9</div>
              <div className="text-sm text-zinc-500">рейтинг</div>
            </div>
          </div>

        </motion.div>

        {/* RIGHT */}
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[32px] shadow-soft-lg">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1400&auto=format&fit=crop"
              className="h-full w-full object-cover"
              alt="clinic"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white/90 p-6 shadow-soft backdrop-blur">
            <div className="text-sm text-zinc-500">
              Цифровая диагностика
            </div>
            <div className="text-lg font-semibold text-zinc-900">
              Premium Care
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}