export type Doctor = {
  name: string;
  image: string;
  role: string;
  exp: string;
  desc: string;
};

export const doctors: Doctor[] = [
  {
    name: "Ольга Сергеевна",
    image: "/doctors/olga.png",
    role: "Главный врач",
    exp: "20 лет опыта",
    desc: "Эстетическая стоматология, сложные клинические случаи и цифровое планирование лечения.",
  },
  {
    name: "Алексей Петров",
    image: "/doctors/alexey.png",
    role: "Ортопед",
    exp: "15 лет опыта",
    desc: "Протезирование, восстановление прикуса и функциональная эстетика улыбки.",
  },
  {
    name: "Мария Иванова",
    image: "/doctors/maria.png",
    role: "Терапевт",
    exp: "8 лет опыта",
    desc: "Лечение, реставрация зубов и бережный подход к каждому пациенту.",
  },
];