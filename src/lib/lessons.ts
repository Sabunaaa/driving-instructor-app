export type Lesson = {
  id: string;
  instructorId: string;
  studentName: string;
  studentId?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMins: number; // e.g., 60, 90
  notes?: string;
  createdAt: number;
};

const key = (userId: string) => `lessons_${userId}`;

export function getLessonsForInstructor(userId: string): Lesson[] {
  try {
    const raw = localStorage.getItem(key(userId));
    return raw ? (JSON.parse(raw) as Lesson[]) : [];
  } catch {
    return [];
  }
}

export function saveLessonsForInstructor(userId: string, lessons: Lesson[]) {
  try {
    localStorage.setItem(
      key(userId),
      JSON.stringify(
        lessons.sort(
          (a, b) =>
            new Date(`${a.date}T${a.time}`).getTime() -
            new Date(`${b.date}T${b.time}`).getTime()
        )
      )
    );
  } catch {}
}

export function addLesson(
  userId: string,
  lesson: Omit<Lesson, "id" | "createdAt">
): Lesson {
  const current = getLessonsForInstructor(userId);
  const newLesson: Lesson = {
    id: `${Date.now()}`,
    createdAt: Date.now(),
    ...lesson,
  };
  const next = [...current, newLesson];
  saveLessonsForInstructor(userId, next);
  return newLesson;
}

export function removeLesson(userId: string, id: string) {
  const current = getLessonsForInstructor(userId);
  const next = current.filter((l) => l.id !== id);
  saveLessonsForInstructor(userId, next);
}

export function getUpcoming(lessons: Lesson[], now = new Date()) {
  const nowTs = now.getTime();
  return lessons
    .filter((l) => new Date(`${l.date}T${l.time}`).getTime() >= nowTs)
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
    );
}

export function getPast(lessons: Lesson[], now = new Date()) {
  const nowTs = now.getTime();
  return lessons
    .filter((l) => new Date(`${l.date}T${l.time}`).getTime() < nowTs)
    .sort(
      (a, b) =>
        new Date(`${b.date}T${b.time}`).getTime() -
        new Date(`${a.date}T${a.time}`).getTime()
    );
}

export function updateLesson(
  userId: string,
  id: string,
  patch: Partial<Omit<Lesson, "id" | "createdAt">>
) {
  const current = getLessonsForInstructor(userId);
  const next = current.map((l) => (l.id === id ? { ...l, ...patch } : l));
  saveLessonsForInstructor(userId, next);
}
