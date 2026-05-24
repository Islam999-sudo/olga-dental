export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* TOP TEXT */}
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          
          <div>
            <span className="text-xs font-medium tracking-[0.25em] text-zinc-500 uppercase">
              О клинике
            </span>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
              Современный подход
              <br />
              к стоматологии
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-zinc-600">
              Мы объединяем цифровые технологии, клинический опыт и внимательное
              отношение к пациенту, чтобы лечение было предсказуемым, комфортным
              и эстетически безупречным.
            </p>
          </div>

          {/* RIGHT SIDE STATS */}
          <div className="grid grid-cols-2 gap-6">
            
            <div className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-semibold text-zinc-900">15+</div>
              <div className="mt-2 text-sm text-zinc-500">лет опыта</div>
            </div>

            <div className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-semibold text-zinc-900">12 000+</div>
              <div className="mt-2 text-sm text-zinc-500">пациентов</div>
            </div>

            <div className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-semibold text-zinc-900">4.9</div>
              <div className="mt-2 text-sm text-zinc-500">рейтинг клиники</div>
            </div>

            <div className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-semibold text-zinc-900">100%</div>
              <div className="mt-2 text-sm text-zinc-500">цифровая диагностика</div>
            </div>

          </div>
        </div>

        {/* BOTTOM TRUST STRIP */}
        <div className="mt-20 rounded-[28px] border border-zinc-200 bg-white px-10 py-12 shadow-sm">
          
          <div className="grid gap-10 md:grid-cols-3">
            
            <div>
              <div className="text-sm font-medium text-zinc-900">
                Точная диагностика
              </div>
              <div className="mt-2 text-sm text-zinc-600">
                Используем цифровые 3D-технологии для планирования лечения.
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-zinc-900">
                Без боли и стресса
              </div>
              <div className="mt-2 text-sm text-zinc-600">
                Современные методы анестезии и комфорт пациента в приоритете.
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-zinc-900">
                Гарантия результата
              </div>
              <div className="mt-2 text-sm text-zinc-600">
                Мы отвечаем за качество лечения и долгосрочный результат.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}