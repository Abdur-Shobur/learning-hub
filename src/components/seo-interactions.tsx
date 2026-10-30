"use client";

import { useEffect } from "react";
import { useProgress } from "@/components/progress";

const STORAGE_KEY = "seo-guide-v1";

type GuideState = {
  l?: Record<string, boolean>;
  c?: Record<string, boolean>;
  q?: Record<string, Record<string, string>>;
};

export function SeoInteractions() {
  const setProgress = useProgress()?.setProgress;

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-seo-body]");
    if (!root || !setProgress) return;

    let state: GuideState = {};
    try {
      state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
    } catch {
      state = {};
    }

    const save = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        /* private mode */
      }
    };

    root.querySelectorAll<HTMLElement>(".why").forEach((why) => {
      if (!why.dataset.base) why.dataset.base = why.innerHTML;
    });

    const refreshLessons = () => {
      const buttons = root.querySelectorAll<HTMLButtonElement>(".done-btn");
      let done = 0;
      buttons.forEach((button) => {
        const on = Boolean(state.l?.[button.dataset.lesson || ""]);
        button.setAttribute("aria-pressed", String(on));
        if (on) done += 1;
      });
      root.querySelectorAll<HTMLElement>("section[data-week]").forEach((section) => {
        const weekButtons = section.querySelectorAll<HTMLButtonElement>(".done-btn");
        let weekDone = 0;
        weekButtons.forEach((button) => {
          if (button.getAttribute("aria-pressed") === "true") weekDone += 1;
        });
        const count = section.querySelector(".wk-count");
        if (count) count.textContent = `${weekDone} / ${weekButtons.length} সম্পন্ন`;
        const bar = section.querySelector<HTMLElement>(".week-meta .bar i");
        if (bar && weekButtons.length) bar.style.width = `${(weekDone / weekButtons.length) * 100}%`;
      });
      setProgress(done, buttons.length);
    };

    const refreshChecks = () => {
      root.querySelectorAll<HTMLElement>(".check").forEach((group) => {
        const inputs = group.querySelectorAll<HTMLInputElement>("input");
        let checked = 0;
        inputs.forEach((input) => {
          if (input.checked) checked += 1;
        });
        const out = root.querySelector(`[data-count="${group.dataset.check}"]`);
        if (out) out.textContent = `${checked} / ${inputs.length} সম্পন্ন`;
      });
    };

    const answer = (question: HTMLElement, key: string) => {
      const correct = key === question.dataset.a;
      question.querySelectorAll<HTMLButtonElement>(".opt").forEach((option) => {
        option.disabled = true;
        option.classList.remove("right", "wrong");
        if (option.dataset.k === question.dataset.a) option.classList.add("right");
        if (option.dataset.k === key && !correct) option.classList.add("wrong");
      });
      const why = question.querySelector<HTMLElement>(".why");
      if (!why) return;
      why.hidden = false;
      why.classList.toggle("no", !correct);
      const base = why.dataset.base || why.innerHTML;
      why.innerHTML = `${correct ? '<b class="ok-label">সঠিক!</b> ' : '<b class="bad-label">হয়নি।</b> '}${base}`;
    };

    const scoreQuiz = (quiz: HTMLElement) => {
      const questions = [...quiz.querySelectorAll<HTMLElement>(".q")];
      const saved = state.q?.[quiz.id] || {};
      let correct = 0;
      let answered = 0;
      questions.forEach((question, index) => {
        const key = saved[index];
        if (!key) return;
        answered += 1;
        if (key === question.dataset.a) correct += 1;
      });
      const label = quiz.querySelector(".score");
      if (label) {
        label.textContent = `${correct} / ${questions.length}${answered === questions.length ? " সঠিক" : ""}`;
      }
    };

    root.querySelectorAll<HTMLInputElement>(".check input").forEach((input) => {
      if (state.c?.[input.id]) input.checked = true;
    });

    root.querySelectorAll<HTMLElement>(".quiz").forEach((quiz) => {
      state.q = state.q || {};
      state.q[quiz.id] = state.q[quiz.id] || {};
      quiz.querySelectorAll<HTMLElement>(".q").forEach((question, index) => {
        const key = state.q?.[quiz.id]?.[index];
        if (key) answer(question, key);
      });
      scoreQuiz(quiz);
    });

    refreshLessons();
    refreshChecks();

    const controller = new AbortController();
    const { signal } = controller;

    root.addEventListener(
      "click",
      (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const doneButton = target.closest<HTMLButtonElement>(".done-btn");
        if (doneButton) {
          const id = doneButton.dataset.lesson || "";
          state.l = state.l || {};
          state.l[id] = !state.l[id];
          save();
          refreshLessons();
          return;
        }

        const option = target.closest<HTMLButtonElement>(".opt");
        if (option && !option.disabled) {
          const question = option.closest<HTMLElement>(".q");
          const quiz = option.closest<HTMLElement>(".quiz");
          if (!question || !quiz) return;
          const questions = [...quiz.querySelectorAll(".q")];
          const index = questions.indexOf(question);
          state.q = state.q || {};
          state.q[quiz.id] = state.q[quiz.id] || {};
          state.q[quiz.id][index] = option.dataset.k || "";
          save();
          answer(question, option.dataset.k || "");
          scoreQuiz(quiz);
          return;
        }

        const reset = target.closest(".reset");
        if (reset) {
          const quiz = reset.closest<HTMLElement>(".quiz");
          if (!quiz) return;
          state.q = state.q || {};
          state.q[quiz.id] = {};
          save();
          quiz.querySelectorAll<HTMLElement>(".q").forEach((question) => {
            question.querySelectorAll<HTMLButtonElement>(".opt").forEach((option) => {
              option.disabled = false;
              option.classList.remove("right", "wrong");
            });
            const why = question.querySelector<HTMLElement>(".why");
            if (!why) return;
            why.hidden = true;
            if (why.dataset.base) why.innerHTML = why.dataset.base;
          });
          scoreQuiz(quiz);
          return;
        }

        const copy = target.closest<HTMLButtonElement>(".copy");
        if (!copy) return;
        const pre = copy.closest(".code")?.querySelector("pre");
        if (!pre) return;
        const write = async () => {
          try {
            await navigator.clipboard.writeText(pre.innerText);
            copy.textContent = "Copied";
          } catch {
            copy.textContent = "Selected";
          }
          window.setTimeout(() => {
            copy.textContent = "Copy";
          }, 1400);
        };
        void write();
      },
      { signal },
    );

    root.addEventListener(
      "change",
      (event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement) || !target.closest(".check")) return;
        state.c = state.c || {};
        state.c[target.id] = target.checked;
        save();
        refreshChecks();
      },
      { signal },
    );

    return () => controller.abort();
  }, [setProgress]);

  return null;
}
